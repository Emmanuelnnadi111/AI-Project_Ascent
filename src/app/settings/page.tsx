
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Moon, Sun, Settings as SettingsIcon, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

type Theme = "light" | "dark" | "system";
const LOCAL_STORAGE_THEME_KEY = 'projectAscentTheme';
const LOCAL_STORAGE_PROPOSAL_DRAFT_KEY = 'projectAscentProposalDraft'; // Must match key in proposal-assistant

export default function SettingsPage() {
  const [theme, setThemeState] = useState<Theme>("system");
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (newTheme: Theme) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, "system");
        return;
      }
      root.classList.add(newTheme);
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);


  const handleClearProposalDrafts = () => {
    localStorage.removeItem(LOCAL_STORAGE_PROPOSAL_DRAFT_KEY);
    toast({
      title: "Drafts Cleared",
      description: "All saved proposal drafts have been removed from local storage.",
    });
  };

  if (!mounted) {
    // Avoid hydration mismatch by rendering a loader or null until mounted
    return (
        <div className="container mx-auto">
            <PageHeader title="Settings" description="Manage your application preferences." />
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <Card className="shadow-md">
                    <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                    <CardContent className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-6 bg-muted rounded w-1/4"></div>
                            <div className="h-6 bg-muted rounded w-1/4"></div>
                            <div className="h-6 bg-muted rounded w-1/4"></div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-md">
                    <CardHeader><CardTitle>Data Management</CardTitle></CardHeader>
                    <CardContent className="animate-pulse">
                         <div className="h-10 bg-muted rounded w-1/3"></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your application preferences and data."
      />
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><SettingsIcon className="mr-2 h-5 w-5 text-primary" /> Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Theme</h3>
            <RadioGroup value={theme} onValueChange={(newTheme: string) => setThemeState(newTheme as Theme)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center cursor-pointer">
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center cursor-pointer">
                  <SettingsIcon className="mr-2 h-4 w-4" /> System
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Trash2 className="mr-2 h-5 w-5 text-primary" /> Data Management</CardTitle>
            <CardDescription>Manage application data stored in your browser.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear Saved Proposal Drafts
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete all saved proposal drafts from your browser's local storage. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearProposalDrafts}>
                    Yes, Clear Drafts
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <p className="text-xs text-muted-foreground mt-2">
              This will remove any proposal drafts you've saved using the "Save Draft" feature in the Proposal Assistant.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
