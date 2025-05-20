"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { generateProjectIdeas, type GenerateProjectIdeasOutput } from '@/ai/flows/generate-project-ideas';
import type { ProjectIdea } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  department: z.string().min(2, { message: "Department must be at least 2 characters." }).max(50),
  interests: z.string().min(10, { message: "Interests must be at least 10 characters." }).max(500),
});

type ProjectIdeasFormValues = z.infer<typeof formSchema>;

function ProjectIdeaCard({ idea }: { idea: ProjectIdea }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg text-primary">{idea.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-1">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{idea.explanation}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Potential Research Gap:</h4>
            <p className="text-sm text-muted-foreground">{idea.researchGap}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Explore Further</Button>
      </CardFooter>
    </Card>
  );
}

function ProjectIdeaSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Skeleton className="h-4 w-1/4 mb-1" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </div>
         <div>
          <Skeleton className="h-4 w-1/3 mb-1" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}

export default function ProjectIdeasPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[] | null>(null);
  const { toast } = useToast();

  const form = useForm<ProjectIdeasFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: '',
      interests: '',
    },
  });

  async function onSubmit(values: ProjectIdeasFormValues) {
    setIsLoading(true);
    setProjectIdeas(null);
    try {
      const result: GenerateProjectIdeasOutput = await generateProjectIdeas(values);
      setProjectIdeas(result.projectIdeas);
      toast({
        title: "Ideas Generated!",
        description: "Explore the project suggestions below.",
      });
    } catch (error: any) {
      console.error("Failed to generate project ideas:", error);
      toast({
        title: "Error Generating Ideas",
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
        title="Generate Project Ideas"
        description="Enter your department and interests to get AI-powered project suggestions."
      />
      
      <Card className="mb-8 shadow-md">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Computer Science, Mechanical Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas of Interest / Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Machine learning, renewable energy, web development, data analysis, robotics..."
                        className="resize-none"
                        rows={4}
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
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Ideas
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => <ProjectIdeaSkeleton key={i} />)}
        </div>
      )}

      {projectIdeas && projectIdeas.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Suggested Projects:</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectIdeas.map((idea, index) => (
              <ProjectIdeaCard key={index} idea={idea} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && projectIdeas && projectIdeas.length === 0 && (
         <Card className="text-center p-8">
            <CardTitle>No ideas found</CardTitle>
            <CardDescription>The AI couldn't generate ideas for your input. Try different keywords.</CardDescription>
        </Card>
      )}
      
      {!isLoading && !projectIdeas && (
        <Card className="text-center p-8 bg-muted/30">
            <Wand2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl">Ready to find your perfect project?</CardTitle>
            <CardDescription className="mt-2">Fill in the form above and let our AI assistant spark your creativity!</CardDescription>
        </Card>
      )}
    </div>
  );
}
