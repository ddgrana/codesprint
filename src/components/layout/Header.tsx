
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: t('navbar.home'), href: "#home" },
    { name: t('navbar.services'), href: "#services" },
    { name: t('navbar.caseStudies'), href: "#case-studies" },
    { name: t('navbar.contact'), href: "#contact" },
  ];

  const currentLanguage = i18n.language;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-codesprint-blue/90 shadow-md backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-codesprint-blue dark:text-white">
            Code<span className="text-codesprint-green">Sprint</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-codesprint-blue dark:text-gray-200 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => changeLanguage('es')}
              className={`px-2 py-1 text-sm ${
                currentLanguage === 'es' 
                  ? 'bg-codesprint-green text-white' 
                  : 'text-codesprint-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Cambiar a español"
            >
              {t('language.es')}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 text-sm ${
                currentLanguage === 'en' 
                  ? 'bg-codesprint-green text-white' 
                  : 'text-codesprint-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Switch to English"
            >
              {t('language.en')}
            </button>
          </div>

          <Button 
            variant="default" 
            className="bg-codesprint-green hover:bg-codesprint-green/90 text-white"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('navbar.startNow')}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-codesprint-blue dark:text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-codesprint-blue shadow-lg animate-fade-in">
          <nav className="container py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-codesprint-blue dark:text-gray-200 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors py-2"
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Switcher for Mobile */}
            <div className="flex items-center border rounded-md overflow-hidden self-start my-2">
              <button
                onClick={() => {
                  changeLanguage('es');
                  toggleMenu();
                }}
                className={`px-3 py-2 ${
                  currentLanguage === 'es' 
                    ? 'bg-codesprint-green text-white' 
                    : 'text-codesprint-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="Cambiar a español"
              >
                {t('language.es')}
              </button>
              <button
                onClick={() => {
                  changeLanguage('en');
                  toggleMenu();
                }}
                className={`px-3 py-2 ${
                  currentLanguage === 'en' 
                    ? 'bg-codesprint-green text-white' 
                    : 'text-codesprint-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="Switch to English"
              >
                {t('language.en')}
              </button>
            </div>
            
            <Button 
              variant="default" 
              className="bg-codesprint-green hover:bg-codesprint-green/90 text-white w-full mt-2"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                toggleMenu(); // Close mobile menu after clicking
              }}
            >
              {t('navbar.startNow')}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
