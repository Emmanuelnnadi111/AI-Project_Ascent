
"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { PastProject } from '@/lib/types';
import { Search, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const MOCK_PROJECTS: PastProject[] = [
  {
    id: '1',
    title: 'Machine Learning Model for Stock Prediction',
    abstract: 'Developed a recurrent neural network (RNN) based model to predict stock market trends with an accuracy of 75%. Utilized historical data and sentiment analysis from news articles.',
    year: 2023,
    department: 'Computer Science',
    keywords: ['Machine Learning', 'Finance', 'RNN', 'Python'],
    supervisor: 'Dr. Ada Lovelace',
    thumbnailUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '2',
    title: 'Smart Irrigation System using IoT',
    abstract: 'Designed and implemented an IoT-based smart irrigation system that optimizes water usage for agriculture by monitoring soil moisture and weather conditions.',
    year: 2022,
    department: 'Electrical Engineering',
    keywords: ['IoT', 'Agriculture', 'Arduino', 'Sensors'],
    supervisor: 'Prof. Nikola Tesla',
    thumbnailUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '3',
    title: 'Automated Waste Sorting Robot',
    abstract: 'A robotic system capable of identifying and sorting different types of waste materials using computer vision and machine learning to promote recycling.',
    year: 2023,
    department: 'Mechanical Engineering',
    keywords: ['Robotics', 'Computer Vision', 'Sustainability', 'AI'],
    supervisor: 'Dr. Alan Turing',
    thumbnailUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '4',
    title: 'Augmented Reality App for Historical Sites',
    abstract: 'An AR mobile application that overlays historical information and reconstructions onto real-world views of heritage sites, enhancing visitor experience.',
    year: 2021,
    department: 'Software Engineering',
    keywords: ['Augmented Reality', 'Mobile App', 'History', 'Unity'],
    supervisor: 'Dr. Grace Hopper',
    thumbnailUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '5',
    title: 'Bioplastics from Agricultural Waste',
    abstract: 'Investigated methods to produce biodegradable plastics from common agricultural waste products, offering an eco-friendly alternative to conventional plastics.',
    year: 2023,
    department: 'Chemical Engineering',
    keywords: ['Bioplastics', 'Sustainability', 'Chemistry', 'Eco-friendly'],
    supervisor: 'Prof. Marie Curie',
    thumbnailUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '6',
    title: 'Cybersecurity Threat Detection System',
    abstract: 'Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.',
    year: 2022,
    department: 'Computer Science',
    keywords: ['Cybersecurity', 'Network Security', 'AI', 'Anomaly Detection'],
    supervisor: 'Dr. Ada Lovelace',
    thumbnailUrl: 'https://placehold.co/600x400.png',
  },
];

function PastProjectCard({ project }: { project: PastProject }) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        {project.thumbnailUrl && (
          <div className="relative w-full h-40 mb-4 rounded-t-lg overflow-hidden">
            <Image 
              src={project.thumbnailUrl} 
              alt={project.title} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="research abstract"
            />
          </div>
        )}
        <CardTitle className="text-lg text-primary">{project.title}</CardTitle>
        <CardDescription>{project.department} - {project.year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{project.abstract}</p>
        {project.supervisor && <p className="text-xs text-muted-foreground mb-1">Supervisor: {project.supervisor}</p>}
        <div className="flex flex-wrap gap-1 mt-2">
          {project.keywords.map(keyword => (
            <Badge key={keyword} variant="secondary">{keyword}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{project.title}</AlertDialogTitle>
              <AlertDialogDescription className="max-h-[60vh] overflow-y-auto whitespace-pre-line">
                <strong>Department:</strong> {project.department} ({project.year})<br />
                {project.supervisor && <><strong>Supervisor:</strong> {project.supervisor}<br /></>}
                <br />
                <strong>Abstract:</strong><br />
                {project.abstract}
                <br /><br />
                <strong>Keywords:</strong> {project.keywords.join(', ')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default function PastProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const [departments, setDepartments] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const uniqueDepartments = ['all', ...new Set(MOCK_PROJECTS.map(p => p.department).sort())];
    const uniqueYears = ['all', ...new Set(MOCK_PROJECTS.map(p => p.year.toString()).sort((a,b) => parseInt(b) - parseInt(a)))];
    setDepartments(uniqueDepartments);
    setYears(uniqueYears);
  }, []);


  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartment = selectedDepartment === 'all' || project.department === selectedDepartment;
      const matchesYear = selectedYear === 'all' || project.year.toString() === selectedYear;
      
      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [searchTerm, selectedDepartment, selectedYear]);

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Past Projects Archive"
        description="Browse and search through previously approved final year projects for inspiration."
      />
      <Card className="mb-8 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, keyword, or abstract..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year === 'all' ? 'All Years' : year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <PastProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle>No Projects Found</CardTitle>
          <CardDescription>Try adjusting your search terms or filters.</CardDescription>
        </Card>
      )}
    </div>
  );
}
