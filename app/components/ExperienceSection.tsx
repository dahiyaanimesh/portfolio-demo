"use client";

import { useEffect, useRef, useState } from "react";

type Experience = {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    id: "exp1",
    company: "Tech Solutions Inc.",
    position: "Full Stack Developer",
    location: "San Francisco, CA",
    period: "January 2022 - Present",
    description: [
      "Developed and maintained responsive web applications using React, Node.js, and MongoDB",
      "Collaborated with cross-functional teams to deliver high-quality software solutions",
      "Implemented automated testing and CI/CD pipelines, improving deployment efficiency by 40%",
      "Optimized application performance through code refactoring and database optimization",
      "Mentored junior developers and participated in code reviews to maintain code quality"
    ],
    technologies: ["React", "Node.js", "MongoDB", "TypeScript", "AWS", "Docker", "Git"]
  },
  {
    id: "exp2",
    company: "Digital Innovations LLC",
    position: "Frontend Developer",
    location: "New York, NY",
    period: "June 2020 - December 2021",
    description: [
      "Built modern, responsive user interfaces using React and TypeScript",
      "Collaborated with UX/UI designers to implement pixel-perfect designs",
      "Integrated RESTful APIs and GraphQL endpoints for dynamic data rendering",
      "Improved website performance and accessibility scores by implementing best practices"
    ],
    technologies: ["React", "TypeScript", "CSS3", "HTML5", "GraphQL", "Jest", "Webpack"]
  },
  {
    id: "exp3",
    company: "StartupXYZ",
    position: "Junior Web Developer",
    location: "Remote",
    period: "September 2019 - May 2020",
    description: [
      "Developed responsive web pages and components using HTML, CSS, and JavaScript",
      "Participated in agile development processes and daily stand-up meetings",
      "Assisted in debugging and testing web applications across different browsers",
      "Learned modern development frameworks and tools through hands-on experience"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery", "Git"]
  }
];

export default function ExperienceSection() {
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
      id="experience" 
      ref={sectionRef}
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-12 text-center transition-all duration-700 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Work Experience
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 500ms, transform 500ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{exp.position}</h3>
                      <h4 className="text-lg font-medium text-purple-400 mt-1">{exp.company}</h4>
                      <p className="text-sm text-foreground/70 mt-1">{exp.location}</p>
                    </div>
                    <span className="text-sm text-blue-300 mt-2 sm:mt-0 font-medium bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-foreground/90">{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30 hover:scale-105 transition-transform duration-200 backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
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