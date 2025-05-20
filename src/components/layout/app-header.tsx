
"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const getPageTitle = (pathname: string): string => {
  if (pathname === '/') return 'Home';
  if (pathname.startsWith('/project-ideas')) return 'Project Ideas';
  if (pathname.startsWith('/proposal-assistant')) return 'Proposal Assistant';
  if (pathname.startsWith('/past-projects')) return 'Past Projects Archive';
  if (pathname.startsWith('/plagiarism-checker')) return 'Plagiarism Checker';
  if (pathname.startsWith('/settings')) return 'Settings';
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
      {/* User Profile and Notifications buttons removed from here */}
    </header>
  );
}
