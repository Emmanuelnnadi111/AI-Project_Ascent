// src/ai/flows/generate-project-ideas.ts
'use server';
/**
 * @fileOverview AI agent that generates project ideas, titles, and research gaps based on student input.
 *
 * - generateProjectIdeas - A function that generates project ideas.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectIdeasInputSchema = z.object({
  department: z.string().describe('The student\'s department.'),
  interests: z.string().describe('The student\'s areas of interest.'),
});

export type GenerateProjectIdeasInput = z.infer<typeof GenerateProjectIdeasInputSchema>;

const GenerateProjectIdeasOutputSchema = z.object({
  projectIdeas: z
    .array(
      z.object({
        title: z.string().describe('The title of the project idea.'),
        explanation: z.string().describe('A short explanation of the project idea.'),
        researchGap: z.string().describe('A potential research gap for the project.'),
      })
    )
    .describe('A list of project ideas.'),
});

export type GenerateProjectIdeasOutput = z.infer<typeof GenerateProjectIdeasOutputSchema>;

export async function generateProjectIdeas(input: GenerateProjectIdeasInput): Promise<GenerateProjectIdeasOutput> {
  return generateProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectIdeasPrompt',
  input: {schema: GenerateProjectIdeasInputSchema},
  output: {schema: GenerateProjectIdeasOutputSchema},
  prompt: `I am a final year student in {{department}}, interested in {{interests}}. Suggest 3 unique final year project titles with a short explanation and research gap for each. Return the response as a JSON array.`,
});

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeasFlow',
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: GenerateProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
