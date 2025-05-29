"use client";

import { useEffect, useRef, useState } from "react";

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
};

const education: Education[] = [
  {
    id: "edu1",
    institution: "State University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "September 2018 - May 2022",
    description: "Comprehensive study of computer science fundamentals, software engineering, algorithms, and data structures."
  },
  {
    id: "edu2",
    institution: "Community College",
    degree: "Associate Degree",
    field: "Information Technology",
    period: "September 2016 - May 2018",
    description: "Foundation courses in programming, database management, and computer networking."
  }
];

export default function EducationSection() {
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
      id="education" 
      ref={sectionRef}
      className="py-20 px-4"
    >
              <div className="container mx-auto">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-12 text-center transition-all duration-700 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Education
          </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div 
                key={edu.id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 500ms, transform 500ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 text-cyan-400">{edu.degree}</h3>
                      <h4 className="text-lg font-medium text-blue-400 mb-2">{edu.field}</h4>
                      <p className="font-medium text-foreground/90 mb-2">{edu.institution}</p>
                      <p className="text-sm text-blue-300 mb-3 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block border border-blue-500/30">
                        {edu.period}
                      </p>
                      {edu.description && (
                        <p className="text-foreground/70">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Publication Section */}
          <div className={`mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Publication</h3>
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2 text-green-400">Demo Research Publication</h4>
                      <p className="text-lg font-medium text-emerald-400 mb-2">Sample Academic Journal</p>
                      <p className="text-sm text-green-300 mb-3 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block border border-green-500/30">
                        January 2023
                      </p>
                      <p className="text-foreground/70">
                        Sample research paper demonstrating academic writing and research capabilities in computer science and technology. 
                        This is placeholder content for portfolio demonstration purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
} 