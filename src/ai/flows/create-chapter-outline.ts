// src/ai/flows/create-chapter-outline.ts
'use server';

/**
 * @fileOverview AI flow to generate a chapter outline for a project.
 *
 * - createChapterOutline - A function that takes a project title or abstract and returns a 6-chapter outline.
 * - CreateChapterOutlineInput - The input type for the createChapterOutline function.
 * - CreateChapterOutlineOutput - The return type for the createChapterOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateChapterOutlineInputSchema = z.object({
  projectTitleOrAbstract: z.string().describe('The title or abstract of the project.'),
});
export type CreateChapterOutlineInput = z.infer<typeof CreateChapterOutlineInputSchema>;

const ChapterSchema = z.object({
  title: z.string().describe("The title of the chapter (e.g., 'Chapter 1: Introduction')."),
  description: z.string().describe('A short description of the expected content for this chapter.'),
});

const CreateChapterOutlineOutputSchema = z.object({
  chapters: z.array(ChapterSchema).describe('An array of 6 chapters, each with a title and description.'),
});
export type CreateChapterOutlineOutput = z.infer<typeof CreateChapterOutlineOutputSchema>;

export async function createChapterOutline(input: CreateChapterOutlineInput): Promise<CreateChapterOutlineOutput> {
  return createChapterOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createChapterOutlinePrompt',
  input: {schema: CreateChapterOutlineInputSchema},
  output: {schema: CreateChapterOutlineOutputSchema},
  prompt: `Based on this project title or abstract: "{{projectTitleOrAbstract}}", create a typical 6-chapter outline for a final year report.
Each chapter should have a title and a short description of its expected content.
The chapters should be:
1. Introduction
2. Literature Review
3. Methodology
4. Implementation/Development (or System Design / Analysis, if more appropriate)
5. Results & Discussion
6. Conclusion & Recommendations

Return the response as a JSON object with a "chapters" array, where each element is an object with "title" and "description" fields.`,
});

const createChapterOutlineFlow = ai.defineFlow(
  {
    name: 'createChapterOutlineFlow',
    inputSchema: CreateChapterOutlineInputSchema,
    outputSchema: CreateChapterOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
