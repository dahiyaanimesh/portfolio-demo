"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  status: "completed" | "in-progress" | "published";
  liveUrl?: string;
  githubUrl?: string;
  category: "data" | "web" | "automation" | "analysis" | "ai";
  icon: string;
  gradient: string;
};

const projects: Project[] = [
  {
    id: "project1",
    title: "E-Commerce Platform",
    problem: "Small businesses need an affordable, easy-to-use online store solution.",
    solution: "Built a full-stack e-commerce platform with modern React frontend, Node.js backend, and integrated payment processing.",
    description: "A modern e-commerce platform featuring product management, shopping cart, user authentication, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API", "JWT", "Tailwind CSS"],
    status: "completed",
    githubUrl: "https://github.com/example/ecommerce-platform",
    category: "web",
    icon: "🛒",
    gradient: "from-blue-500 via-indigo-500 to-purple-500"
  },
  {
    id: "project2",
    title: "Task Management Dashboard",
    problem: "Teams need a simple but effective way to track project progress and collaborate on tasks.",
    solution: "Created a responsive task management app with real-time updates, drag-and-drop functionality, and team collaboration features.",
    description: "A collaborative task management dashboard with real-time updates, progress tracking, and team workspace features.",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI", "Socket.io", "React Beautiful DnD"],
    status: "completed",
    githubUrl: "https://github.com/example/task-dashboard",
    category: "web",
    icon: "📋",
    gradient: "from-green-500 via-emerald-500 to-teal-500"
  },
  {
    id: "project3",
    title: "Weather Forecast App",
    problem: "Users want accurate weather information with an intuitive, mobile-friendly interface.",
    solution: "Developed a responsive weather application with location-based forecasts, interactive maps, and weather alerts.",
    description: "A responsive weather application providing accurate forecasts, location-based data, and severe weather alerts.",
    technologies: ["React", "OpenWeatherMap API", "Geolocation API", "Chart.js", "PWA"],
    status: "completed",
    liveUrl: "https://example-weather-app.vercel.app",
    category: "web",
    icon: "🌤️",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500"
  },
  {
    id: "project4",
    title: "Personal Portfolio Website",
    problem: "Developers need an effective way to showcase their skills and projects to potential employers.",
    solution: "Designed and built a modern, responsive portfolio website with smooth animations and optimized performance.",
    description: "A modern portfolio website featuring smooth animations, responsive design, and optimized performance for showcasing developer skills.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    status: "completed",
    liveUrl: "https://example-portfolio.vercel.app",
    category: "web",
    icon: "👨‍💻",
    gradient: "from-purple-500 via-pink-500 to-red-500"
  },
  {
    id: "project5",
    title: "Recipe Finder Application",
    problem: "Home cooks need an easy way to find recipes based on ingredients they have available.",
    solution: "Built a recipe discovery app that suggests meals based on available ingredients and dietary preferences.",
    description: "A recipe discovery application that helps users find meals based on available ingredients and dietary restrictions.",
    technologies: ["React", "Recipe API", "Local Storage", "Responsive Design"],
    status: "completed",
    githubUrl: "https://github.com/example/recipe-finder",
    category: "web",
    icon: "🍳",
    gradient: "from-orange-500 via-red-500 to-pink-500"
  },
  {
    id: "project6",
    title: "Budget Tracking App",
    problem: "Individuals need a simple way to track expenses and manage their personal finances.",
    solution: "Created a personal finance tracker with expense categorization, budget goals, and spending analytics.",
    description: "A personal finance application for tracking expenses, setting budget goals, and analyzing spending patterns.",
    technologies: ["React", "Chart.js", "Local Storage", "PWA", "CSS Grid"],
    status: "in-progress",
    githubUrl: "https://github.com/example/budget-tracker",
    category: "web",
    icon: "💰",
    gradient: "from-yellow-500 via-orange-500 to-red-500"
  },
  {
    id: "project7",
    title: "API Documentation Website",
    problem: "Developers need clear, interactive documentation for API integration.",
    solution: "Built an interactive API documentation site with live examples, code snippets, and testing capabilities.",
    description: "An interactive API documentation platform with live examples, code snippets, and built-in testing tools.",
    technologies: ["Next.js", "MDX", "REST API", "Swagger", "Prism.js"],
    status: "completed",
    category: "web",
    icon: "📚",
    gradient: "from-indigo-500 via-purple-500 to-pink-500"
  }
];

