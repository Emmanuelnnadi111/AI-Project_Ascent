import type { GenerateProjectIdeasOutput } from '@/ai/flows/generate-project-ideas';
import type { CreateChapterOutlineOutput, CreateChapterOutlineInput } from '@/ai/flows/create-chapter-outline';
import type { GenerateFullProposalOutput, GenerateFullProposalInput } from '@/ai/flows/generate-full-proposal';
import type { RefineProposalTextOutput, RefineProposalTextInput } from '@/ai/flows/refine-proposal-text';
import type { SuggestCitationsOutput, SuggestCitationsInput } from '@/ai/flows/suggest-citations';

export type ProjectIdea = GenerateProjectIdeasOutput['projectIdeas'][0];

export type ChapterOutline = CreateChapterOutlineOutput;
export type ChapterOutlineInput = CreateChapterOutlineInput;

export type FullProposal = GenerateFullProposalOutput;
export type FullProposalInput = GenerateFullProposalInput;

export type RefinedText = RefineProposalTextOutput;
export type RefinedTextInput = RefineProposalTextInput;

export type CitationSuggestion = SuggestCitationsOutput;
export type CitationSuggestionInput = SuggestCitationsInput;


export interface PastProject {
  id: string;
  title: string;
  abstract: string;
  year: number;
  department: string;
  keywords: string[];
  supervisor?: string;
  studentName?: string;
  grade?: string;
  fileUrl?: string; // Link to PDF if available
  thumbnailUrl?: string; // For a placeholder image
}
