"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldAlert, SearchCheck } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  textToCheck: z.string().min(50, { message: "Please enter at least 50 characters to check." }).max(10000, {message: "Text cannot exceed 10,000 characters."}),
});

type PlagiarismFormValues = z.infer<typeof formSchema>;

export default function PlagiarismCheckerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<PlagiarismFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textToCheck: '',
    },
  });

  async function onSubmit(values: PlagiarismFormValues) {
    setIsLoading(true);
    setSimilarityScore(null);

    // Simulate API call for plagiarism check
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // This is a mock result. In a real app, this would come from an NLP service.
      const randomScore = Math.floor(Math.random() * 30) + 5; // Simulate a score between 5% and 35%
      setSimilarityScore(randomScore);
      toast({
        title: "Plagiarism Check Complete",
        description: `Similarity score: ${randomScore}%`,
      });
    } catch (error: any) {
      console.error("Plagiarism check failed:", error);
      toast({
        title: "Error During Check",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Plagiarism Checker"
        description="Paste your text below to check for similarity against past project topics. (Demo functionality)"
      />

      <Card className="mb-8 shadow-md">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="textToCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text to Check</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your project proposal introduction, abstract, or any section you want to check..."
                        className="resize-y min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SearchCheck className="mr-2 h-4 w-4" />
                )}
                Check for Similarity
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="text-center p-8">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
          <CardTitle>Checking for Plagiarism...</CardTitle>
          <CardDescription>This might take a few moments.</CardDescription>
        </Card>
      )}

      {similarityScore !== null && !isLoading && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Plagiarism Check Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The provided text has a similarity score of:
            </p>
            <div className="flex items-center gap-4">
              <Progress value={similarityScore} className="w-full h-3" />
              <span className="text-2xl font-bold text-primary">{similarityScore}%</span>
            </div>
            {similarityScore > 20 ? (
              <div className="flex items-start p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                <ShieldAlert className="h-5 w-5 text-destructive mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-destructive">High Similarity Detected</h5>
                  <p className="text-sm text-destructive/80">
                    A score above 20% may indicate potential plagiarism. Please review your text and sources carefully.
                  </p>
                </div>
              </div>
            ) : (
               <div className="flex items-start p-4 bg-green-500/10 border border-green-500/30 rounded-md">
                <ShieldCheck className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-green-700">Low Similarity</h5>
                  <p className="text-sm text-green-600/80">
                    The similarity score is within an acceptable range. Good job on maintaining originality!
                  </p>
                </div>
              </div>
            )}
            <p className="text-xs text-muted-foreground pt-2">
              <strong>Note:</strong> This is a demonstrative plagiarism checker. For academic submissions, always use official university-provided tools.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => {form.reset(); setSimilarityScore(null);}}>
              Check Another Text
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isLoading && similarityScore === null && (
         <Card className="text-center p-8 bg-muted/30">
            <SearchCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl">Ensure Originality</CardTitle>
            <CardDescription className="mt-2">Paste your text in the form above to perform a mock similarity check.</CardDescription>
        </Card>
      )}
    </div>
  );
}
