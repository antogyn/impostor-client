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
    // <main className="set-name-page-container flex flex-col h-full items-center space-y-3">
    //   <h2 className="text-2xl text-slate-200">Welcome to Room {id}!</h2>
    //   <form onSubmit={handleFormSubmit} className="flex flex-col space-y-6 items-center">
    //     <Label className="form-label text-xl text-slate-100">Please enter your name first!</Label>
    //     <Input name="userName" value={userInput} onChange={handleInputChange} placeholder="John" />
    //     <Button type="submit">Next</Button>
    //   </form>
    // </main>
    <section className="username-form-container flex flex-col w-full h-full m-auto">
      <div className="form-container flex flex-col h-2/4 w-full m-auto">
        <h2 className="text-2xl text-summer-green-500 m-auto">
          Welcome to Room <span className="font-bold">{id}</span>!
        </h2>
        <form
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
        </form>
      </div>

      <div className="img-container flex h-2/4 m-auto">
        {/* <img src="/connection.svg" alt="Two people exchanging text messages" /> */}
        <img src="/no-data.svg" alt="Empty writing boards" className="h-3/4" />
      </div>
    </section>
  );
};
