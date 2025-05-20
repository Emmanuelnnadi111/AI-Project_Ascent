// src/ai/flows/suggest-citations.ts
'use server';

/**
 * @fileOverview AI flow to suggest citation topics, keywords, and example references.
 *
 * - suggestCitations - Suggests citations and research keywords.
 * - SuggestCitationsInput - Input type.
 * - SuggestCitationsOutput - Output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCitationsInputSchema = z.object({
  textSection: z.string().min(30, {message: "Text section must be at least 30 characters."}).describe('A section of the proposal (e.g., literature review, problem statement) for which suggestions are needed.'),
});
export type SuggestCitationsInput = z.infer<typeof SuggestCitationsInputSchema>;

const SuggestCitationsOutputSchema = z.object({
  suggestedTopicsToCite: z.array(z.string()).describe('A list of specific topics or concepts mentioned in the text that would benefit from citations.'),
  keywordsForSearch: z.array(z.string()).describe('A list of keywords for academic search engines based on the provided text.'),
  exampleReferences: z.array(z.string().describe("Placeholder for an example scholarly reference. Format as: Author, A. A. (Year). Title of work. Publisher or Journal, Vol(Issue), pp. xx-yy.")).describe('A list of 2-3 example scholarly references (placeholder text, not real-time search results) relevant to the topics. These should be formatted in a common citation style like APA.'),
});
export type SuggestCitationsOutput = z.infer<typeof SuggestCitationsOutputSchema>;

export async function suggestCitations(input: SuggestCitationsInput): Promise<SuggestCitationsOutput> {
  return suggestCitationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCitationsPrompt',
  input: {schema: SuggestCitationsInputSchema},
  output: {schema: SuggestCitationsOutputSchema},
  prompt: `Analyze the following proposal section:
"{{textSection}}"

Based on this text:
1.  Identify and list 3-5 specific topics or concepts that should ideally be supported by citations.
2.  Suggest 5-7 relevant keywords for searching academic databases (like Google Scholar, IEEE Xplore, arXiv).
3.  Provide 2-3 example scholarly references (these should be illustrative placeholders, formatted in APA style, not actual search results) that would be relevant to the identified topics. For example: "Doe, J. (2021). Advances in machine learning. Fictional University Press." or "Smith, A. & Lee, B. (2022). A study on renewable energy. Journal of Fake Studies, 10(2), 45-60."

Return the response as a JSON object.`,
});

const suggestCitationsFlow = ai.defineFlow(
  {
    name: 'suggestCitationsFlow',
    inputSchema: SuggestCitationsInputSchema,
    outputSchema: SuggestCitationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