// Helper function to get project icon based on category
const getProjectVisual = (project: Project) => {
  const iconMap: { [key: string]: string } = {
    "ai": "🤖",
    "data": "📊", 
    "analysis": "📈",
    "web": "🌐",
    "automation": "⚡",
    "blockchain": "🔗"
  };
  
  return project.icon || iconMap[project.category] || "💻";
};

// Helper function to get status badge styling
const getStatusBadge = (status: Project["status"]) => {
  const statusConfig = {
    "completed": { text: "Completed", color: "bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/30" },
    "in-progress": { text: "In Progress", color: "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30" },
    "published": { text: "Published", color: "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/30" }
  };
  
  return statusConfig[status];
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<Project["category"] | "all">("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center transition-all duration-700 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Projects & Research
        </h2>
        
        <p className={`text-center text-foreground/70 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          A collection of web development projects showcasing modern technologies and problem-solving through innovative software solutions
        </p>
        
        <div className={`flex justify-center mb-8 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${filter === 'all' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:scale-105'}`}
              onClick={() => setFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === 'ai' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/5 backdrop-blur-xl border border-purple-400/20 hover:bg-purple-500/10 hover:scale-105 text-purple-300'
              }`}
              onClick={() => setFilter('ai')}
            >
              AI & ML
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === 'data' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white/5 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/10 hover:scale-105 text-blue-300'
              }`}
              onClick={() => setFilter('data')}
            >
              Data Science
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === 'analysis' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                  : 'bg-white/5 backdrop-blur-xl border border-green-400/20 hover:bg-green-500/10 hover:scale-105 text-green-300'
              }`}
              onClick={() => setFilter('analysis')}
            >
              Analysis
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === 'web' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-white/5 backdrop-blur-xl border border-orange-400/20 hover:bg-orange-500/10 hover:scale-105 text-orange-300'
              }`}
              onClick={() => setFilter('web')}
            >
              Web Development
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === 'automation' 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30' 
                  : 'bg-white/5 backdrop-blur-xl border border-yellow-400/20 hover:bg-yellow-500/10 hover:scale-105 text-yellow-300'
              }`}
              onClick={() => setFilter('automation')}
            >
              Automation
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const statusBadge = getStatusBadge(project.status);
            const isExpanded = expandedProject === project.id;
            
            return (
              <div 
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ 
                  transitionDelay: `${400 + index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 500ms, transform 500ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Dynamic Project Visual */}
                <div className={`relative h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b ${
                  project.category === 'ai' ? 'border-purple-400/30' :
                  project.category === 'data' ? 'border-blue-400/30' :
                  project.category === 'analysis' ? 'border-green-400/30' :
                  project.category === 'web' ? 'border-orange-400/30' :
                  project.category === 'automation' ? 'border-yellow-400/30' :
                  'border-indigo-400/30'
                }`}>
                  <div className={`absolute inset-0 ${
                    project.category === 'ai' ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/15' :
                    project.category === 'data' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/15' :
                    project.category === 'analysis' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/15' :
                    project.category === 'web' ? 'bg-gradient-to-br from-orange-500/20 to-red-500/15' :
                    project.category === 'automation' ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/15' :
                    'bg-gradient-to-br from-indigo-500/20 to-purple-500/15'
                  }`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-2">{getProjectVisual(project)}</div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                      {statusBadge.text}
                    </div>
                  </div>
                  
                  {/* Tech Stack Preview */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Problem-Solution Toggle */}
                  <button
                    onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? 'Hide Details' : 'View Details'}
                    <svg 
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                    <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-red-400 mb-1">Problem</h4>
                        <p className="text-xs text-foreground/70">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-1">Solution</h4>
                        <p className="text-xs text-foreground/70">{project.solution}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* All Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/20 hover:scale-105 transition-transform">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium flex items-center gap-1 hover:text-blue-500 transition-colors bg-white/5 px-3 py-2 rounded-lg hover:bg-white/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium flex items-center gap-1 hover:text-blue-500 transition-colors bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-2 rounded-lg hover:from-blue-500/20 hover:to-purple-500/20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 