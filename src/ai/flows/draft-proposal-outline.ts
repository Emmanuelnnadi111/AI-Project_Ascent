// src/ai/flows/draft-proposal-outline.ts
'use server';

/**
 * @fileOverview AI flow to generate a draft proposal introduction and chapter outline based on a project title.
 *
 * - draftProposalOutline - A function that takes a project title and returns a draft proposal introduction and chapter outline.
 * - DraftProposalOutlineInput - The input type for the draftProposalOutline function.
 * - DraftProposalOutlineOutput - The return type for the draftProposalOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftProposalOutlineInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
});
export type DraftProposalOutlineInput = z.infer<typeof DraftProposalOutlineInputSchema>;

const DraftProposalOutlineOutputSchema = z.object({
  introduction: z.string().describe('A draft introduction for the project proposal.'),
  chapterOutline: z.string().describe('An outline of 5 chapters for the project proposal.'),
});
export type DraftProposalOutlineOutput = z.infer<typeof DraftProposalOutlineOutputSchema>;

export async function draftProposalOutline(input: DraftProposalOutlineInput): Promise<DraftProposalOutlineOutput> {
  return draftProposalOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftProposalOutlinePrompt',
  input: {schema: DraftProposalOutlineInputSchema},
  output: {schema: DraftProposalOutlineOutputSchema},
  prompt: `Based on this project title: "{{projectTitle}}", write a proposal introduction and outline 5 chapters for the final report.`,
});

const draftProposalOutlineFlow = ai.defineFlow(
  {
    name: 'draftProposalOutlineFlow',
    inputSchema: DraftProposalOutlineInputSchema,
    outputSchema: DraftProposalOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
