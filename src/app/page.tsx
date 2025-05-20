import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/project-ideas');
  return null; // Or a loading spinner, but redirect handles it
}
