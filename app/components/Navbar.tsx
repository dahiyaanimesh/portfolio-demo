"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Track scroll position for navbar styling and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced active section tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sections = navItems.map(item => item.href.substring(1));
        const scrollPosition = window.scrollY + 200;
        
        let currentSection = "";
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && scrollPosition >= element.offsetTop) {
            currentSection = `#${sections[i]}`;
            break;
          }
        }
        
        if (!currentSection && window.scrollY < 100) {
          currentSection = `#${sections[0]}`;
        }
        
        if (currentSection && currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      }, 50);
    };

    if (!activeSection) {
      setActiveSection("#about");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeSection]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-background/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-300 ease-out shadow-lg shadow-blue-500/30"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-black/20 mt-1' 
          : 'bg-background/70 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-white/90 hover:text-blue-400 hover:scale-105 transition-all duration-300"
            >
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                John Developer
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                    activeSection === item.href
                      ? 'text-blue-400 bg-blue-500/15 border border-blue-500/30 shadow-lg shadow-blue-500/25'
                      : 'text-white/80 hover:text-blue-400 hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.href && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-sm opacity-75"></div>
                    </>
                  )}
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                className="relative p-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'top-3'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mt-4 mb-4">
              {navItems.map((item, index) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`block px-6 py-3 rounded-xl mx-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.href
                      ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/20'
                      : 'text-white/80 hover:text-blue-400 hover:bg-white/10'
                  }`}
                  onClick={toggleMenu}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <span className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSection === item.href ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 'bg-white/50'
                    }`}></div>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 