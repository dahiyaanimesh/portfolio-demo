"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function AboutSection() {
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
      id="about" 
      ref={sectionRef}
      className="py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center transition-all duration-700 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          About Me
        </h2>
        
        <p className={`text-center text-foreground/80 mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          A passionate software engineer dedicated to building innovative solutions and creating exceptional digital experiences
        </p>

        {/* Main Content */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Introduction Card */}
          <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">👨‍💻</div>
                <h3 className="text-2xl font-bold text-blue-400">Who I Am</h3>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                I'm a passionate software engineer with a strong foundation in full-stack development and modern web technologies. 
                With experience in building responsive applications and working with diverse technology stacks, I enjoy creating 
                solutions that make a real impact.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Currently focused on expanding my skills in cutting-edge technologies and frameworks, I combine technical expertise 
                with creative problem-solving to build efficient, scalable, and user-friendly applications.
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Journey & Experience */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🚀</div>
                  <h3 className="text-xl font-bold text-cyan-400">My Journey</h3>
                </div>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    My journey started with a Computer Science degree, where I discovered my passion for web development 
                    and software engineering. Since then, I've been constantly learning and building projects.
                  </p>
                  <p>
                    I have experience working with modern frameworks and technologies, building responsive web applications, 
                    and collaborating on various projects. I enjoy tackling challenging problems and finding elegant solutions.
                  </p>
                  <p>
                    Currently focused on expanding my expertise in full-stack development, cloud technologies, and modern 
                    JavaScript frameworks to create impactful digital experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach & Philosophy */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">💡</div>
                  <h3 className="text-xl font-bold text-purple-400">My Approach</h3>
                </div>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    I believe in writing <span className="text-purple-400 font-medium">clean, maintainable code</span> and 
                    <span className="text-blue-400 font-medium"> user-centered design</span>. My approach focuses on understanding 
                    requirements thoroughly and delivering solutions that exceed expectations.
                  </p>
                  <p>
                    Whether working on frontend interfaces, backend APIs, or full-stack applications, I prioritize performance, 
                    accessibility, and user experience to create applications that users love to interact with.
                  </p>
                  <p>
                    I'm passionate about staying current with the latest technologies and best practices, always looking for ways 
                    to improve code quality and development workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">⭐</div>
                <h3 className="text-xl font-bold text-green-400">Key Highlights</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="stat-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="stat-number text-2xl font-bold text-blue-400 mb-1">
                    <AnimatedCounter 
                      end={3} 
                      suffix="+ Years" 
                      duration={2000}
                      threshold={0.2}
                    />
                  </div>
                  <p className="text-sm text-foreground/75">Professional Experience in Software Development & Automation</p>
                </div>
                <div className="stat-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="stat-number text-2xl font-bold text-purple-400 mb-1">
                    <AnimatedCounter 
                      end={300} 
                      prefix="$" 
                      suffix="K" 
                      duration={2500}
                      threshold={0.2}
                    />
                  </div>
                  <p className="text-sm text-foreground/75">Annual Cost Savings Through Workflow Optimization</p>
                </div>
                <div className="stat-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="stat-number text-2xl font-bold text-emerald-400 mb-1">
                    <AnimatedCounter 
                      end={15} 
                      suffix="%" 
                      duration={2200}
                      threshold={0.2}
                    />
                  </div>
                  <p className="text-sm text-foreground/75">Reduction in Manual Work Through AI Chatbot Automation</p>
                </div>
                <div className="stat-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="stat-number text-2xl font-bold text-teal-400 mb-1">
                    <AnimatedCounter 
                      end={20} 
                      suffix="%" 
                      duration={2300}
                      threshold={0.2}
                    />
                  </div>
                  <p className="text-sm text-foreground/75">Improvement in Response Times Through Automation</p>
                </div>
                <div className="stat-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="stat-number text-2xl font-bold text-cyan-400 mb-1">
                    <AnimatedCounter 
                      end={5} 
                      suffix="+ Projects" 
                      duration={2100}
                      threshold={0.2}
                    />
                  </div>
                  <p className="text-sm text-foreground/75">Data Science & AI Projects Completed</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-lg font-medium mb-3 text-green-300">Core Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python", "Machine Learning", "Data Science", "Automation", "UiPath", 
                    "Full-Stack Development", "SQL", "Cloud Computing", "Process Optimization"
                  ].map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-green-500/10 text-green-400 text-sm px-3 py-1 rounded-full border border-green-500/20 hover:scale-105 transition-transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 