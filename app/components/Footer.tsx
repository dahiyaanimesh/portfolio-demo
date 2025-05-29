export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">John Developer</span>
          <p className="text-sm text-foreground/90 mt-2">
            Building the future, one line of code at a time
          </p>
        </div>
        
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-sm text-foreground/70">© {currentYear} John Developer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 