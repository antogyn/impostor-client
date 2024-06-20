import { useState, type FormEvent } from "react";
import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RoomProps {
  id: number;
}

export const SetName = ({ id }: RoomProps) => {
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
    <main className="set-name-page-container flex flex-col h-full items-center space-y-3">
      <h2 className="text-2xl text-slate-200">Welcome to Room {id}!</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-6 items-center">
        <Label className="form-label text-xl text-slate-100">Please enter your name first!</Label>
        <Input name="userName" value={userInput} onChange={handleInputChange} placeholder="John" />
        <Button type="submit">Next</Button>
      </form>
    </main>
  );
};
