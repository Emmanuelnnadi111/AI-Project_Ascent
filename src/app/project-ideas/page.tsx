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
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/page-header';
import { generateProjectIdeas, type GenerateProjectIdeasOutput } from '@/ai/flows/generate-project-ideas';
import type { ProjectIdea } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ArrowRight, Clock, User, Lightbulb, BookOpen, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  department: z.string()
    .min(2, { message: "Department must be at least 2 characters." })
    .max(100, { message: "Department must be less than 100 characters." }),
  interests: z.string()
    .min(10, { message: "Please provide more detailed interests (at least 10 characters)." })
    .max(1000, { message: "Interests must be less than 1000 characters." }),
});

type ProjectIdeasFormValues = z.infer<typeof formSchema>;

// Extended ProjectIdea type to match our enhanced schema
interface EnhancedProjectIdea extends ProjectIdea {
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration?: string;
  requiredSkills?: string[];
}

function ProjectIdeaCard({ idea, index }: { idea: EnhancedProjectIdea; index: number }) {
  const { toast } = useToast();

  const handleExploreFurther = () => {
    toast({
      title: "Great Choice",
      description: `"${idea.title}" is an excellent project idea. Start by researching the background and defining your project scope. Good luck!`,
      duration: 8000,
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Project #{index + 1}</span>
          </div>
          {idea.difficulty && (
            <Badge className={getDifficultyColor(idea.difficulty)} variant="secondary">
              {idea.difficulty}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg text-primary leading-tight">{idea.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <h4 className="font-semibold text-sm">Project Overview:</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.explanation}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-orange-500" />
            <h4 className="font-semibold text-sm">Research Opportunity:</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.researchGap}</p>
        </div>

        {idea.estimatedDuration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Duration: {idea.estimatedDuration}</span>
          </div>
        )}

        {idea.requiredSkills && idea.requiredSkills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-purple-500" />
              <h4 className="font-semibold text-sm">Skills Needed:</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {idea.requiredSkills.slice(0, 5).map((skill, skillIndex) => (
                <Badge key={skillIndex} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {idea.requiredSkills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{idea.requiredSkills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExploreFurther}
          className="w-full hover:bg-blue-50 hover:border-blue-300"
        >
          Start This Project <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectIdeaSkeleton() {
  return (
    <Card className="border-l-4 border-l-gray-200">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-4/5" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </div>
        <div>
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}

export default function ProjectIdeasPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [projectIdeas, setProjectIdeas] = useState<EnhancedProjectIdea[] | null>(null);
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
      console.log('Generating ideas for:', values);
      
      const result: GenerateProjectIdeasOutput = await generateProjectIdeas(values);
      
      if (!result.projectIdeas || result.projectIdeas.length === 0) {
        throw new Error('No project ideas were generated. Please try with different keywords.');
      }
      
      setProjectIdeas(result.projectIdeas as EnhancedProjectIdea[]);
      
      toast({
        title: " Ideas Generated Successfully!",
        description: `Found ${result.projectIdeas.length} perfect project ideas for you. Explore them below!`,
        duration: 5000,
      });
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      
    } catch (error: any) {
      console.error("Failed to generate project ideas:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (error.message.includes('API_KEY')) {
        errorMessage = "Configuration error. Please contact support.";
      } else if (error.message.includes('QUOTA')) {
        errorMessage = "Service temporarily unavailable. Please try again in a few minutes.";
      } else if (error.message.includes('RATE_LIMIT')) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: " Generation Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto space-y-8">
      <PageHeader
        title="🚀 AI Project Ideas Generator"
        description="Discover innovative final year project ideas tailored to your interests and department. Powered by Google Gemini AI."
      />
      
      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-blue-500" />
            Tell Us About Yourself
          </CardTitle>
          <CardDescription>
            Provide your department and areas of interest to get personalized project suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Your Department</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Computer Science, Mechanical Engineering, Business Administration" 
                        className="h-11"
                        {...field} 
                      />
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
                    <FormLabel className="text-base font-medium">Your Interests & Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what excites you! E.g., machine learning, sustainable energy, mobile app development, data visualization, robotics, blockchain, healthcare technology, social media analytics..."
                        className="resize-none min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full sm:w-auto h-11 px-8"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Amazing Ideas...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Project Ideas
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div id="results-section">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            Crafting Perfect Projects for You...
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <ProjectIdeaSkeleton key={i} />)}
          </div>
        </div>
      )}

      {/* Results */}
      {projectIdeas && projectIdeas.length > 0 && (
        <div id="results-section">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Personalized Project Ideas
            </h3>
            <p className="text-muted-foreground">
              Here are {projectIdeas.length} innovative projects tailored just for you!
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectIdeas.map((idea, index) => (
              <ProjectIdeaCard key={index} idea={idea} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projectIdeas && projectIdeas.length === 0 && (
        <Card className="text-center p-8 border-dashed">
          <CardTitle className="text-xl text-muted-foreground">No Ideas Generated</CardTitle>
          <CardDescription className="mt-2">
            We couldn't generate ideas for your input. Try being more specific about your interests or try different keywords.
          </CardDescription>
        </Card>
      )}
      
      {/* Initial State */}
      {!isLoading && !projectIdeas && (
        <Card className="text-center p-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-dashed border-2 border-blue-200">
          <Wand2 className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          <CardTitle className="text-2xl text-gray-900 mb-2">
            Ready to Discover Your Next Big Project?
          </CardTitle>
          <CardDescription className="text-lg max-w-md mx-auto">
            Fill in the form above and let our AI create amazing project ideas that match your passion and skills!
          </CardDescription>
        </Card>
      )}
    </div>
  );
}