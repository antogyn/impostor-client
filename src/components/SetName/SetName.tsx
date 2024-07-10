import { useState, type FormEvent } from "react";
import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

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
    <section className="username-form-container flex flex-col w-full h-full m-auto">
      <div className="form-container flex flex-col h-2/4 w-full m-auto">
        <h2 className="m-auto">
          Welcome to Room <span className="font-bold">{id}</span>!
        </h2>
        {/* <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-6 items-center h-2/4 w-3/4 m-auto"
        >
          <Label className="form-label text-xl text-summer-green-500">
            Please enter your name first!
          </Label>
          <Input
            name="userName"
            value={userInput}
            onChange={handleInputChange}
            placeholder="John"
            className="w-3/4"
          />
          <Button type="submit" disabled={!userInput}>
            Join Room
          </Button>
        </form> */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-6 items-center w-3/4 m-auto justify-center"
        >
          <Label className="form-label text-lg text-pumpkin-300">
            Please enter your name first!
          </Label>
          <Input
            name="userName"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter your name..."
            className=""
          />
          <Button type="submit" disabled={!userInput} className="flex">
            Join Room
          </Button>
        </form>
      </div>
    </section>
  );
};
