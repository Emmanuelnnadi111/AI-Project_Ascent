# Project Ascent - AI-Powered Final Year Project Assistant

Project Ascent is a web application designed to assist final year students throughout their project lifecycle, from ideation to proposal writing. It leverages Generative AI to provide tools that streamline research, drafting, and refinement processes.

## Key Features

The application offers a suite of tools to support students:

1.  **Project Idea Generator:**
    *   Input: Student's department and areas of interest.
    *   Output: AI-generated project titles, short explanations, and potential research gaps.

2.  **Proposal Assistant:** A multi-functional tool to help craft compelling project proposals:
    *   **Chapter Outline Creator:** Generates a standard 6-chapter outline (Introduction, Literature Review, Methodology, Implementation/Development, Results & Discussion, Conclusion & Recommendations) based on a project title or abstract.
    *   **Full Proposal Generator:** Drafts a comprehensive project proposal including sections like Introduction, Problem Statement, Objectives, Scope, Significance, Methodology, and Expected Outcomes, based on project title, department, and optional abstract/keywords.
    *   **Proposal Refinement Tool:** Improves student-drafted text for clarity, academic tone, and grammar.
    *   **Citation & Research Suggester:** Analyzes a proposal section and suggests topics to cite, keywords for academic search, and example scholarly references (placeholders).

3.  **Past Projects Archive:**
    *   Allows students to browse and search through a (currently mock) database of past final year projects for inspiration and to understand project scopes and standards.
    *   Features filtering by department, year, and keyword search.



## Technology Stack

*   **Frontend:** Next.js (App Router), React, TypeScript
*   **UI:** ShadCN UI components, Tailwind CSS
*   **Generative AI:** Genkit (for integrating with AI models like Google's Gemini)
*   **Styling:** Tailwind CSS with a custom theme defined in `globals.css`

## Getting Started

To explore the application:
*   The **Home Page** (`src/app/page.tsx`) provides an overview and links to all features.
*   Navigate to specific tools using the sidebar:
    *   `/project-ideas`
    *   `/proposal-assistant`
    *   `/past-projects`

This project is developed by Osmaxin Developers.
