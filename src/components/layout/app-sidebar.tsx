
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BrainCircuit, Lightbulb, FileText, Archive, ShieldCheck, Settings } from 'lucide-react';

const navItems = [
  { href: '/project-ideas', label: 'Project Ideas', icon: Lightbulb },
  { href: '/proposal-assistant', label: 'Proposal Assistant', icon: FileText },
  { href: '/past-projects', label: 'Past Projects', icon: Archive },
  { href: '/plagiarism-checker', label: 'Plagiarism Checker', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Project Ascent
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label }}
                  className="justify-start"
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings" passHref legacyBehavior>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === '/settings'}
                tooltip={{ children: "Settings" }} 
                className="justify-start"
              >
                <a>
                  <Settings className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          {/* Logout button removed from here */}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
