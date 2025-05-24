"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PastProject } from "@/lib/types";
import { Search, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ImageDoc from "../assets/Microsoft Word Icon on Gray Background.png";
const imageItem = {
  thumbnailUrl: ImageDoc,
};
const MOCK_PROJECTS: PastProject[] = [
  {
    id: "1",
    title: "ANALYSIS OF SOME MINERAL CONTENTS OF COCONUT WATER",
    abstract:
      "Coconut water, a popular tropical beverage, is increasingly recognized for its nutritional and health-promoting properties. This analysis focuses on its mineral composition—specifically calcium, magnesium, potassium, and sodium—and their roles in human physiology. Using interdisciplinary analytical methods from chemistry and nutrition science, the study explores how factors such as coconut maturity, soil conditions, and geographic origin influence mineral levels. By investigating these variables, the research aims to provide a clearer understanding of coconut water’s potential as a natural hydrator and electrolyte source, contributing valuable insights for applications in nutrition, medicine, and agriculture.",
    year: 2023,
    department: "Department of Science Laboratory Technology",
    keywords: [
      "Coconut",
      "water",
      "mineral",
      "composition",
      "electrolytes",
      "calcium",
      "magnesium",
      "potassium",
      "sodium",
      "nutrition",
    ],
    HOD: "Dr Nkamuo Chinwe Juliana",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "2",
    title: "Assessment of the Impact of Local Government on Rural Development",
    abstract:
      "The research focused on four main objectives, including evaluating the impact of local government efforts, identifying key principles for rural project implementation, investigating challenges such as corruption and mismanagement, and assessing the number of development initiatives carried out",
    year: 2022,
    department: "Department of Home and Rural Economics",
    keywords: ["Local", "government", "rural", "development"],
    HOD: "Dr. Okafor Emeka",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "3",
    title:
      "APPLICATION OF STATISTICAL QUALITY CONTROL TECHNIQUE IN FOOD AND BEVERAGE INDUSTRY",
    abstract:
      "Controlling and improving Quality has become an important business strategy for many organizations, because a business that can delight customers by improving and controlling quality can dominate its competitors.",
    year: 2023,
    department: "Department of Food Technology",
    keywords: ["Quality", "Control", "Statistical", "Data", "Collection"],
    HOD: "Obarisiagbon Ifegadinma",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "4",
    title: "A STATISTICAL ANALYSIS ON RATE OF INDUSTRIAL ACCIDENTS",
    abstract:
      "This project focuses on industrial accidents, their causes, and consequences, aims to analyze these accidents and promote safety practices to reduce their occurrence and consequences.",
    year: 2021,
    department: "Department of Statistics",
    keywords: [
      "Industrial Accidents",
      " Accident Prevention",
      "Workplace Safety",
      "Factory",
      "Safety",
    ],
    HOD: "Dr. Akabuike Nkiruka",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "5",
    title: "Bioplastics from Agricultural Waste",
    abstract:
      "Investigated methods to produce biodegradable plastics from common agricultural waste products, offering an eco-friendly alternative to conventional plastics.",
    year: 2023,
    department: "Department of Hospitality Management",
    keywords: ["Bioplastics", "Sustainability", "Chemistry", "Eco-friendly"],
    HOD: "Prof. Marie Curie",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "6",
    title: "DESIGN AND IMPLEMENTATION OF AN ONLINE PROJECT GRADING SYSTEM",
    abstract:
      "This project focuses on the design and implementation of an online project grading system aimed at improving the efficiency, accuracy, and transparency of grading academic projects.",
    year: 2022,
    department: "Department of Computer Science",
    keywords: ['Online Grading System',' Project Evaluation', ' Academic Assessment', ' Digital Grading'],
    HOD: "Mrs Victoria Okoma",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "7",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Agricultural Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "8",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Horticultural Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "9",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Business Administration & Management",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "10",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Public Administration",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "11",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Office Technology and Management",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "12",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Marketing",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "13",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Fashion Design & Clothing Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "14",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Printing Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "15",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Fine and Applied Arts",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "16",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Civil Engineering Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "17",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Mechanical Engineering Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "18",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Electrical/ Electronics Engineering Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "19",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department:
      "Department of Agricultural and Bio Environmental Engineering Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "20",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Computer Engineering Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "21",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Chemical Engineering",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "22",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Architecture",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "23",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Building Technology",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "24",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Estate Management",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "25",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Urban and Regional Planning",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "26",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Quantity Surveying",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "27",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Surveying and Geo-informatics",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "28",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Banking and Finance",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "29",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Accountancy",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "30",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Insurance",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "31",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Natural Science",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "32",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Social Science",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "33",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Languages",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "34",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Mass Communication",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "35",
    title: "Cybersecurity Threat Detection System",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Library and Information Science",
    keywords: ["Cybersecurity", "Network Security", "AI", "Anomaly Detection"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
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
        <CardDescription>
          {project.department} - {project.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {project.abstract}
        </p>
        {project.HOD && (
          <p className="text-xs text-muted-foreground mb-1">
            HOD: {project.HOD}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {project.keywords.map((keyword) => (
            <Badge key={keyword} variant="secondary">
              {keyword}
            </Badge>
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
                <strong>Department:</strong> {project.department} (
                {project.year})<br />
                {project.HOD && (
                  <>
                    <strong>HOD:</strong> {project.HOD}
                    <br />
                  </>
                )}
                <br />
                <strong>Abstract:</strong>
                <br />
                {project.abstract}
                <br />
                <br />
                <strong>Keywords:</strong> {project.keywords.join(", ")}
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const [departments, setDepartments] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const uniqueDepartments = [
      "all",
      ...new Set(MOCK_PROJECTS.map((p) => p.department).sort()),
    ];
    const uniqueYears = [
      "all",
      ...new Set(
        MOCK_PROJECTS.map((p) => p.year.toString()).sort(
          (a, b) => parseInt(b) - parseInt(a)
        )
      ),
    ];
    setDepartments(uniqueDepartments);
    setYears(uniqueYears);
  }, []);

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.keywords.some((k) =>
          k.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesDepartment =
        selectedDepartment === "all" ||
        project.department === selectedDepartment;
      const matchesYear =
        selectedYear === "all" || project.year.toString() === selectedYear;

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
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <PastProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle>No Projects Found</CardTitle>
          <CardDescription>
            Try adjusting your search terms or filters.
          </CardDescription>
        </Card>
      )}
    </div>
  );
}
