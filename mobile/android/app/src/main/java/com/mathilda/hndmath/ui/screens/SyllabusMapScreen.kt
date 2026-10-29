package com.mathilda.hndmath.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mathilda.hndmath.data.model.HndUnit
import com.mathilda.hndmath.data.model.UserProgressState

@Composable
fun SyllabusMapScreen(
    units: List<HndUnit>,
    userProgress: UserProgressState,
    onSelectSkill: (unitId: String, skillId: String) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            // Expedition Banner Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "🌴 CAMEROON HND EXPEDITION",
                        color = Color(0xFF34D399),
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Mathematics Syllabus Map",
                        color = Color.White,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        StatBadge(label = "Total XP", value = "${userProgress.totalXP} XP", color = Color(0xFFF59E0B))
                        StatBadge(label = "Stamina", value = "${userProgress.stamina}%", color = Color(0xFF10B981))
                        StatBadge(label = "Streak", value = "${userProgress.streakDays} Days", color = Color(0xFFEC4899))
                    }
                }
            }
        }

        items(units) { unit ->
            UnitProgressCard(
                unit = unit,
                userProgress = userProgress,
                onSelectSkill = onSelectSkill
            )
        }
    }
}

@Composable
fun StatBadge(label: String, value: String, color: Color) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .background(Color(0xFF1E293B), RoundedCornerShape(8.dp))
            .padding(horizontal = 12.dp, vertical = 6.dp)
    ) {
        Text(text = label, color = Color.Gray, fontSize = 9.sp, fontWeight = FontWeight.SemiBold)
        Text(text = value, color = color, fontSize = 12.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
fun UnitProgressCard(
    unit: HndUnit,
    userProgress: UserProgressState,
    onSelectSkill: (unitId: String, skillId: String) -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = unit.title,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1C1917)
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = unit.description,
                fontSize = 12.sp,
                color = Color(0xFF64748B)
            )
            Spacer(modifier = Modifier.height(12.dp))

            unit.skills.forEach { skill ->
                val isCompleted = userProgress.completedSkills.contains(skill.id)
                Button(
                    onClick = { onSelectSkill(unit.id, skill.id) },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (isCompleted) Color(0xFFDCFCE7) else Color(0xFFF1F5F9),
                        contentColor = if (isCompleted) Color(0xFF15803D) else Color(0xFF0F172A)
                    ),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = skill.title,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = if (isCompleted) "✓ Mastered" else "Practice",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}
