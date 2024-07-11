import { useState, type FormEvent } from "react";
import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { useTranslation } from "react-i18next";

interface RoomProps {
  id: number;
}

export const SetName = ({ id }: RoomProps) => {
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
    Router.push("Room", { roomId: id.toString() });
  };

  return (
    <section className="username-form-container flex flex-col w-full h-full m-auto">
      <div className="form-container flex flex-col h-2/4 w-full m-auto">
        <h2 className="m-auto">{t("setName.greeting", { id })}</h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-6 items-center w-3/4 m-auto justify-center"
        >
          <Label className="form-label text-lg text-pumpkin-300">{t("form.set-name.label")}</Label>
          <Input
            name="userName"
            value={userInput}
            onChange={handleInputChange}
            placeholder={t("form.set-name.input.placeholder")}
            className=""
          />
          <Button type="submit" disabled={!userInput} className="flex">
            {t("button.join-room")}
          </Button>
        </form>
      </div>
    </section>
  );
};
