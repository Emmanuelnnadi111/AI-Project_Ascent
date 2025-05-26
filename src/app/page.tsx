"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import {
  Lightbulb,
  FileText,
  Archive,
  ArrowRight,
  BrainCircuit,
  Copyright,
} from "lucide-react";
import Image from "next/image";
import HeroImage from "/public/students with project.jpg";


interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  ctaText?: string;
}

function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  ctaText = "Get Started",
}: FeatureCardProps) {
  // const [featureIcon, setFeatureIcon] = useState(false)
  return (
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex-row items-start lg:gap-4 space-y-0 pb-4">
        <div className="bg-primary/10 p-3 rounded-full hidden lg:block">
          <Icon className="h-6 w-6  text-primary " />
        </div>
        <div>
          <CardTitle className="text-xl text-primary">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Additional content can go here if needed */}
      </CardContent>
      <CardContent>
  
        {/* Using CardContent for padding consistency for the button */}
        <Link href={href} passHref>
          <Button className="w-full  hover:bg-primary/90" variant="outline">
            {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="px-4 lg:container lg:mx-auto">
      <div className="md:h-screen py-12 md:py-4 lg:flex lg:flex-col lg:items-center lg:justify-center lg:py-0 ">
        <section className=" text-center">
          <div className="flex items-center gap-3 justify-center mb-2 ">
            <div className="rounded-full bg-primary/10 p-3">
              <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <p className="font-bold ">Project Ascent</p>
          </div>
          <h1 className="text-4xl md:text-2xl font-bold tracking-tight text-foreground mb-5">
            Welcome to Project Ascent
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Your AI-powered assistant for navigating the final year project
            journey. From ideation to proposal, we're here to help you succeed.
          </p>
          <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mb-12">
            <Image
              src={HeroImage}
              alt="Students collaborating on a project"
              fill
              objectPosition="center"
              objectFit="cover"
              data-ai-hint="academic project"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-left">
              <h2 className="text-2xl font-semibold text-white">
                Elevate Your Research
              </h2>
              <p className="text-md text-primary-foreground/80">
                Tools designed for academic excellence.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/project-ideas" passHref>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Find Project Ideas <Lightbulb className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/proposal-assistant" passHref>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/90"
              >
                Go to Proposal Assistant <FileText className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <div className="md:h-screen md:py-10 lg:flex flex-col items-center justify-center  lg:mt-0 lg:py-0">
        <div className="md:mt-0 lg:mt-2">
          <PageHeader
            title="Core Features"
            description="Discover the tools that will make your project development smoother and more efficient."
          />
          <div className="grid grid-cols-1 lg:justify-between sm:grid-cols-2  lg:flex lg:w-[80%] lg:m-auto  gap-6 mb-16">
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
          </div>
          <section className="mt-10 bg-muted/50 rounded-lg py-5">
            <div className="container mx-auto text-center">
              <h2 className="lg:text-3xl font-bold text-foreground mb-6">
                Ready to Start Your Ascent?
              </h2>
              <p className="lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Let Project Ascent be your guide through the complexities of
                your final year project.
              </p>
              <Link href="/project-ideas" passHref>
                <Button size="lg" className=" text-accent-foreground">
                  Explore All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          
              <p className="text-center text-xs md:text-sm text-muted-foreground flex  items-center justify-center pt-3">
                &copy; Copyright 2025 Osmaxin Developers. All Rights Reserved
              </p>
           
          </section>
        </div>
      </div>
    </div>
  );
}
