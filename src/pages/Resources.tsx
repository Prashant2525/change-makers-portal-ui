
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  Video,
  FileText,
  Link as LinkIcon,
  Download,
  Search,
  Upload,
  Plus
} from "lucide-react";

// Mock resources data
const allResources = [
  {
    id: 1,
    title: "Volunteer Handbook",
    type: "document",
    category: "Guidelines",
    description: "Complete guide for new volunteers with policies and procedures",
    downloadUrl: "#",
    fileType: "PDF",
    fileSize: "2.4 MB",
    uploadDate: "2025-03-15",
    icon: FileText,
  },
  {
    id: 2,
    title: "Fundraising Best Practices",
    type: "document",
    category: "Fundraising",
    description: "Strategies and tips for effective fundraising campaigns",
    downloadUrl: "#",
    fileType: "PDF",
    fileSize: "1.8 MB",
    uploadDate: "2025-02-20",
    icon: FileText,
  },
  {
    id: 3,
    title: "Project Management Training",
    type: "video",
    category: "Training",
    description: "Learn the basics of managing community projects effectively",
    downloadUrl: "#",
    fileType: "MP4",
    fileSize: "45 MB",
    uploadDate: "2025-01-10",
    duration: "32:15",
    icon: Video,
  },
  {
    id: 4,
    title: "Grant Writing Templates",
    type: "document",
    category: "Fundraising",
    description: "Ready-to-use templates for common grant applications",
    downloadUrl: "#",
    fileType: "DOCX",
    fileSize: "850 KB",
    uploadDate: "2025-03-02",
    icon: FileText,
  },
  {
    id: 5,
    title: "Community Outreach Strategies",
    type: "presentation",
    category: "Outreach",
    description: "Effective methods to engage with local communities",
    downloadUrl: "#",
    fileType: "PPTX",
    fileSize: "3.2 MB",
    uploadDate: "2025-02-05",
    icon: BookOpen,
  },
  {
    id: 6,
    title: "Social Media Best Practices",
    type: "link",
    category: "Marketing",
    description: "External resources for effective social media management",
    url: "https://example.com/social-media-guide",
    addedDate: "2025-03-18",
    icon: LinkIcon,
  },
  {
    id: 7,
    title: "Environmental Impact Assessment Tutorial",
    type: "video",
    category: "Training",
    description: "How to assess the environmental impact of your projects",
    downloadUrl: "#",
    fileType: "MP4",
    fileSize: "62 MB",
    uploadDate: "2025-01-28",
    duration: "45:20",
    icon: Video,
  },
  {
    id: 8,
    title: "Volunteer Recruitment Guide",
    type: "document",
    category: "Guidelines",
    description: "Strategies for recruiting and retaining volunteers",
    downloadUrl: "#",
    fileType: "PDF",
    fileSize: "1.5 MB",
    uploadDate: "2025-02-14",
    icon: FileText,
  },
];

// Resource categories
const resourceCategories = [
  "All",
  "Guidelines",
  "Fundraising",
  "Training",
  "Outreach",
  "Marketing",
];

const Resources = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  
  // Filter resources based on search, category and type
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
                        
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType = selectedType === "All" || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        
        {isAdmin && (
          <button className="inline-flex items-center gap-2 rounded-md bg-wfc-purple px-4 py-2 text-white transition-colors hover:bg-wfc-purple-dark">
            <Upload className="h-4 w-4" />
            <span>Upload Resource</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-700"
          >
            <option value="All">All Categories</option>
            {resourceCategories.slice(1).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-700"
          >
            <option value="All">All Types</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
            <option value="presentation">Presentations</option>
            <option value="link">External Links</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:divide-y-0">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <div
                key={resource.id}
                className={`p-4 ${
                  index % 2 === 1 ? "lg:border-l" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-wfc-purple/10 text-wfc-purple">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {resource.category}
                      </span>
                    </div>
                    
                    <p className="mb-2 text-sm text-gray-500 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      {resource.type === "document" || resource.type === "presentation" || resource.type === "video" ? (
                        <>
                          <span className="text-gray-500">
                            {resource.fileType} • {resource.fileSize}
                          </span>
                          <span className="text-gray-500">
                            Uploaded {new Date(resource.uploadDate).toLocaleDateString()}
                          </span>
                          {resource.type === "video" && (
                            <span className="text-gray-500">
                              Duration: {resource.duration}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500">
                          Added {new Date(resource.addedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3">
                      <a
                        href={resource.downloadUrl || resource.url}
                        target={resource.type === "link" ? "_blank" : undefined}
                        rel={resource.type === "link" ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
                      >
                        {resource.type === "link" ? (
                          <>
                            <LinkIcon className="h-3 w-3" /> 
                            Open Link
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3" /> 
                            Download
                          </>
                        )}
                      </a>
                      {isAdmin && (
                        <button className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-500">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gray-100">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-lg font-medium">No resources found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
      
      {isAdmin && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-wfc-purple/10 text-wfc-purple">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">Add More Resources</h3>
            <p className="mb-4 text-gray-500">
              Upload documents, videos, or add external links for your members
            </p>
            <button className="inline-flex items-center gap-2 rounded-md bg-wfc-purple px-4 py-2 text-sm text-white hover:bg-wfc-purple-dark">
              <Upload className="h-4 w-4" />
              Upload Files
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
