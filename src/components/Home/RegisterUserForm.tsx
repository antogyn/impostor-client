import { type FormEvent, useState } from "react";

import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterUserForm = () => {
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
    <section className="username-form-container">
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-6 items-center ">
        <Label className="form-label text-xl text-slate-100">Enter your name</Label>
        <Input name="userName" value={userInput} onChange={handleInputChange} placeholder="John" />
        <Button type="submit" disabled={!userInput}>
          Next
        </Button>
      </form>
    </section>
  );
};
