"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  FilePenLine,
  BookOpen,
  SearchCode,
  Brain,
  Download,
  Save,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  createChapterOutline,
  type CreateChapterOutlineOutput,
} from "@/ai/flows/create-chapter-outline";
import {
  generateFullProposal,
  type GenerateFullProposalOutput,
} from "@/ai/flows/generate-full-proposal";
import {
  refineProposalText,
  type RefineProposalTextOutput,
} from "@/ai/flows/refine-proposal-text";
import {
  suggestCitations,
  type SuggestCitationsOutput,
} from "@/ai/flows/suggest-citations";

// Schemas (unchanged)
const chapterOutlineSchema = z.object({
  projectTitleOrAbstract: z
    .string()
    .min(10, {
      message: "Project title or abstract must be at least 10 characters.",
    })
    .max(500),
});
type ChapterOutlineFormValues = z.infer<typeof chapterOutlineSchema>;

const fullProposalSchema = z.object({
  projectTitle: z
    .string()
    .min(5, { message: "Project title must be at least 5 characters." })
    .max(150),
  department: z
    .string()
    .min(2, { message: "Department must be at least 2 characters." })
    .max(50),
  abstractOrKeywords: z.string().max(500).optional(),
});
type FullProposalFormValues = z.infer<typeof fullProposalSchema>;

const refineTextSchema = z.object({
  textToRefine: z
    .string()
    .min(50, { message: "Text to refine must be at least 50 characters." })
    .max(10000),
});
type RefineTextFormValues = z.infer<typeof refineTextSchema>;

const suggestCitationsSchema = z.object({
  textSection: z
    .string()
    .min(50, { message: "Text section must be at least 50 characters." })
    .max(5000),
});
type SuggestCitationsFormValues = z.infer<typeof suggestCitationsSchema>;

const LOCAL_STORAGE_PROPOSAL_DRAFT_KEY = "projectAscentProposalDraft";

// Skeletons (unchanged)
function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function ChapterOutlineSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
            {i < 5 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function FullProposalSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <SectionSkeleton />
        <Separator />
        <SectionSkeleton />
        <Separator />
        <SectionSkeleton />
      </CardContent>
    </Card>
  );
}

