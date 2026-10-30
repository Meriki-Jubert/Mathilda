package com.mathilda.hndmath

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.lifecycle.lifecycleScope
import com.google.firebase.FirebaseApp
import com.mathilda.hndmath.data.model.UserProgressState
import com.mathilda.hndmath.data.repository.CurriculumRepository
import com.mathilda.hndmath.data.repository.FirebaseRepository
import com.mathilda.hndmath.ui.screens.BackpackScreen
import com.mathilda.hndmath.ui.screens.PracticeScreen
import com.mathilda.hndmath.ui.screens.SettingsScreen
import com.mathilda.hndmath.ui.screens.SyllabusMapScreen
import com.mathilda.hndmath.ui.theme.MathildaHNDTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
class MainActivity : ComponentActivity() {

    private val firebaseRepository = FirebaseRepository()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FirebaseApp.initializeApp(this)

        lifecycleScope.launch {
            firebaseRepository.ensureAnonymousAuth()
        }

        setContent {
            MathildaHNDTheme {
                var selectedTab by remember { mutableIntStateOf(0) }
                val userProgress by firebaseRepository.observeUserProgress().collectAsState(
                    initial = UserProgressState()
                )

                val units = remember { CurriculumRepository.getUnits() }
                val fruits = remember { CurriculumRepository.getKnowledgeFruits() }

                Scaffold(
                    topBar = {
                        TopAppBar(
                            title = {
                                Text(
                                    text = "🌴 Mathilda HND Mobile",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            },
                            colors = TopAppBarDefaults.topAppBarColors(
                                containerColor = Color(0xFF0F172A)
                            )
                        )
                    },
                    bottomBar = {
                        NavigationBar(
                            containerColor = Color(0xFF0F172A),
                            contentColor = Color.White
                        ) {
                            NavigationBarItem(
                                selected = selectedTab == 0,
                                onClick = { selectedTab = 0 },
                                icon = { Icon(Icons.Default.Book, contentDescription = "Syllabus") },
                                label = { Text("Syllabus", fontSize = 10.sp) },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Color(0xFF34D399),
                                    unselectedIconColor = Color.Gray,
                                    indicatorColor = Color(0xFF1E293B)
                                )
                            )
                            NavigationBarItem(
                                selected = selectedTab == 1,
                                onClick = { selectedTab = 1 },
                                icon = { Icon(Icons.Default.CheckCircle, contentDescription = "Practice") },
                                label = { Text("Practice", fontSize = 10.sp) },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Color(0xFF34D399),
                                    unselectedIconColor = Color.Gray,
                                    indicatorColor = Color(0xFF1E293B)
                                )
                            )
                            NavigationBarItem(
                                selected = selectedTab == 2,
                                onClick = { selectedTab = 2 },
                                icon = { Icon(Icons.Default.ShoppingBag, contentDescription = "Backpack") },
                                label = { Text("Backpack", fontSize = 10.sp) },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Color(0xFF34D399),
                                    unselectedIconColor = Color.Gray,
                                    indicatorColor = Color(0xFF1E293B)
                                )
                            )
                            NavigationBarItem(
                                selected = selectedTab == 3,
                                onClick = { selectedTab = 3 },
                                icon = { Icon(Icons.Default.Settings, contentDescription = "Settings") },
                                label = { Text("Settings", fontSize = 10.sp) },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Color(0xFF34D399),
                                    unselectedIconColor = Color.Gray,
                                    indicatorColor = Color(0xFF1E293B)
                                )
                            )
                        }
                    }
                ) { paddingValues ->
                    Surface(
                        modifier = Modifier.padding(paddingValues),
                        color = MaterialTheme.colorScheme.background
                    ) {
                        when (selectedTab) {
                            0 -> SyllabusMapScreen(
                                units = units,
                                userProgress = userProgress,
                                onSelectSkill = { _, _ -> selectedTab = 1 }
                            )
                            1 -> PracticeScreen(
                                questions = units.flatMap { u -> u.skills.flatMap { s -> s.practice } },
                                onQuestionCompleted = { skillId, isCorrect ->
                                    val newCompleted = if (isCorrect) userProgress.completedSkills + skillId else userProgress.completedSkills
                                    val newXP = userProgress.totalXP + (if (isCorrect) 15 else 0)
                                    val updatedState = userProgress.copy(
                                        completedSkills = newCompleted.distinct(),
                                        totalXP = newXP
                                    )
                                    lifecycleScope.launch {
                                        firebaseRepository.saveProgress(updatedState)
                                    }
                                }
                            )
                            2 -> BackpackScreen(
                                userProgress = userProgress,
                                fruits = fruits
                            )
                            3 -> SettingsScreen(
                                userProgress = userProgress,
                                onSaveApiKey = { newKey ->
                                    val updated = userProgress.copy(aiApiKey = newKey)
                                    lifecycleScope.launch {
                                        firebaseRepository.saveProgress(updated)
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
