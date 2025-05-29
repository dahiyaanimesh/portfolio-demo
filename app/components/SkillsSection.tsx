"use client";

import { useEffect, useRef, useState } from "react";
// Import only the icons we actually use
import { 
  SiJavascript, SiReact, SiNodedotjs, SiHtml5,
  SiDocker, SiMongodb, SiAmazon, SiGit,
  SiMysql, SiVercel
} from "react-icons/si";
import { 
  FaServer, FaDatabase 
} from "react-icons/fa";

type CoreSkill = {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

type SkillCategory = {
  title: string;
  skills: string[];
  color: string;
};

// Tech stack icons mapping using React Icons
const techIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  // Frontend Development
  "JavaScript": SiJavascript,
  "React": SiReact,
  "HTML/CSS": SiHtml5,
  "Bootstrap": SiHtml5,
  
  // Backend Development
  "Node.js": SiNodedotjs,
  "Express": SiNodedotjs,
  "REST APIs": FaServer,
  
  // Database Technologies
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "PostgreSQL": FaDatabase,
  "Git": SiGit,
  
  // Development Tools
  "Docker": SiDocker,
  "Webpack": FaServer,
  "Jest": FaServer,
  
  // Frameworks & Libraries
  "TypeScript": SiJavascript,
  "CSS3": SiHtml5,
  "jQuery": SiJavascript,
  
  // Cloud & Deployment
  "AWS": SiAmazon,
  "Vercel": SiVercel,
  "Render": FaServer
};

const coreSkills: CoreSkill[] = [
  {
    name: "JavaScript",
    level: 90,
    icon: SiJavascript,
    description: "Frontend & Backend Development, Modern ES6+"
  },
  {
    name: "React",
    level: 85,
    icon: SiReact,
    description: "Modern React, Hooks, State Management"
  },
  {
    name: "Node.js",
    level: 80,
    icon: SiNodedotjs,
    description: "Backend Development, REST APIs, Express"
  },
  {
    name: "HTML/CSS",
    level: 95,
    icon: SiHtml5,
    description: "Responsive Design, Modern CSS, Flexbox/Grid"
  },
  {
    name: "Database Design",
    level: 75,
    icon: SiMysql,
    description: "SQL, NoSQL, Database Optimization"
  },
  {
    name: "Version Control",
    level: 85,
    icon: SiGit,
    description: "Git, GitHub, Collaborative Development"
  },
  {
    name: "Cloud Platforms",
    level: 70,
    icon: SiAmazon,
    description: "AWS, Deployment, Cloud Services"
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: ["JavaScript", "React", "HTML/CSS", "Bootstrap"],
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express", "REST APIs"],
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Database Technologies",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Git"],
    color: "from-blue-600 to-purple-500"
  },
  {
    title: "Development Tools",
    skills: ["Git", "Docker", "Webpack", "Jest"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "TypeScript", "CSS3", "jQuery"],
    color: "from-purple-600 to-blue-600"
  },
  {
    title: "Cloud & Deployment",
    skills: ["AWS", "Vercel", "Render", "Docker"],
    color: "from-blue-500 to-cyan-500"
  }
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center transition-all duration-700 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Skills & Expertise
        </h2>
        
        <p className={`text-center text-foreground/80 mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Passionate about modern web development with expertise in full-stack technologies and a focus on creating efficient, scalable applications
        </p>

        {/* Core Skills */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreSkills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ 
                  transitionDelay: `${400 + index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 500ms, transform 500ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3">
                    <skill.icon className="text-3xl mr-3 text-blue-400" />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-foreground">{skill.name}</h4>
                      <span className="text-sm text-blue-400 font-semibold">{skill.level}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/75 mb-3">{skill.description}</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full shadow-lg shadow-blue-500/30" 
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transition: 'width 1.5s ease-out'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
            Technology Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <div 
                key={category.title}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ 
                  transitionDelay: `${700 + index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 500ms, transform 500ms'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <h4 className={`font-bold text-lg mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => {
                      const IconComponent = techIcons[skill];
                      return (
                        <span 
                          key={skill} 
                          className="relative bg-white/5 backdrop-blur-sm text-sm px-3 py-1 rounded-full border border-blue-400/30 hover:border-blue-400/50 text-foreground/80 hover:text-foreground/95 hover:scale-105 transition-all duration-200 hover:bg-white/10 overflow-hidden group flex items-center gap-2"
                        >
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 