
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import NetworkAnimation from "./NetworkAnimation";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 pb-16 bg-white dark:bg-codesprint-blue"
    >
      {/* Contenedor para la animación como fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <NetworkAnimation />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 reveal text-codesprint-blue dark:text-white text-glow">
              {t('hero.title')} <br />
              <span className="text-codesprint-green">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 reveal opacity-0 text-glow" style={{ animationDelay: "0.2s" }}>
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 reveal opacity-0" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="bg-codesprint-blue hover:bg-codesprint-blue/90 text-white"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.services')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-codesprint-blue text-codesprint-blue hover:bg-codesprint-blue/10 dark:border-white dark:text-white"
                onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.caseStudies')}
              </Button>
            </div>
          </div>
          
          <div className="lg:block hidden">
            {/* Este espacio queda vacío ya que la animación está en el fondo */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
