import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import WhatsAppButton from "../ui/WhatsAppButton";
import { useTranslation } from "react-i18next";
import { Phone, AlertTriangle, Loader } from "lucide-react";
import { submitToGoogleSheets } from "@/utils/googleSheetsService";

const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("entry.814652450", formData.name);      // Nombre
    formDataToSend.append("entry.1215899884", formData.email);    // Email
    formDataToSend.append("entry.670372047", formData.phone);     // Teléfono
    formDataToSend.append("entry.661695217", formData.company);   // Compañía
    formDataToSend.append("entry.1309090246", formData.message);   // Mensaje

    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLScHtcsiCgvzpKbn5vLYzjYGCqgXLNwWY3lUr6tN-ExXqtzQkw/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error al enviar el mensaje",
        description: "Intenta de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-codesprint-blue dark:text-white">
                {t("contact.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t("contact.subtitle")}
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-codesprint-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-codesprint-blue dark:text-white">{t("footer.contactInfo.title")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("footer.contactInfo.email")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-codesprint-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-codesprint-blue dark:text-white">{t("footer.contactInfo.phoneTitle")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("footer.contactInfo.phone")}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <WhatsAppButton phoneNumber="573012002547" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-codesprint-blue dark:text-white">
                {t("contact.form.title")}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder={t("contact.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder={t("contact.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder={t("contact.form.phone")}
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="company"
                    placeholder={t("contact.form.company")}
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("contact.form.message")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] bg-white dark:bg-gray-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-codesprint-blue hover:bg-codesprint-blue/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? t("contact.form.sending") : t("contact.form.submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
