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
import com.mathilda.hndmath.data.model.Question

@Composable
fun PracticeScreen(
    questions: List<Question>,
    onQuestionCompleted: (questionId: String, isCorrect: Boolean) -> Unit
) {
    var currentIndex by remember { mutableIntStateOf(0) }
    var selectedOption by remember { mutableStateOf<String?>(null) }
    var isAnswerSubmitted by remember { mutableStateOf(false) }
    var isCorrect by remember { mutableStateOf(false) }

    val currentQuestion = questions.getOrNull(currentIndex)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFAF9F6))
            .padding(16.dp)
    ) {
        if (currentQuestion == null) {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF047857)),
                modifier = Modifier.fillMaxWidth().padding(top = 32.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("🎉 Module Practice Complete!", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("You earned +30 XP in HND Matrix & Calculus Algebra.", color = Color(0xFFFEF08A), fontSize = 13.sp)
                }
            }
            return
        }

        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Question ${currentIndex + 1} of ${questions.size}",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF64748B)
            )
            Button(
                onClick = { /* Camera snap intent */ },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0F172A)),
                shape = RoundedCornerShape(8.dp),
                contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text("📷 Photo Solver", fontSize = 10.sp, color = Color(0xFF34D399), fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Question Card
        Card(
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = currentQuestion.question,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Options
        currentQuestion.options.forEach { option ->
            val isSelected = selectedOption == option
            OutlinedButton(
                onClick = { if (!isAnswerSubmitted) selectedOption = option },
                colors = ButtonDefaults.outlinedButtonColors(
                    containerColor = if (isSelected) Color(0xFFDCFCE7) else Color.White
                ),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
            ) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Start) {
                    Text(
                        text = option,
                        fontSize = 13.sp,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                        color = Color(0xFF0F172A)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (!isAnswerSubmitted) {
            Button(
                onClick = {
                    if (selectedOption != null) {
                        isCorrect = selectedOption == currentQuestion.correctAnswer
                        isAnswerSubmitted = true
                        onQuestionCompleted(currentQuestion.id, isCorrect)
                    }
                },
                enabled = selectedOption != null,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF047857)),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text("Submit Answer", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
            }
        } else {
            Card(
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (isCorrect) Color(0xFFDCFCE7) else Color(0xFFFEE2E2)
                ),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = if (isCorrect) "✓ Correct Answer! (+15 XP)" else "❌ Incorrect",
                        fontWeight = FontWeight.Bold,
                        color = if (isCorrect) Color(0xFF15803D) else Color(0xFFB91C1C),
                        fontSize = 14.sp
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Solution: ${currentQuestion.solution}",
                        fontSize = 12.sp,
                        color = Color(0xFF334155)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = {
                    selectedOption = null
                    isAnswerSubmitted = false
                    currentIndex++
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0F172A)),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text("Next Question →", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
            }
        }
    }
}
