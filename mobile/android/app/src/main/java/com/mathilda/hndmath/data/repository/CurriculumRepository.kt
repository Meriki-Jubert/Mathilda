package com.mathilda.hndmath.data.repository

import com.mathilda.hndmath.data.model.*

object CurriculumRepository {
    fun getUnits(): List<HndUnit> {
        return listOf(
            HndUnit(
                id = "unit-1",
                title = "Unit 1: Linear Algebra & Matrix Theory",
                description = "Systems of linear equations, Gauss-Jordan elimination, matrix inversion, eigenvalues & eigenvectors for Engineering & Commercial HND.",
                skills = listOf(
                    HndSkill(
                        id = "skill-1.1",
                        title = "Matrix Inversion & Determinants",
                        description = "Compute determinants using cofactor expansion and adjugate matrix inversion.",
                        lessons = listOf(
                            Lesson(
                                id = "l-1.1.1",
                                title = "Determinants & Adjugates",
                                content = "For a square matrix A, det(A) determines invertibility. A^-1 = (1 / det(A)) * adj(A).",
                                formula = "A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)"
                            )
                        ),
                        practice = listOf(
                            Question(
                                id = "q-1.1.1",
                                question = "Find the determinant of matrix A = [[2, 5], [1, 4]].",
                                options = listOf("3", "8", "5", "13"),
                                correctAnswer = "3",
                                solution = "det(A) = (2 * 4) - (5 * 1) = 8 - 5 = 3.",
                                hint = "Use ad - bc for a 2x2 matrix [[a, b], [c, d]]."
                            )
                        )
                    ),
                    HndSkill(
                        id = "skill-1.2",
                        title = "Eigenvalues & Eigenvectors",
                        description = "Solve characteristic equations det(A - λI) = 0 for structural analysis.",
                        lessons = listOf(
                            Lesson(
                                id = "l-1.2.1",
                                title = "Characteristic Polynomials",
                                content = "Eigenvalues λ satisfy det(A - λI) = 0. Eigenvectors satisfy (A - λI)v = 0.",
                                formula = "\\det(A - \\lambda I) = 0"
                            )
                        ),
                        practice = listOf(
                            Question(
                                id = "q-1.2.1",
                                question = "What are the eigenvalues of [[4, 1], [2, 3]]?",
                                options = listOf("λ = 5 and λ = 2", "λ = 4 and λ = 3", "λ = 1 and λ = 6", "λ = 2 and λ = 2"),
                                correctAnswer = "λ = 5 and λ = 2",
                                solution = "det([[4-λ, 1], [2, 3-λ]]) = (4-λ)(3-λ) - 2 = λ^2 - 7λ + 10 = (λ-5)(λ-2) = 0.",
                                hint = "Set det(A - λI) = 0."
                            )
                        )
                    )
                )
            ),
            HndUnit(
                id = "unit-2",
                title = "Unit 2: Differential Calculus & Applications",
                description = "Partial derivatives, Taylor series expansions, gradient vectors, and optimization of multivariable functions.",
                skills = listOf(
                    HndSkill(
                        id = "skill-2.1",
                        title = "Partial Derivatives & Gradients",
                        description = "Differentiate multivariable functions with respect to single variables.",
                        lessons = listOf(
                            Lesson(
                                id = "l-2.1.1",
                                title = "Gradient Vector ∇f",
                                content = "The gradient vector ∇f = (∂f/∂x, ∂f/∂y) points in the direction of steepest ascent.",
                                formula = "\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)"
                            )
                        ),
                        practice = listOf(
                            Question(
                                id = "q-2.1.1",
                                question = "Calculate ∂f/∂x for f(x, y) = 3x^2*y + 4y^3 at (1, 2).",
                                options = listOf("12", "6", "18", "24"),
                                correctAnswer = "12",
                                solution = "∂f/∂x = 6x*y. At (1, 2), ∂f/∂x = 6(1)(2) = 12.",
                                hint = "Treat y as a constant when taking the derivative with respect to x."
                            )
                        )
                    )
                )
            ),
            HndUnit(
                id = "unit-3",
                title = "Unit 3: Ordinary Differential Equations (ODEs)",
                description = "First-order ODEs, integrating factors, second-order linear ODEs with constant coefficients.",
                skills = listOf(
                    HndSkill(
                        id = "skill-3.1",
                        title = "First-Order Linear ODEs",
                        description = "Use integrating factor IF = exp(∫P(x)dx) to solve dy/dx + P(x)y = Q(x).",
                        lessons = listOf(
                            Lesson(
                                id = "l-3.1.1",
                                title = "Integrating Factor Method",
                                content = "Multiply the equation by IF = e^(∫P(x)dx) so the left side becomes d/dx [y * IF].",
                                formula = "I(x) = e^{\\int P(x)dx}"
                            )
                        ),
                        practice = listOf(
                            Question(
                                id = "q-3.1.1",
                                question = "Find the integrating factor for dy/dx + (2/x)y = x^2.",
                                options = listOf("x^2", "2x", "e^(2x)", "x"),
                                correctAnswer = "x^2",
                                solution = "P(x) = 2/x. ∫P(x)dx = 2*ln(x) = ln(x^2). IF = e^(ln(x^2)) = x^2.",
                                hint = "Compute e^(∫(2/x)dx)."
                            )
                        )
                    )
                )
            )
        )
    }

    fun getKnowledgeFruits(): List<HarvestedFruit> {
        return listOf(
            HarvestedFruit("cameroon_citrus", "Cameroon Citrus", "Littoral Basin", "Grants +25 Stamina boost for vector calculus challenges.", "🍊"),
            HarvestedFruit("bamenda_berry", "Bamenda Highland Berry", "North West Region", "Unlocks step-by-step hint reveals.", "🫐"),
            HarvestedFruit("korup_mango", "Korup Jungle Mango", "South West Canopy", "Boosts XP gains by 1.5x on differential equations.", "🥭"),
            HarvestedFruit("foumban_fig", "Foumban Royal Fig", "West Kingdom", "Refills Stamina meter to 100%.", "🍈")
        )
    }
}
