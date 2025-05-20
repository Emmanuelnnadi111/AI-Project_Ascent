"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { draftProposalOutline, type DraftProposalOutlineOutput } from '@/ai/flows/draft-proposal-outline';
import type { ProposalOutline } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FilePenLine } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  projectTitle: z.string().min(5, { message: "Project title must be at least 5 characters." }).max(150),
});

type ProposalFormValues = z.infer<typeof formSchema>;

function ProposalOutlineSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Skeleton className="h-5 w-1/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Separator />
        <div>
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProposalAssistantPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [proposalOutline, setProposalOutline] = useState<ProposalOutline | null>(null);
  const { toast } = useToast();

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: '',
    },
  });

  async function onSubmit(values: ProposalFormValues) {
    setIsLoading(true);
    setProposalOutline(null);
    try {
      const result: DraftProposalOutlineOutput = await draftProposalOutline(values);
      setProposalOutline(result);
      toast({
        title: "Proposal Outline Drafted!",
        description: "Review the generated outline below.",
      });
    } catch (error: any) {
      console.error("Failed to draft proposal outline:", error);
      toast({
        title: "Error Drafting Outline",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Proposal Assistant"
        description="Enter your project title to get an AI-generated proposal introduction and chapter outline."
      />

      <Card className="mb-8 shadow-md">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI-Powered Diagnostic Tool for Crop Diseases" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FilePenLine className="mr-2 h-4 w-4" />
                )}
                Draft Outline
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && <ProposalOutlineSkeleton />}

      {proposalOutline && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Draft Proposal Outline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Introduction</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{proposalOutline.introduction}</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-lg mb-2">Chapter Outline</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{proposalOutline.chapterOutline}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {!isLoading && !proposalOutline && (
         <Card className="text-center p-8 bg-muted/30">
            <FilePenLine className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl">Kickstart your proposal writing</CardTitle>
            <CardDescription className="mt-2">Provide your project title above and let our AI assistant help you structure your proposal.</CardDescription>
        </Card>
      )}
    </div>
  );
}
