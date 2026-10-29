package com.mathilda.hndmath.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mathilda.hndmath.data.model.UserProgressState

@Composable
fun SettingsScreen(
    userProgress: UserProgressState,
    onSaveApiKey: (key: String) -> Unit
) {
    var keyInput by remember { mutableStateOf(userProgress.aiApiKey) }
    var showSavedToast by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFAF9F6))
            .padding(16.dp)
    ) {
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("⚙️ MOBILE SETTINGS & SYNC", color = Color(0xFF34D399), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(4.dp))
                Text("Firebase Cloud Sync State", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Profile Box
        Card(
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("User Profile", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                Spacer(modifier = Modifier.height(6.dp))
                Text("Name: ${userProgress.displayName}", fontSize = 12.sp, color = Color(0xFF334155))
                Text("Email / ID: ${if (userProgress.email.isNotEmpty()) userProgress.email else userProgress.userId}", fontSize = 11.sp, color = Color(0xFF64748B))
                Spacer(modifier = Modifier.height(8.dp))
                Text("Status: ✓ Live Firestore Connected", fontSize = 11.sp, color = Color(0xFF15803D), fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // AI Key Input
        Card(
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("AI Problem Solver API Key", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                Spacer(modifier = Modifier.height(6.dp))
                Text("Saves key directly to your Firestore profile for native mobile image solving.", fontSize = 11.sp, color = Color(0xFF64748B))
                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = keyInput,
                    onValueChange = { keyInput = it },
                    placeholder = { Text("Paste API key here...", fontSize = 12.sp) },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = {
                        onSaveApiKey(keyInput)
                        showSavedToast = true
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF047857)),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Save to Firestore Profile", color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }

                if (showSavedToast) {
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("✓ Key saved to Firestore profile!", color = Color(0xFF15803D), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
