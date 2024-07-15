import { useEffect, useState } from "react";
import i18n from "../../../i18n";
import { Button } from "@/components/ui/button";

export const LocaleSelector = () => {
  const [activeLocale, setActiveLocale] = useState<string | null>(null);
  const setLocale = (lng: string) => {
    localStorage.setItem("i18nextLng", lng);
    setActiveLocale(lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem("i18nextLng");
    setActiveLocale(storedLocale);
    console.log(`ActiveLocale is: ${storedLocale}`);
  }, []);

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-3">
      <Button
        className={`fr-btn ${activeLocale === "fr" ? "active-locale-btn" : ""}`}
        type="button"
        size="icon"
        variant="outline"
        onClick={() => setLocale("fr")}
      >
        🇫🇷
      </Button>
      <Button
        className={`en-btn ${activeLocale === "en" ? "active-locale-btn" : ""}`}
        type="button"
        size="icon"
        variant="outline"
        onClick={() => setLocale("en")}
      >
        🇬🇧
      </Button>
    </div>
  );
};
