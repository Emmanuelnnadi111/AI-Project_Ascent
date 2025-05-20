// src/ai/flows/refine-proposal-text.ts
'use server';

/**
 * @fileOverview AI flow to refine student-drafted proposal text.
 *
 * - refineProposalText - Refines a given text.
 * - RefineProposalTextInput - Input type.
 * - RefineProposalTextOutput - Output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineProposalTextInputSchema = z.object({
  textToRefine: z.string().min(20, {message: "Text must be at least 20 characters."}).describe('The student-drafted text to be refined.'),
});
export type RefineProposalTextInput = z.infer<typeof RefineProposalTextInputSchema>;

const RefineProposalTextOutputSchema = z.object({
  refinedText: z.string().describe('The improved version of the text with clearer language, academic tone, and grammar corrections.'),
});
export type RefineProposalTextOutput = z.infer<typeof RefineProposalTextOutputSchema>;

export async function refineProposalText(input: RefineProposalTextInput): Promise<RefineProposalTextOutput> {
  return refineProposalTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineProposalTextPrompt',
  input: {schema: RefineProposalTextInputSchema},
  output: {schema: RefineProposalTextOutputSchema},
  prompt: `Please refine the following academic text. Focus on improving clarity, ensuring a formal academic tone, correcting grammar and spelling, and enhancing overall readability.
Do not add new information, but rephrase and restructure as needed.

Original Text:
"{{textToRefine}}"

Return the refined text.`,
});

const refineProposalTextFlow = ai.defineFlow(
  {
    name: 'refineProposalTextFlow',
    inputSchema: RefineProposalTextInputSchema,
    outputSchema: RefineProposalTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
