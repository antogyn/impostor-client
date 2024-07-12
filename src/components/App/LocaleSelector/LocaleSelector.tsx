import i18n from "../../../i18n";
import { Button } from "@/components/ui/button";

export const LocaleSelector = () => {
  const setLocale = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const activeLocale = localStorage.getItem("i18nextLng");
  console.log(`ActiveLocale is: ${activeLocale}`);

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
