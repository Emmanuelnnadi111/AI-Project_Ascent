
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { Lightbulb, FileText, Archive, ShieldCheck, ArrowRight, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  ctaText?: string;
}

function FeatureCard({ title, description, href, icon: Icon, ctaText = "Get Started" }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl text-primary">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Additional content can go here if needed */}
      </CardContent>
      <CardContent> {/* Using CardContent for padding consistency for the button */}
        <Link href={href} passHref>
          <Button className="w-full" variant="outline">
            {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <section className="py-12 md:py-20 text-center">
        <div className="mx-auto mb-8 inline-block rounded-full bg-primary/10 p-4">
          <BrainCircuit className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Welcome to Project Ascent
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Your AI-powered assistant for navigating the final year project journey. From ideation to proposal, we're here to help you succeed.
        </p>
        <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mb-12">
            <Image
                src="https://placehold.co/1200x600.png"
                alt="Students collaborating on a project"
                layout="fill"
                objectFit="cover"
                data-ai-hint="academic project"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <div className="absolute bottom-6 left-6 text-left">
                <h2 className="text-2xl font-semibold text-white">Elevate Your Research</h2>
                <p className="text-md text-primary-foreground/80">Tools designed for academic excellence.</p>
            </div>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/project-ideas" passHref>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Find Project Ideas <Lightbulb className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/proposal-assistant" passHref>
            <Button size="lg" variant="outline">
              Go to Proposal Assistant <FileText className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      <PageHeader
        title="Core Features"
        description="Discover the tools that will make your project development smoother and more efficient."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-16">
        <FeatureCard
          title="Project Idea Generator"
          description="Stuck on what to work on? Get AI-powered project suggestions tailored to your interests and department."
          href="/project-ideas"
          icon={Lightbulb}
          ctaText="Generate Ideas"
        />
        <FeatureCard
          title="Proposal Assistant"
          description="Craft compelling proposals with AI. Generate outlines, draft sections, refine text, and get citation suggestions."
          href="/proposal-assistant"
          icon={FileText}
          ctaText="Craft Proposal"
        />
        <FeatureCard
          title="Past Projects Archive"
          description="Explore a curated list of past final year projects for inspiration and to understand successful project scopes."
          href="/past-projects"
          icon={Archive}
          ctaText="Browse Archive"
        />
        <FeatureCard
          title="Plagiarism Checker"
          description="Ensure originality. Check your text for similarity against a database of past projects (demo functionality)."
          href="/plagiarism-checker"
          icon={ShieldCheck}
          ctaText="Check Text"
        />
      </div>

      <section className="py-12 md:py-16 bg-muted/50 rounded-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Start Your Ascent?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Let Project Ascent be your guide through the complexities of your final year project.
          </p>
          <Link href="/project-ideas" passHref>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
