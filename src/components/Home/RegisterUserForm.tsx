import { type FormEvent, useState } from "react";

import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";

import { Button } from "../../components/ui/button";

import { ChevronRight } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { useTranslation } from "react-i18next";

export const RegisterUserForm = () => {
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState<string>("");
  const [_name, setName] = useContext(NameContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(userInput);
    setUserInput("");
  };

  return (
    <section className="username-form-container flex flex-col w-full h-3/4 m-auto">
      <div className="username-form-header flex flex-col m-auto space-y-3">
        <h2>{t("app.greeting")} 👋</h2>
        <p className="text-md">{t("app.tell-us-more")}</p>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-6 items-center w-3/4 m-auto justify-center"
      >
        <Label className="form-label text-lg text-pumpkin-300">{t("form.register.label")}</Label>
        <Input
          name="userName"
          value={userInput}
          onChange={handleInputChange}
          placeholder={t("form.register.input.placeholder")}
          className=""
        />
        <Button type="submit" disabled={!userInput} className="flex">
          {t("button.next")} <ChevronRight className="ml-3" />
        </Button>
      </form>
    </section>
  );
};
