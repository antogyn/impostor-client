import { type FormEvent, useContext, useState } from "react";
import { NameContext } from "../../../../contexts/name-context";

import { CreateRoomOption } from "../CreateRoomOption/CreateRoomOption";
import { JoinRoomOption } from "../JoinRoomOption/JoinRoomOption";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Pen, Check, X } from "lucide-react";

export const UserOptions = () => {
  const [name, setName] = useContext(NameContext);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleEditingConfirmation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(userInput);
    setIsEditingName(false);
  };

  return (
    <section className="container flex flex-col items-center space-y-9">
      <div className="greeting bg-slate flex space-x-3 bg-slate-400">
        <p className="greeting text-2xl text-slate-50">Hello {name}!</p>
        {!isEditingName && (
          <button type="button" onClick={() => setIsEditingName(true)}>
            <Pen />
          </button>
        )}
      </div>
      {isEditingName && (
        <div className="username-form-container" hidden={!isEditingName}>
          <form onSubmit={handleEditingConfirmation} className="form flex space-x-3">
            <Input type="text" value={userInput} id="name" onChange={handleInputChange} />
            <Button className="confirm-btn" type="submit">
              <Check />
            </Button>
            <Button type="button" className="cancel-btn" onClick={() => setIsEditingName(false)}>
              <X />
            </Button>
          </form>
        </div>
      )}
      <div className="options-container flex flex-col bg-slate-400 w-full space-y-9">
        <div className="create-room-option flex flex-col bg-slate-700 w-full items-center space-y-3">
          <h2 className="text-xl uppercase">Create a new room</h2>
          <CreateRoomOption />
        </div>
        <Separator />
        <div className="join-room-option flex flex-col w-full items-center space-y-3 bg-slate-500">
          <h2 className="text-xl uppercase">Join an existing Room</h2>
          <JoinRoomOption />
        </div>
      </div>
    </section>
  );
};
