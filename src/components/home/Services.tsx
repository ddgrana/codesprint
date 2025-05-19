
import React, { useEffect } from "react";
import { Code, Settings, Database, BarChart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const serviceItems = [
    {
      icon: <Code className="h-8 w-8 text-codesprint-green" />,
      title: t("services.items.webDesign.title"),
      description: t("services.items.webDesign.description"),
    },
    {
      icon: <Settings className="h-8 w-8 text-codesprint-green" />,
      title: t("services.items.makeAutomation.title"),
      description: t("services.items.makeAutomation.description"),
    },
    {
      icon: <Database className="h-8 w-8 text-codesprint-green" />,
      title: t("services.items.pythonAutomation.title"),
      description: t("services.items.pythonAutomation.description"),
    },
    {
      icon: <BarChart className="h-8 w-8 text-codesprint-green" />,
      title: t("services.items.dataAnalysis.title"),
      description: t("services.items.dataAnalysis.description"),
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
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-codesprint-blue dark:text-white reveal">
            {t("services.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-3 reveal opacity-0" style={{ animationDelay: "0.3s" }}>
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {serviceItems.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg reveal opacity-0"
              style={{ animationDelay: `${0.1 * index + 0.3}s` }}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-codesprint-blue dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
