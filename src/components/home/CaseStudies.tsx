
import React, { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from "react-i18next";

const CaseStudies = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      title: t("caseStudies.items.0.title"),
      description: t("caseStudies.items.0.description"),
      category: t("caseStudies.items.0.category"),
      company: t("caseStudies.items.0.company"),
      image: "/lovable-uploads/6d0dc7cd-ac92-4a77-8666-75091dcada76.png",
    },
    {
      title: t("caseStudies.items.1.title"),
      description: t("caseStudies.items.1.description"),
      category: t("caseStudies.items.1.category"),
      company: t("caseStudies.items.1.company"),
      image: "/lovable-uploads/883614c8-15a2-4ca0-a050-d83b7e7d22b7.png",
    },
    {
      title: t("caseStudies.items.2.title"),
      description: t("caseStudies.items.2.description"),
      category: t("caseStudies.items.2.category"),
      company: t("caseStudies.items.2.company"),
      image: "/lovable-uploads/34f1e08d-d7a4-4bb9-af5d-9bc688c8d2d4.png",
    },
  ];

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
    <section id="case-studies" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-codesprint-blue dark:text-white reveal">
            {t("caseStudies.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg reveal opacity-0" style={{ animationDelay: "0.2s" }}>
            {t("caseStudies.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg reveal opacity-0"
              style={{ animationDelay: `${0.1 * index + 0.3}s` }}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                <AspectRatio ratio={16/9}>
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-medium text-codesprint-green">
                    {study.category}
                  </div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    {study.company}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-codesprint-blue dark:text-white">
                  {study.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {study.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
