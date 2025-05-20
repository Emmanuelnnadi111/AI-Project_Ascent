
"use client"; // This component handles client-side logic

import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from 'next/navigation';

export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage ? (
        <main>{children}</main>
      ) : (
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon" variant="sidebar" side="left">
            <AppSidebar />
          </Sidebar>
          <SidebarInset>
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      )}
      <Toaster /> {/* Single Toaster instance for all pages */}
    </>
  );
}
