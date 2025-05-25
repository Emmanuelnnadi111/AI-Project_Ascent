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

import ImageDoc from "../../assets/Microsoft Word Icon on Gray Background.png";

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
    title: "Uses of mushroom in the production of selected soups",
    abstract:
      "A type of fungi typically characterized by a stem, cap, and gills or pores underneath the cap. Mushrooms can be found in a variety of habitats, such as forests, grasslands, and gardens. ",
    year: 2023,
    department: "Department of Hospitality Management",
    keywords: ["fungi", "mushroom", "production", "gardens"],
    HOD: "Dr. Okafor Obiefuna",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "6",
    title: "DESIGN AND IMPLEMENTATION OF AN ONLINE PROJECT GRADING SYSTEM",
    abstract:
      "This project focuses on the design and implementation of an online project grading system aimed at improving the efficiency, accuracy, and transparency of grading academic projects.",
    year: 2022,
    department: "Department of Computer Science",
    keywords: [
      "Online Grading System",
      " Project Evaluation",
      " Academic Assessment",
      " Digital Grading",
    ],
    HOD: "Mrs Victoria Okoma",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "7",
    title: "IMPACT OF COMMERCIAL BANK IN FINANCING AGRICULTURAL SECTOR",
    abstract:
      "This study examines the role and impact of commercial banks in financing the agricultural sector, highlighting their contribution to agricultural development and economic growth.",
    year: 2022,
    department: "Department of Agricultural Technology",
    keywords: [
      "Commercial Banks",
      "Agricultural Financing",
      " Rural Development",
      "  Agricultural Loans",
      "  Credit Facilities",
      "      Agribusiness",
    ],
    HOD: "Dr. Ezeobele Okechukwu",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "8",
    title: " Effects of Different Irrigation Methods on Tomato Crop Yield.",
    abstract:
      "This study investigates the effects of various irrigation methods on the yield and productivity of tomato crops. Efficient water management is a critical factor in maximizing agricultural output, especially for water-sensitive crops like tomatoes.",
    year: 2022,
    department: "Department of Horticultural Technology",
    keywords: [
      "Irrigation Methods",
      " Tomato Yield",
      " Drip Irrigation",
      " Sprinkler Irrigation",
      "    Furrow Irrigation",
      "  Water Use Efficiency",
    ],
    HOD: "Dr. Afugbuom Uchenna",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "9",
    title: "THE IMPACT OF EMPLOYEE DISCIPLINE ON ORGANIZATION PERFORMANCE",
    abstract:
      "This study examines the impact of employee discipline on organizational performance, emphasizing the role of effective disciplinary practices in fostering a productive work environment.",
    year: 2022,
    department: "Department of Business Administration & Management",
    keywords: [
      "Employee Discipline",
      " Organizational Performance",
      "Workplace Conduct",
      " Human Resource Management",
      " Employee Behavior",
    ],
    HOD: "Dr. Nwankwo Leopold Arinze",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "10",
    title: "THE ROLE OF WOMEN IN THE SOCIOECONOMIC DEVELOPMENT OF NIGERIA",
    abstract:
      "This study explores the vital role women play in the socioeconomic development of Nigeria. Women contribute significantly across various sectors including agriculture, education, healthcare, entrepreneurship, and governance.",
    year: 2022,
    department: "Department of Public Administration",
    keywords: [
      "Women Empowerment",
      "Socioeconomic Development",
      "  Gender Equality",
      " Nigeria",

      "  Female Participation",
    ],
    HOD: "Dr. Eberinwa Ogochukwu",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "11",
    title: "THE EFFECT OF SECRETARIAL MANPOWER ON ECONOMIC DEVELOPMENT",
    abstract:
      "This study investigates the effect of secretarial manpower on economic development, with a focus on the administrative support and organizational efficiency secretaries provide in both public and private sectors.",
    year: 2022,
    department: "Department of Office Technology and Management",
    keywords: [
      "Secretarial Manpower",
      " Economic Development",
      "Office Administration",
      "Organizational Efficiency",
      "Administrative Support",
      "Productivity",
    ],
    HOD: "Dr. Kenechukwu Theresa",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "12",
    title: "STRATEGIES FOR SUSTAINABLE BUSINESS DEVELOPMENT",
    abstract:
      "This study explores effective strategies for achieving sustainable business development, focusing on practices that balance economic growth with environmental responsibility and social impact.",
    year: 2022,
    department: "Department of Marketing",
    keywords: [
      "Stakeholder Engagement",
      "Longterm Planning",
      "  Business Resilience",
      "Sustainable Growth",
      "Sustainable Development",
      " Business Strategy",
    ],
    HOD: "Dr. Nwuba Chibike",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "13",
    title: "THE SALES AND USAGE OF SECONDHAND CLOTHING AMONG NIGERIANS",
    abstract:
      "This study investigate the sales and usage of secondhand clothing, Certain conditions compel individual into taking decisions and actions.",
    year: 2022,
    department: "Department of Fashion Design & Clothing Technology",
    keywords: ["Fashion", "Clothing", "secondhand", "Technology"],
    HOD: "Dr. Ada Lovelace",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "14",
    title: "Role Of Printing Technology In Sustaining Economic Development",
    abstract:
      "The work was undertake with a view to ascertain the efforts made so far by the Printing Technology to sustain economic development in Nigerian.",
    year: 2022,
    department: "Department of Printing Technology",
    keywords: ["Printing", "Technology", "economic", "development"],
    HOD: "Nnoli Ben",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "15",
    title: "PHOTO PUBLICITY OF TOURISM",
    abstract:
      "This project report was designed to publicize and explain the tourist center in Enugu State with the aid of photograph",
    year: 2022,
    department: "Department of Fine and Applied Arts",
    keywords: ["tourist", "PUBLICITY", "PHOTO", "photograph"],
    HOD: "Rev Ekwueme Benjamin",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "16",
    title: " HEALTH AND SAFETY ON CONSTRUCTION SITE",
    abstract:
      "Building construction sites are most times very hazardous due to the bulk and types of materials and equipment employed towards the realization of building project.",
    year: 2022,
    department: "Department of Civil Engineering Technology",
    keywords: ["Building", " Civil", "Engineering", "equipment"],
    HOD: "Engr Akigwe Ifeanyichukwu",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "17",
    title: " DESIGN AND CONSTRUCTION OF A SOLAR WATER HEATER FOR DOMESTIC USE",
    abstract:
      "Producing a substitute to the use of an electric heater for producing steam, a health and environmentally friendly source of producing steam lead to the design and construction of solar heater for domestic use which can  generate steam of 0.5 kg at about 100oc 30 minutes, using parabolic trough collector. ",
    year: 2022,
    department: "Department of Mechanical Engineering Technology",
    keywords: ["electric", " SOLAR", "design", " WATER"],
    HOD: "Engr Iwenofu Chinwenwa",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "18",
    title: "CONSTRUCTION AND DESIGN OF TRAFFIC LIGHT",
    abstract:
      "Virtually in all human endeavors, there is always an element of control. Even our behavioral patterns and manner of interactions are either internally or externally guided for a meaningful life appreciation.",
    year: 2022,
    department: "Department of Electrical/ Electronics Engineering Technology",
    keywords: ["CONSTRUCTION", "DESIGN", "TRAFFIC", "LIGHT"],
    HOD: "Engr Nwosu Ndubuisi",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "19",
    title:
      "Treatment of Refinery Waste Water Using activated Carbon Produced From Coconut Shell",
    abstract:
      "This study focuses on the treatment of refinery wastewater using activated carbon derived from coconut shells as an affordable and eco-friendly adsorbent.",
    year: 2022,
    department:
      "Department of Agricultural and Bio Environmental Engineering Technology",
    keywords: [
      "Refinery Wastewater",
      "Coconut Shell",
      "Adsorption",
      "Activated Carbon",
    ],
    HOD: "Engr Ifeanyichukwu Helen",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "20",
    title:
      "DESIGN AND IMPLEMENTATION OF A SMART DEVICE THAT COUNTS THE NUMBER OF PEOPLE INSIDE A CONFERENCE HALL",
    abstract:
      "This project focuses on the design and implementation of a smart device capable of accurately counting the number of people entering and exiting a conference hall in real-time.",
    year: 2022,
    department: "Department of Computer Engineering Technology",
    keywords: [
      "Smart Device",
      "People Counter",
      "Automation",
      "Embedded System",
    ],
    HOD: "Engr Nwankwo Vincent",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "21",
    title: "REFURBISHMENT OF FLUID FLOW DEMONSTRATION UNIT",
    abstract:
      "The refurbishment of the fluid flow demonstration unit was carried out in the Chemical Engineering pilot plant laboratory of the Institute of Management and Technology Enugu.",
    year: 2022,
    department: "Department of Chemical Engineering",
    keywords: ["FLUID", "refurbishment", "FLOW", "Chemical Engineering"],
    HOD: "Engr Udoye Benjamin",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "22",
    title: "DESIGN OF A GUEST HOUSE",
    abstract:
      "For the fact that there are human activities and social functions that always take place within Enugu capital, there is need to establish a hospitality institutions, for instance Guest House. This project aims at proffering solution to the establishment of Guest House.",
    year: 2022,
    department: "Department of Architecture",
    keywords: ["GUEST HOUSE", "establishment", "DESIGN", "lodging"],
    HOD: "Arch Aniemeka Churchil",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "23",
    title: "THE EFFECT OF COST OF ROOF ON THE TOTAL COST OF A BUILDING",
    abstract:
      "The research looked at the effect of cost of roof on the total cost of a building.It determines the attributes that effect the cost of roof, it finds out type of roofs and their cost implications and also examine the cost of the roof on the total cost of a building.",
    year: 2022,
    department: "Department of Building Technology",
    keywords: ["EFFECT", "ROOF", "BUILDING", "Technology"],
    HOD: "Bldr Ezenwata Chiedozie",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "24",
    title: " THE IMPACT OF DEPRESSED ECONOMY ON REAL ESTATE FINANCE",
    abstract:
      "Developed an intrusion detection system using anomaly detection algorithms to identify and flag potential cybersecurity threats in real-time network traffic.",
    year: 2022,
    department: "Department of Estate Management",
    keywords: ["DEPRESSED", "ECONOMY", "REAL ESTATE ", "FINANCE"],
    HOD: "Esv Yohanna Adamu",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "25",
    title:
      "EXAMINING THE CORRELATION BETWEEN WASTE MANAGEMENT AND PROFITABILITY",
    abstract:
      "This study examines the impact of a depressed economy on real estate finance, focusing on how economic downturns affect property investment, mortgage availability, and real estate development. ",
    year: 2022,
    department: "Department of Urban and Regional Planning",
    keywords: [
      "Depressed Economy",
      "Real Estate Finance",
      "Economic Downturn",
      "Property Investment",
      "Mortgage Market",
      "Interest Rates",
    ],
    HOD: "TPL Oduwole Olatunde",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "26",
    title:
      " ASSESSMENT OF THE SURVIVAL PRACTICES OF QUANTIITY SURVEYING FIRMS IN A RECESSED ECONOMY",
    abstract:
      "This study covered the assessment of the survival practices of quantity surveying firms in a recessed economy. Research hypothesis were formulated and analysed.",
    year: 2022,
    department: "Department of Quantity Surveying",
    keywords: ["SURVIVAL", "QUANTIITY", "SURVEYING", "ECONOMY"],
    HOD: "QS Maduekeh Chinedu Okwudili",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "27",
    title: "Boundary Mapping of Political Wards",
    abstract:
      "Political boundary mapping plays a crucial role in ensuring fair representation, resource allocation, and efficient governance. ",
    year: 2022,
    department: "Department of Surveying and Geo-informatics",
    keywords: ["Surveying", "Boundary", "Mapping", "Political"],
    HOD: "Surv. Samuel Okoli",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "28",
    title: "THE EFFECT OF FINTECH ON TRADITIONAL BANKING IN NIGERIA",
    abstract:
      "This study explores the effect of financial technology (FinTech) on traditional banking systems in Nigeria. The rapid growth of FinTech has introduced innovative solutions such as mobile banking, digital wallets, peer-to-peer lending, and blockchain-based transactions, which have significantly altered the landscape of financial services. ",
    year: 2022,
    department: "Department of Banking and Finance",
    keywords: ["FINTECH", "BANKING", "Finance", "TRADITIONAL"],
    HOD: "Dr. Ann Ike",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "29",
    title: "THE CONCEPT OF GREEN ACCOUNTING IN NIGERIA",
    abstract:
      "The study examined the concept of green accounting in Nigeria. The specific objectives were to determine the effect of: environmental cost accounting and green management accounting on the financial performance of oil and gas companies in Nigeria.",
    year: 2022,
    department: "Department of Accountancy",
    keywords: [
      "GREEN ACCOUNTING",
      "financial",
      "Accountancy",
      "green management",
    ],
    HOD: "Dr. Ezenwafor Emmanuel",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "30",
    title: "MANAGEMENT OF INSURANCE COMPANIES IN NIGERIA",
    abstract:
      "This study critically examines the management practices of insurance companies in Nigeria, focusing on the strategies, regulatory frameworks, and challenges that influence their operations and overall performance.",
    year: 2022,
    department: "Department of Insurance",
    keywords: ["MANAGEMENT", "Insurance", "COMPANIES", "operations"],
    HOD: "Jimoh Taiwo",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "31",
    title:
      "The Role of Natural Science Education in Promoting Environmental Awareness among Polytechnic Students",
    abstract:
      "This research explores the role of natural science education in promoting environmental awareness among students at Federal Polytechnic Oko.",
    year: 2022,
    department: "Department of Natural Science",
    keywords: [
      "Environmental Science",
      " Climate Change",
      "Curriculum Development",
      " Science Literacy",
      "Green Practices",
    ],
    HOD: "Dr. Onyejegbu Catherine",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "32",
    title: "Impact of Marketing Strategies on Consumers Patronage",
    abstract:
      "This study aimed to determine how marketing tactics affected consumer spending in Nigeria. The marketing mix theory and the push-pull theory served as the study’s guiding principles.",
    year: 2022,
    department: "Department of Social Science",
    keywords: ["Social Science", "Marketing", "Strategies", "Consumers"],
    HOD: "Dr. Muo Augustina",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "33",
    title:
      "The Impact of Multilingual Education on Academic Performance in Nigerian Polytechnics: A Case Study of Federal Polytechnic Oko",
    abstract:
      "This study investigates the influence of multilingual education on students' academic performance at Federal Polytechnic Oko. Recognizing Nigeria's linguistic diversity, the research examines how instruction in multiple languages affects comprehension, engagement, and overall academic success.",
    year: 2022,
    department: "Department of Languages",
    keywords: ["Multilingual", "Languages", "Academic", "Education"],
    HOD: "Nnoje Patience",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "34",
    title: "THE ROLE OF ADVERTISEMENT IN NEWSPAPER PATRONAGE",
    abstract:
      "The project is titled “The Role of Advertisement in Newspaper Patronage: A case study of Nigerian Tribune Newspaper; a stable of African Newspapers of Nigeria (ANN) PLC Ibadan. ",
    year: 2022,
    department: "Department of Mass Communication",
    keywords: ["ADVERTISEMENT", "Mass Communication", "NEWSPAPER", "PATRONAGE"],
    HOD: "Dr. Collins Obiorah",
    thumbnailUrl: ImageDoc,
  },
  {
    id: "35",
    title:
      "CHALLENGES AND PROSPECT OF THE ACQUISITION AND APPLICATION OF ICT TO LIBRARY SERVICES",
    abstract:
      "This study examines the challenges and prospects associated with the acquisition and application of Information and Communication Technology (ICT) in library services. ",
    year: 2022,
    department: "Department of Library and Information Science",
    keywords: [
      "Library Services",
      "Information Science",
      "ICT Acquisition",
      "Library Automation",
    ],
    HOD: "Ven Ekwufolu Moses",
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
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary "
            >
              <ExternalLink className="mr-2 h-4 w-4 " />
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
              <AlertDialogCancel className="hover:bg-primary">
                Close
              </AlertDialogCancel>
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
                className="pl-10 w-full "
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
              <SelectContent className="">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept} className="hover:bg-primary">
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
