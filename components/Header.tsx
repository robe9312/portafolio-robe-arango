
import React, { useState, useEffect } from 'react';
import { ARTIST_NAME } from '../constants';
import { useTheme } from '../App';

const Logo: React.FC = () => (
    <div className="flex items-center gap-3">
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-900 group-hover:text-terracotta-500 transition-colors duration-300"
        >
            <path
                d="M6 18C9.46667 18 12.1333 16.5 14 13.5C15.8667 10.5 17.5333 9 19 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 4H12V12H4V4Z"
                fill="currentColor"
            />
        </svg>
        <span className="text-2xl font-serif font-bold tracking-tight text-slate-900 group-hover:text-terracotta-500 transition-colors duration-300">
            {ARTIST_NAME}
        </span>
    </div>
);

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse"></div>;
    }
    
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta-500"
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
        >
            <div className="relative w-6 h-6 overflow-hidden">
                {/* Sun Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${isDark ? '-translate-y-full opacity-0 -rotate-45' : 'translate-y-0 opacity-100 rotate-0'}`}
                >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                {/* Moon Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-full opacity-0 rotate-45'}`}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </div>
        </button>
    );
};


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'portfolio', label: 'Portafolio' },
    { id: 'docencia', label: 'Docencia' },
    { id: 'sobre-mi', label: 'Sobre Mí' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        const headerElement = document.querySelector('header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= docHeight - 50) {
          setActiveSection('contacto');
          return;
      }
      
      let currentSectionId = '';
      for (const section of sections) {
          if (section) {
              const sectionTop = section.offsetTop - headerHeight - 20; // Header height offset + buffer
              if (scrollPosition >= sectionTop) {
                  currentSectionId = section.id;
              }
          }
      }

      if (currentSectionId && currentSectionId !== activeSection) {
        setActiveSection(currentSectionId);
      } else if (!currentSectionId && activeSection !== 'inicio' && scrollPosition < 200) {
        setActiveSection('inicio');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [activeSection]);

  const navLinks = (
      <>
        {navItems.map(item => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={(e) => handleNavClick(e, item.id)}
            className={
              `text-sm uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-px hover:text-terracotta-500 ${
                activeSection === item.id ? 'text-terracotta-500' : 'text-slate-900'
              }`
            }
          >
            {item.label}
          </a>
        ))}
      </>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-slate-50/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          <a href="#inicio" className={`group transition-all duration-300 transform hover:scale-105 ${isScrolled ? 'scale-95' : 'scale-100'}`} onClick={(e) => handleNavClick(e, 'inicio')}>
            <Logo />
          </a>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks}
            </nav>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="md:hidden">
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="text-slate-900 focus:outline-none transition-transform duration-300 hover:scale-110"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
