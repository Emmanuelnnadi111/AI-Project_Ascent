import type { GenerateProjectIdeasOutput } from '@/ai/flows/generate-project-ideas';
import type { DraftProposalOutlineOutput } from '@/ai/flows/draft-proposal-outline';

export type ProjectIdea = GenerateProjectIdeasOutput['projectIdeas'][0];

export type ProposalOutline = DraftProposalOutlineOutput;

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
