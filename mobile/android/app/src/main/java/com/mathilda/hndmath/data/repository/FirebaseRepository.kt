package com.mathilda.hndmath.data.repository

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import com.mathilda.hndmath.data.model.UserProgressState
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class FirebaseRepository {
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()
    private val firestoreDatabaseId = "ai-studio-mathilda-70865838-0d04-4e91-897c-ed47eb9890c1"
    
    // Explicitly target the configured Firestore database instance
    private val firestore: FirebaseFirestore by lazy {
        FirebaseFirestore.getInstance(auth.app, firestoreDatabaseId)
    }

    val currentUser: FirebaseUser?
        get() = auth.currentUser

    suspend fun ensureAnonymousAuth(): FirebaseUser? {
        if (auth.currentUser == null) {
            try {
                auth.signInAnonymously().await()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        return auth.currentUser
    }

    fun observeUserProgress(): Flow<UserProgressState> = callbackFlow {
        val user = auth.currentUser
        if (user == null) {
            trySend(UserProgressState())
            close()
            return@callbackFlow
        }

        val docRef = firestore.collection("users").document(user.uid)
        val listener = docRef.addSnapshotListener { snapshot, error ->
            if (error != null || snapshot == null || !snapshot.exists()) {
                trySend(UserProgressState(userId = user.uid))
                return@addSnapshotListener
            }

            val completed = (snapshot.get("completedSkills") as? List<*>)?.filterIsInstance<String>() ?: emptyList()
            val totalXP = (snapshot.get("totalXP") as? Long)?.toInt() ?: 0
            val fruits = (snapshot.get("harvestedFruits") as? List<*>)?.filterIsInstance<String>() ?: listOf("cameroon_citrus")
            val stamina = (snapshot.get("stamina") as? Long)?.toInt() ?: 80
            val streak = (snapshot.get("streakDays") as? Long)?.toInt() ?: 1
            val unit = snapshot.getString("currentUnit") ?: "unit-1"
            val skill = snapshot.getString("currentSkill") ?: "skill-1.1"

            val state = UserProgressState(
                userId = user.uid,
                displayName = snapshot.getString("displayName") ?: (if (user.isAnonymous) "Mobile Guest" else "Math Scholar"),
                email = snapshot.getString("email") ?: (user.email ?: ""),
                completedSkills = completed,
                totalXP = totalXP,
                harvestedFruits = fruits,
                stamina = stamina,
                streakDays = streak,
                currentUnit = unit,
                currentSkill = skill
            )
            trySend(state)
        }

        awaitClose { listener.remove() }
    }

    suspend fun saveProgress(state: UserProgressState) {
        val user = auth.currentUser ?: return
        val docRef = firestore.collection("users").document(user.uid)

        val payload = mapOf(
            "userId" to user.uid,
            "displayName" to state.displayName,
            "email" to (user.email ?: state.email),
            "completedSkills" to state.completedSkills,
            "totalXP" to state.totalXP,
            "harvestedFruits" to state.harvestedFruits,
            "stamina" to state.stamina,
            "streakDays" to state.streakDays,
            "currentUnit" to state.currentUnit,
            "currentSkill" to state.currentSkill,
            "updatedAt" to System.currentTimeMillis().toString()
        )

        try {
            docRef.set(payload, SetOptions.merge()).await()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
