"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer", 
  "Frontend Developer",
  "Backend Developer"
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [nameLettersVisible, setNameLettersVisible] = useState<boolean[]>([]);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [pulseNodes, setPulseNodes] = useState<number[]>([]);
  


  // Generate data nodes for network visualization
  const dataNodes = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.min(Math.max((i * 19 + 20) % 70 + 15, 10), 85), // Better bounds control
    top: Math.min(Math.max((i * 27 + 25) % 60 + 20, 15), 80),
    size: 4 + (i % 3) * 2, // Varying sizes
    delay: (i * 0.4) % 2,
    duration: 4 + (i % 2)
  }));

  // Generate connection lines between nodes
  const connections = [
    { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 },
    { from: 3, to: 5 }, { from: 4, to: 6 }, { from: 5, to: 7 },
    { from: 6, to: 8 }, { from: 7, to: 9 }, { from: 0, to: 5 },
    { from: 1, to: 6 }, { from: 2, to: 7 }
  ];

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    
    // Professional fade-in animation
    const name = "John Developer";
    const letters = name.split('');
    letters.forEach((_, index) => {
      setTimeout(() => {
        setNameLettersVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 80 + 800); // Slower, more professional timing
    });

    // Dynamic node activation system
    const activateRandomNodes = () => {
      const numNodes = Math.floor(Math.random() * 3) + 2; // 2-4 nodes
      const selectedNodes: number[] = [];
      for (let i = 0; i < numNodes; i++) {
        const randomNode = Math.floor(Math.random() * dataNodes.length);
        if (!selectedNodes.includes(randomNode)) {
          selectedNodes.push(randomNode);
        }
      }
      setActiveNodes(selectedNodes);
      
      // Clear after animation
      setTimeout(() => setActiveNodes([]), 2000);
    };

    const createPulseWave = () => {
      const startNode = Math.floor(Math.random() * dataNodes.length);
      setPulseNodes([startNode]);
      
      // Spread pulse to connected nodes
      setTimeout(() => {
        const connectedNodes = connections
          .filter(conn => conn.from === startNode || conn.to === startNode)
          .map(conn => conn.from === startNode ? conn.to : conn.from);
        setPulseNodes([startNode, ...connectedNodes]);
      }, 300);
      
      // Clear pulse
      setTimeout(() => setPulseNodes([]), 1500);
    };

    // Start continuous animations after initial load
    setTimeout(() => {
      activateRandomNodes();
      const nodeInterval = setInterval(activateRandomNodes, 4000);
      const pulseInterval = setInterval(createPulseWave, 6000);
      
      return () => {
        clearInterval(nodeInterval);
        clearInterval(pulseInterval);
      };
    }, 2000);

  }, []);

  // Typing effect
  useEffect(() => {
    const currentText = ROLES[currentRole];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing forward
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Finished typing, wait then start deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause at end
      }
    } else {
      // Deleting backward
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Deleting speed (faster)
      } else {
        // Finished deleting, move to next role
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isTyping, currentRole]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">


      
      {/* Data Network Visualization */}
      {isMounted && (
        <div className="absolute inset-0 opacity-30">
                     {/* Connection Lines */}
           <svg className="absolute inset-0 w-full h-full" style={{ clipPath: 'inset(0)' }}>
             <defs>
               <clipPath id="viewport-clip">
                 <rect x="0" y="0" width="100%" height="100%" />
               </clipPath>
             </defs>
             {connections.map((connection, index) => {
               const fromNode = dataNodes[connection.from];
               const toNode = dataNodes[connection.to];
               const isActiveConnection = activeNodes.includes(connection.from) || activeNodes.includes(connection.to);
               const isPulseConnection = pulseNodes.includes(connection.from) && pulseNodes.includes(connection.to);
               
               // Only render lines that are within reasonable bounds
               if (fromNode.left > 100 || fromNode.top > 100 || toNode.left > 100 || toNode.top > 100) {
                 return null;
               }
               
               return (
                 <g key={index} clipPath="url(#viewport-clip)">
                   <line
                     x1={`${Math.min(Math.max(fromNode.left, 0), 100)}%`}
                     y1={`${Math.min(Math.max(fromNode.top, 0), 100)}%`}
                     x2={`${Math.min(Math.max(toNode.left, 0), 100)}%`}
                     y2={`${Math.min(Math.max(toNode.top, 0), 100)}%`}
                     stroke={
                       isActiveConnection 
                         ? "rgba(34, 211, 238, 0.4)" 
                         : isPulseConnection
                         ? "rgba(168, 85, 247, 0.3)"
                         : "rgba(59, 130, 246, 0.15)"
                     }
                     strokeWidth={isActiveConnection ? "1.5" : isPulseConnection ? "1" : "0.5"}
                     className="transition-all duration-500"
                     style={{
                       opacity: isActiveConnection ? 1 : isPulseConnection ? 0.8 : 0.6
                     }}
                   />
                 </g>
               );
             })}
           </svg>
          
          {/* Data Nodes */}
          {dataNodes.map((node) => {
            const isActive = activeNodes.includes(node.id);
            const isPulsing = pulseNodes.includes(node.id);
            
            return (
              <div
                key={node.id}
                className={`absolute rounded-full border transition-all duration-500 ${
                  isActive 
                    ? 'bg-cyan-400/70 border-cyan-300/60 animate-ping' 
                    : isPulsing
                    ? 'bg-purple-400/60 border-purple-300/50 animate-pulse'
                    : 'bg-blue-500/40 border-blue-400/30 animate-pulse'
                }`}
                style={{
                  left: `${node.left}%`,
                  top: `${node.top}%`,
                  width: `${node.size + (isActive ? 2 : 0)}px`,
                  height: `${node.size + (isActive ? 2 : 0)}px`,
                  animationDelay: `${node.delay}s`,
                  animationDuration: isActive ? '0.5s' : isPulsing ? '1s' : `${node.duration}s`,
                  boxShadow: isActive 
                    ? '0 0 20px rgba(34, 211, 238, 0.6)' 
                    : isPulsing
                    ? '0 0 15px rgba(168, 85, 247, 0.5)'
                    : '0 0 10px rgba(59, 130, 246, 0.3)',
                  transform: isActive ? 'scale(1.3)' : isPulsing ? 'scale(1.1)' : 'scale(1)'
                }}
              />
            );
          })}
        </div>
      )}

      {/* Floating Data Particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${(i * 23 + 10) % 90}%`,
                top: `${(i * 17 + 20) % 80}%`,
                animation: `float ${3 + (i % 2)}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Data Science Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-blue-400/30 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
          <div className="absolute inset-2 border border-cyan-400/40 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="flex flex-col space-y-1">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="bg-blue-400/30 rounded-sm animate-pulse"
              style={{
                width: `${20 + i * 8}px`,
                height: '3px',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-5 opacity-20">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 bg-purple-400/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`max-w-4xl mx-auto space-y-8 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Greeting with typing effect */}
          <div className="space-y-2">
            <p className="text-lg sm:text-xl text-blue-500 font-medium tracking-wide">
              👋 Hello, I'm
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-blue-100">
              {"John Developer".split('').map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-700 ease-out ${
                    nameLettersVisible[index] 
                      ? 'opacity-100 translate-y-0 blur-0' 
                      : 'opacity-0 translate-y-2 blur-sm'
                  }`}
                  style={{
                    transitionDelay: `${index * 60}ms`
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Dynamic Role with typing effect */}
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground/90">
              <span className="inline-block min-w-[300px] text-left">
                <span className="text-blue-500">
                  {displayedText}
                  <span 
                    className={`${
                      displayedText.length === ROLES[currentRole].length && isTyping 
                        ? 'animate-pulse' 
                        : ''
                    }`}
                  >
                    |
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {/* Enhanced Description */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl font-medium text-foreground/80 leading-relaxed">
              Computer Science Student & Aspiring Developer
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Passionate about creating innovative web applications and solving complex problems through code. 
              Experienced in <span className="text-blue-400 font-medium">JavaScript</span>, <span className="text-purple-400 font-medium">React</span>, 
              and <span className="text-cyan-400 font-medium">Modern Web Technologies</span>.
            </p>
          </div>

          {/* Enhanced Stats with Glassmorphism and Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto py-8">
            <div className="stat-card group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 hover:rotate-1 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="stat-number text-3xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter 
                    end={3} 
                    suffix="+" 
                    duration={2500}
                    threshold={0.3}
                  />
                </div>
                <div className="text-sm text-foreground/85 font-medium">Years Experience</div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
            </div>
            <div className="stat-card group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 hover:-rotate-1 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="stat-number text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter 
                    end={5} 
                    suffix="+" 
                    duration={2500}
                    threshold={0.3}
                  />
                </div>
                <div className="text-sm text-foreground/85 font-medium">Major Projects</div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center items-center">
            <Link 
              href="#contact" 
              className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
              style={{
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
              }}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Let's Connect
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
              style={{
                boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)',
                transition: 'all 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(147, 51, 234, 0.6), 0 0 20px rgba(147, 51, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(147, 51, 234, 0.3)';
              }}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <Link 
              href="#projects" 
              className="group relative bg-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-blue-400 text-foreground/80 hover:text-blue-400 font-semibold py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
              style={{
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.1)';
              }}
            >
              <span className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
} 