export default function ProposalAssistantPage() {
  const { toast } = useToast();
  const [hasDraft, setHasDraft] = useState<boolean | null>(null); // Track draft existence
  const [isCheckingDraft, setIsCheckingDraft] = useState(true); // Track draft check status

  const [isLoadingChapterOutline, setIsLoadingChapterOutline] = useState(false);
  const [chapterOutlineResult, setChapterOutlineResult] =
    useState<CreateChapterOutlineOutput | null>(null);
  const [isLoadingFullProposal, setIsLoadingFullProposal] = useState(false);
  const [fullProposalResult, setFullProposalResult] =
    useState<GenerateFullProposalOutput | null>(null);
  const [isLoadingRefineText, setIsLoadingRefineText] = useState(false);
  const [refineTextResult, setRefineTextResult] =
    useState<RefineProposalTextOutput | null>(null);
  const [isLoadingSuggestCitations, setIsLoadingSuggestCitations] =
    useState(false);
  const [suggestCitationsResult, setSuggestCitationsResult] =
    useState<SuggestCitationsOutput | null>(null);

  const chapterOutlineForm = useForm<ChapterOutlineFormValues>({
    resolver: zodResolver(chapterOutlineSchema),
    defaultValues: { projectTitleOrAbstract: "" },
  });

  const fullProposalForm = useForm<FullProposalFormValues>({
    resolver: zodResolver(fullProposalSchema),
    defaultValues: { projectTitle: "", department: "", abstractOrKeywords: "" },
  });

  const refineTextForm = useForm<RefineTextFormValues>({
    resolver: zodResolver(refineTextSchema),
    defaultValues: { textToRefine: "" },
  });

  const suggestCitationsForm = useForm<SuggestCitationsFormValues>({
    resolver: zodResolver(suggestCitationsSchema),
    defaultValues: { textSection: "" },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem(LOCAL_STORAGE_PROPOSAL_DRAFT_KEY);
      setHasDraft(savedDraft !== null);
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(
            savedDraft
          ) as GenerateFullProposalOutput;
          setFullProposalResult(parsedDraft);
          toast({
            title: "Draft Loaded",
            description:
              "Your previously saved proposal draft has been loaded.",
          });
        } catch (error) {
          console.error("Failed to parse saved draft:", error);
          localStorage.removeItem(LOCAL_STORAGE_PROPOSAL_DRAFT_KEY);
          setHasDraft(false);
        }
      }
      setIsCheckingDraft(false);
    }
  }, []);

  async function onChapterOutlineSubmit(values: ChapterOutlineFormValues) {
    setIsLoadingChapterOutline(true);
    setChapterOutlineResult(null);
    try {
      const result = await createChapterOutline(values);
      setChapterOutlineResult(result);
      toast({
        title: "Chapter Outline Created!",
        description: "Review the generated outline.",
      });
    } catch (error: any) {
      toast({
        title: "Error Creating Outline",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingChapterOutline(false);
    }
  }

  async function onFullProposalSubmit(values: FullProposalFormValues) {
    setIsLoadingFullProposal(true);
    setFullProposalResult(null);
    try {
      const result = await generateFullProposal(values);
      setFullProposalResult(result);
      toast({
        title: "Full Proposal Generated!",
        description: "Review the drafted proposal.",
      });
    } catch (error: any) {
      toast({
        title: "Error Generating Proposal",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingFullProposal(false);
    }
  }

  async function onRefineTextSubmit(values: RefineTextFormValues) {
    setIsLoadingRefineText(true);
    setRefineTextResult(null);
    try {
      const result = await refineProposalText(values);
      setRefineTextResult(result);
      toast({
        title: "Text Refined!",
        description: "Review the improved text.",
      });
    } catch (error: any) {
      toast({
        title: "Error Refining Text",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRefineText(false);
    }
  }

  async function onSuggestCitationsSubmit(values: SuggestCitationsFormValues) {
    setIsLoadingSuggestCitations(true);
    setSuggestCitationsResult(null);
    try {
      const result = await suggestCitations(values);
      setSuggestCitationsResult(result);
      toast({
        title: "Suggestions Provided!",
        description: "Check the citation and research ideas.",
      });
    } catch (error: any) {
      toast({
        title: "Error Getting Suggestions",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSuggestCitations(false);
    }
  }

  const handleDownload = () => {
    toast({
      title: "Download (Not Implemented)",
      description: "This feature is for demonstration purposes.",
    });
  };

  const handleSaveDraft = () => {
    if (fullProposalResult) {
      localStorage.setItem(
        LOCAL_STORAGE_PROPOSAL_DRAFT_KEY,
        JSON.stringify(fullProposalResult)
      );
      setHasDraft(true);
      toast({
        title: "Draft Saved!",
        description:
          "Your full proposal draft has been saved to local storage.",
      });
    } else {
      toast({
        title: "Nothing to Save",
        description: "Please generate a proposal first.",
        variant: "destructive",
      });
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem(LOCAL_STORAGE_PROPOSAL_DRAFT_KEY);
    setFullProposalResult(null);
    setHasDraft(false);
    fullProposalForm.reset();
    toast({
      title: "Draft Cleared",
      description:
        "Your saved proposal draft has been removed from local storage.",
    });
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Proposal Assistant"
        description="A suite of AI-powered tools to help you craft the perfect project proposal."
      />

      {isCheckingDraft ? (
        <div className="mt-8">
          <SectionSkeleton />
        </div>
      ) : (
        <Tabs defaultValue="chapter-outline" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="chapter-outline">Chapter Outline</TabsTrigger>
            <TabsTrigger value="full-proposal">Full Proposal</TabsTrigger>
            <TabsTrigger value="refine-text">Refine Text</TabsTrigger>
            <TabsTrigger value="suggest-citations">
              Citation Suggester
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chapter-outline">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Create Chapter Outline</CardTitle>
                <CardDescription>
                  Enter your project title or abstract to generate a 6-chapter
                  outline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...chapterOutlineForm}>
                  <form
                    onSubmit={chapterOutlineForm.handleSubmit(
                      onChapterOutlineSubmit
                    )}
                    className="space-y-6"
                  >
                    <FormField
                      control={chapterOutlineForm.control}
                      name="projectTitleOrAbstract"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title or Abstract</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., AI-Powered Diagnostic Tool for Crop Diseases, or a short abstract..."
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoadingChapterOutline}
                      className="w-full sm:w-auto"
                    >
                      {isLoadingChapterOutline ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <BookOpen className="mr-2 h-4 w-4" />
                      )}
                      Create Outline
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            {isLoadingChapterOutline && (
              <div className="mt-8">
                <ChapterOutlineSkeleton />
              </div>
            )}
            {chapterOutlineResult && !isLoadingChapterOutline && (
              <Card className="mt-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Generated Chapter Outline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chapterOutlineResult.chapters.map((chapter, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-lg">{chapter.title}</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {chapter.description}
                      </p>
                      {index < chapterOutlineResult.chapters.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="full-proposal">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Generate Full Proposal Draft</CardTitle>
                <CardDescription>
                  Provide details to generate a comprehensive proposal draft.
                  Your drafts can be saved and loaded using local storage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...fullProposalForm}>
                  <form
                    onSubmit={fullProposalForm.handleSubmit(
                      onFullProposalSubmit
                    )}
                    className="space-y-6"
                  >
                    <FormField
                      control={fullProposalForm.control}
                      name="projectTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Advanced IoT-Based Smart Home System"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={fullProposalForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Computer Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={fullProposalForm.control}
                      name="abstractOrKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Abstract or Keywords (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief abstract or comma-separated keywords..."
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoadingFullProposal}
                      className="w-full sm:w-auto"
                    >
                      {isLoadingFullProposal ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <FilePenLine className="mr-2 h-4 w-4" />
                      )}
                      Generate Proposal
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            {isLoadingFullProposal && (
              <div className="mt-8">
                <FullProposalSkeleton />
              </div>
            )}
            {fullProposalResult && !isLoadingFullProposal && (
              <Card className="mt-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Generated Full Proposal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      title: "Introduction",
                      content: fullProposalResult.introduction,
                    },
                    {
                      title: "Problem Statement",
                      content: fullProposalResult.problemStatement,
                    },
                    {
                      title: "Objectives",
                      content: fullProposalResult.objectives,
                    },
                    {
                      title: "Scope of Study",
                      content: fullProposalResult.scopeOfStudy,
                    },
                    {
                      title: "Significance of Study",
                      content: fullProposalResult.significanceOfStudy,
                    },
                    {
                      title: "Methodology",
                      content: fullProposalResult.methodology,
                    },
                    {
                      title: "Expected Outcomes",
                      content: fullProposalResult.expectedOutcomes,
                    },
                  ].map((section, index, arr) => (
                    <div key={section.title}>
                      <h4 className="font-semibold text-lg mb-1">
                        {section.title}
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {section.content}
                      </p>
                      {index < arr.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button onClick={handleSaveDraft} variant="default">
                    <Save className="mr-2 h-4 w-4" /> Save Draft
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Saved Draft
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently delete your saved
                          proposal draft from local storage. This cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearDraft}>
                          Yes, Clear Draft
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download (Demo)
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="refine-text">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Refine Your Proposal Text</CardTitle>
                <CardDescription>
                  Paste your drafted text to get an improved version with better
                  clarity and academic tone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...refineTextForm}>
                  <form
                    onSubmit={refineTextForm.handleSubmit(onRefineTextSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={refineTextForm.control}
                      name="textToRefine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Draft Text</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste your text here..."
                              {...field}
                              rows={8}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoadingRefineText}
                      className="w-full sm:w-auto"
                    >
                      {isLoadingRefineText ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Brain className="mr-2 h-4 w-4" />
                      )}
                      Refine Text
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            {isLoadingRefineText && (
              <div className="mt-8">
                <SectionSkeleton />
              </div>
            )}
            {refineTextResult && !isLoadingRefineText && (
              <Card className="mt-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Refined Text
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {refineTextResult.refinedText}
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download (Demo)
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="suggest-citations">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Citation & Research Suggester</CardTitle>
                <CardDescription>
                  Paste a section of your proposal to get suggestions for
                  citations and research keywords.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...suggestCitationsForm}>
                  <form
                    onSubmit={suggestCitationsForm.handleSubmit(
                      onSuggestCitationsSubmit
                    )}
                    className="space-y-6"
                  >
                    <FormField
                      control={suggestCitationsForm.control}
                      name="textSection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposal Section Text</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste your literature review, problem statement, etc."
                              {...field}
                              rows={6}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoadingSuggestCitations}
                      className="w-full sm:w-auto"
                    >
                      {isLoadingSuggestCitations ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <SearchCode className="mr-2 h-4 w-4" />
                      )}
                      Get Suggestions
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            {isLoadingSuggestCitations && (
              <div className="mt-8">
                <SectionSkeleton />
              </div>
            )}
            {suggestCitationsResult && !isLoadingSuggestCitations && (
              <Card className="mt-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Citation & Research Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      Suggested Topics to Cite:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {suggestCitationsResult.suggestedTopicsToCite.map(
                        (topic, i) => (
                          <li key={i}>{topic}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      Keywords for Academic Search:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {suggestCitationsResult.keywordsForSearch.map(
                        (keyword, i) => (
                          <li key={i}>{keyword}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      Example Scholarly References (Placeholders):
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {suggestCitationsResult.exampleReferences.map(
                        (ref, i) => (
                          <li key={i}>{ref}</li>
                        )
                      )}
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">
                      Note: These are illustrative examples, not live search
                      results. Always verify and find actual sources.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
