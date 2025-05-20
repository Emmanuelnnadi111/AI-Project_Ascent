
"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const getPageTitle = (pathname: string): string => {
  if (pathname === '/') return 'Home';
  if (pathname.startsWith('/project-ideas')) return 'Project Ideas';
  if (pathname.startsWith('/proposal-assistant')) return 'Proposal Assistant';
  if (pathname.startsWith('/past-projects')) return 'Past Projects Archive';
  if (pathname.startsWith('/plagiarism-checker')) return 'Plagiarism Checker';
  return 'Project Ascent';
};


export function AppHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
}
