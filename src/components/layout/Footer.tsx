
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-codesprint-blue/80 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-2xl text-codesprint-blue dark:text-white">
                Code<span className="text-codesprint-green">Sprint</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('hero.title')} {t('hero.titleHighlight')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-codesprint-blue dark:text-white">{t('navbar.services')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('footer.services.webDesign')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('footer.services.makeAutomation')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('footer.services.pythonAutomation')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('footer.services.dataAnalysis')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-codesprint-blue dark:text-white">{t('navbar.caseStudies')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('navbar.caseStudies')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-codesprint-green dark:hover:text-codesprint-green transition-colors">
                  {t('navbar.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-codesprint-blue dark:text-white">{t('footer.contactInfo.title')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">
                {t('footer.contactInfo.email')}
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                {t('footer.contactInfo.phone')}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {currentYear} CodeSprint. {t('footer.copyright')}
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-codesprint-green transition-colors">
                {t('footer.legal.terms')}
              </a>
              <a href="#" className="text-gray-500 hover:text-codesprint-green transition-colors">
                {t('footer.legal.privacy')}
              </a>
              <a href="#" className="text-gray-500 hover:text-codesprint-green transition-colors">
                {t('footer.legal.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
