
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppShell } from './app-shell'; // Import the new client component

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata can now be correctly exported from this Server Component
export const metadata: Metadata = {
  title: 'Project Ascent',
  description: 'AI-Powered Final Year Project Assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <AppShell>{children}</AppShell> {/* Use AppShell to wrap children */}
      </body>
    </html>
  );
}
