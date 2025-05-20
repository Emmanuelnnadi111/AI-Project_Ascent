import { config } from 'dotenv';
config();

import '@/ai/flows/create-chapter-outline.ts';
import '@/ai/flows/generate-project-ideas.ts';
import '@/ai/flows/generate-full-proposal.ts';
import '@/ai/flows/refine-proposal-text.ts';
import '@/ai/flows/suggest-citations.ts';
