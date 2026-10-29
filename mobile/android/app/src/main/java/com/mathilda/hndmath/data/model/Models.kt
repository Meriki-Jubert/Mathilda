package com.mathilda.hndmath.data.model

data class Question(
    val id: String = "",
    val question: String = "",
    val type: String = "multiple-choice", // "multiple-choice" or "numeric"
    val options: List<String> = emptyList(),
    val correctAnswer: String = "",
    val solution: String = "",
    val hint: String = ""
)

data class Lesson(
    val id: String = "",
    val title: String = "",
    val content: String = "",
    val formula: String = ""
)

data class HndSkill(
    val id: String = "",
    val title: String = "",
    val description: String = "",
    val lessons: List<Lesson> = emptyList(),
    val practice: List<Question> = emptyList()
)

data class HndUnit(
    val id: String = "",
    val title: String = "",
    val description: String = "",
    val skills: List<HndSkill> = emptyList()
)

data class HarvestedFruit(
    val id: String = "",
    val name: String = "",
    val region: String = "",
    val description: String = "",
    val icon: String = "🍊"
)

data class UserProgressState(
    val userId: String = "",
    val displayName: String = "Math Scholar",
    val email: String = "",
    val completedSkills: List<String> = emptyList(),
    val totalXP: Int = 0,
    val harvestedFruits: List<String> = listOf("cameroon_citrus"),
    val stamina: Int = 80,
    val streakDays: Int = 1,
    val currentUnit: String = "unit-1",
    val currentSkill: String = "skill-1.1",
    val aiApiKey: String = ""
)
