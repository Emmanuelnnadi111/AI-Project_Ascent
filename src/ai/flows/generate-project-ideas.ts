'use server';

import { ai } from "@/ai/genkit";
import { z } from "zod";

const GenerateProjectIdeasInputSchema = z.object({
  department: z.string().describe("The student's department."),
  interests: z.string().describe("The student's areas of interest."),
});

export type GenerateProjectIdeasInput = z.infer<
  typeof GenerateProjectIdeasInputSchema
>;

const GenerateProjectIdeasOutputSchema = z.object({
  projectIdeas: z
    .array(
      z.object({
        title: z.string().describe("The title of the project idea."),
        explanation: z
          .string()
          .describe("A short explanation of the project idea."),
        researchGap: z
          .string()
          .describe("A potential research gap for the project."),
        difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
        estimatedDuration: z
          .string()
          .optional()
          .describe("Estimated time to complete"),
        requiredSkills: z
          .array(z.string())
          .optional()
          .describe("Skills needed for the project"),
      })
    )
    .describe("A list of project ideas."),
});

export type GenerateProjectIdeasOutput = z.infer<
  typeof GenerateProjectIdeasOutputSchema
>;

export async function generateProjectIdeas(
  input: GenerateProjectIdeasInput
): Promise<GenerateProjectIdeasOutput> {
  try {
    // Validate input
    if (!input.department?.trim()) {
      throw new Error("Department field is required");
    }
    if (!input.interests?.trim()) {
      throw new Error("Interests field is required");
    }

    return await generateProjectIdeasFlow(input);
  } catch (error: any) {
    console.error("Error in generateProjectIdeas:", error);

    // Re-throw with user-friendly message
    if (
      error.message.includes("API_KEY") ||
      error.message.includes("QUOTA") ||
      error.message.includes("RATE_LIMIT")
    ) {
      throw error;
      // Pass through API-specific errors
    }

    throw new Error(
      error.message ||
        "Failed to generate project ideas. Please check your input and try again."
    );
  }
}

const prompt = ai.definePrompt({
  name: "generateProjectIdeasPrompt",
  input: { schema: GenerateProjectIdeasInputSchema },
  output: { schema: GenerateProjectIdeasOutputSchema },
  prompt: `You are an expert academic advisor and project HOD with extensive experience in guiding final year students.

STUDENT PROFILE:
- Department: {{department}}
- Areas of Interest: {{interests}}

TASK: Generate exactly 6 unique, innovative, and academically rigorous final year project ideas.

REQUIREMENTS FOR EACH PROJECT:
1. Must be appropriate for final year undergraduate/graduate level
2. Should address a real-world problem or significant research gap
3. Must be feasible to complete in 6-12 months
4. Should align with current industry trends and academic standards
5. Must be original and avoid generic project titles

SPECIFIC GUIDELINES:
- Titles should be specific and compelling (avoid generic terms like "System" or "Application")
- Explanations should be clear and concise (2-3 sentences maximum)
- Research gaps should be specific and well-defined
- Include appropriate difficulty level based on project complexity
- Estimate realistic completion time
- List 3-5 essential skills/technologies needed

FOCUS AREAS TO CONSIDER:
- Emerging technologies (AI, IoT, Blockchain, AR/VR, etc.)
- Sustainability and green technology
- Healthcare and medical applications
- Social impact and community solutions
- Industry 4.0 and automation
- Cybersecurity and privacy
- Data science and analytics
- Mobile and web technologies

Generate 6 distinct project ideas that would impress academic HODs and industry professionals.`,
});

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: "generateProjectIdeasFlow",
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: GenerateProjectIdeasOutputSchema,
  },
  async (input) => {
    // Add retry logic for better reliability
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(
          `Attempt ${attempt} to generate project ideas for ${input.department}`
        );

        const { output } = await prompt(input);

        // Validate the output
        if (
          !output ||
          !output.projectIdeas ||
          output.projectIdeas.length === 0
        ) {
          throw new Error("No project ideas were generated");
        }

        // Ensure each project has required fields
        const validatedIdeas = output.projectIdeas.map(
          (idea: any, index: number) => ({
            title: idea.title || `Project Idea ${index + 1}`,
            explanation: idea.explanation || "Project explanation not provided",
            researchGap: idea.researchGap || "Research gap to be identified",
            difficulty: idea.difficulty || "Intermediate",
            estimatedDuration: idea.estimatedDuration || "6-8 months",
            requiredSkills: Array.isArray(idea.requiredSkills)
              ? idea.requiredSkills
              : ["Research", "Analysis", "Implementation"],
          })
        );

        console.log(
          `Successfully generated ${validatedIdeas.length} project ideas`
        );

        return { projectIdeas: validatedIdeas };
      } catch (error: any) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);

        // Don't retry on certain errors
        if (
          error.message.includes("API_KEY") ||
          error.message.includes("QUOTA_EXCEEDED") ||
          error.message.includes("invalid")
        ) {
          break;
        }

        // Wait before retry (except on last attempt)
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    // If all retries failed, throw the last error
    throw (
      lastError ||
      new Error("Failed to generate project ideas after multiple attempts")
    );
  }
);
