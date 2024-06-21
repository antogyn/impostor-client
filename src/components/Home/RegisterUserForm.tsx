import { type FormEvent, useState } from "react";

import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

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
    <section className="username-form-container flex flex-col w-full h-full m-auto">
      <div className="form-container flex h-2/4 w-full m-auto">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-6 items-center h-2/4 w-3/4 m-auto"
        >
          <Label className="form-label text-xl text-summer-green-500">Enter your name</Label>
          <Input
            name="userName"
            value={userInput}
            onChange={handleInputChange}
            placeholder="John"
            className="w-3/4"
          />
          <Button type="submit" disabled={!userInput}>
            Next
          </Button>
        </form>
      </div>

      <div className="img-container flex h-2/4 m-auto">
        {/* <img src="/connection.svg" alt="Two people exchanging text messages" /> */}
        <img src="/no-data.svg" alt="Empty writing boards" className="h-3/4" />
      </div>
    </section>
  );
};
