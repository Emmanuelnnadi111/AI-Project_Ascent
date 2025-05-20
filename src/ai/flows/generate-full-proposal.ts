// src/ai/flows/generate-full-proposal.ts
'use server';

/**
 * @fileOverview AI flow to generate a full project proposal draft.
 *
 * - generateFullProposal - Generates a project proposal.
 * - GenerateFullProposalInput - Input type.
 * - GenerateFullProposalOutput - Output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFullProposalInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  department: z.string().describe('The student\'s department.'),
  abstractOrKeywords: z.string().optional().describe('Optional: A brief abstract or a list of keywords for the project.'),
});
export type GenerateFullProposalInput = z.infer<typeof GenerateFullProposalInputSchema>;

const GenerateFullProposalOutputSchema = z.object({
  introduction: z.string().describe('A detailed introduction for the project proposal.'),
  problemStatement: z.string().describe('A clear statement of the problem the project aims to solve.'),
  objectives: z.string().describe('A list of specific objectives for the project, typically 3-5 bullet points or a paragraph.'),
  scopeOfStudy: z.string().describe('The scope and limitations of the project.'),
  significanceOfStudy: z.string().describe('The importance and potential impact of the project.'),
  methodology: z.string().describe('An overview of the proposed methodology, including techniques or approaches if applicable.'),
  expectedOutcomes: z.string().describe('The anticipated results and deliverables of the project.'),
});
export type GenerateFullProposalOutput = z.infer<typeof GenerateFullProposalOutputSchema>;

export async function generateFullProposal(input: GenerateFullProposalInput): Promise<GenerateFullProposalOutput> {
  return generateFullProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFullProposalPrompt',
  input: {schema: GenerateFullProposalInputSchema},
  output: {schema: GenerateFullProposalOutputSchema},
  prompt: `You are an AI assistant helping a student draft a project proposal.
Project Title: "{{projectTitle}}"
Department: "{{department}}"
{{#if abstractOrKeywords}}
Abstract/Keywords: "{{abstractOrKeywords}}"
{{/if}}

Based on the information above, generate a professional project proposal with the following sections:
1.  Introduction: Provide a comprehensive introduction to the project.
2.  Problem Statement: Clearly define the problem this project addresses.
3.  Objectives: List the main objectives of the project (e.g., as bullet points).
4.  Scope of Study: Define the boundaries and limitations of the project.
5.  Significance of Study: Explain the importance and potential impact of this research.
6.  Methodology: Briefly outline the research methodology or approach to be used.
7.  Expected Outcomes: Describe the anticipated results and deliverables.

Ensure the language is academic and suitable for a university-level project proposal.
`,
});

const generateFullProposalFlow = ai.defineFlow(
  {
    name: 'generateFullProposalFlow',
    inputSchema: GenerateFullProposalInputSchema,
    outputSchema: GenerateFullProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
