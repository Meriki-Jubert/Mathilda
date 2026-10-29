package com.mathilda.hndmath.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val EmeraldPrimary = Color(0xFF047857)
val EmeraldDark = Color(0xFF022C22)
val JungleGold = Color(0xFFEAB308)
val SlateBackground = Color(0xFF0F172A)
val SurfaceLight = Color(0xFFFAF9F6)

private val DarkColorScheme = darkColorScheme(
    primary = EmeraldPrimary,
    secondary = JungleGold,
    background = SlateBackground,
    surface = Color(0xFF1E293B),
    onPrimary = Color.White,
    onBackground = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = EmeraldPrimary,
    secondary = JungleGold,
    background = SurfaceLight,
    surface = Color.White,
    onPrimary = Color.White,
    onBackground = Color(0xFF1C1917)
)

@Composable
fun MathildaHNDTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
