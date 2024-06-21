import { useContext, useState, type FormEvent } from "react";
import { NameContext } from "../../../../contexts/name-context";
import { CreateRoomOption } from "../CreateRoomOption/CreateRoomOption";
import { JoinRoomOption } from "../JoinRoomOption/JoinRoomOption";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Check, Pen, X } from "lucide-react";

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
    <section className="options-container flex flex-col h-full overflow-y-hidden">
      <div className="user-option flex flex-col w-full h-[10%] space-x-6 items-center ">
        {!isEditingName && (
          <div className="flex space-x-3 items-center m-auto w-full justify-center">
            <h2 className="greeting text-summer-green-600">
              Hello <span className="">{name}</span>!
            </h2>
            <Button
              type="button"
              onClick={() => setIsEditingName(true)}
              size="icon"
              variant="ghost"
            >
              <Pen color="#3a6149" className="" />
            </Button>
          </div>
        )}
        {isEditingName && (
          <div className="username-form-container flex m-auto" hidden={!isEditingName}>
            <form onSubmit={handleEditingConfirmation} className="form flex space-x-3 m-auto">
              <Input
                type="text"
                value={userInput}
                id="name"
                onChange={handleInputChange}
                className="w-3/4"
              />
              <Button className="confirm-btn" type="submit" size="icon">
                <Check />
              </Button>
              <Button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditingName(false)}
                size="icon"
                variant="destructive"
              >
                <X />
              </Button>
            </form>
          </div>
        )}
      </div>
      <div className="room-options flex flex-col h-[90%] overflow-y-auto">
        <div className="create-room-option flex flex-col h-[30%] w-full">
          <CreateRoomOption />
        </div>
        <div className="join-room-option flex flex-col h-[60%] w-full">
          <JoinRoomOption />
        </div>
      </div>
    </section>
  );
};
