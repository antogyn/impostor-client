import { type FormEvent, useContext, useState } from "react";
import { NameContext } from "../../../contexts/name-context";

import { CreateRoomOption } from "./CreateRoomOption/CreateRoomOption";
import { JoinRoomOption } from "./JoinRoomOption/JoinRoomOption";

export const RoomOptionsForm = () => {
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
    <div className="options-container">
      <div className="update-name-option">
        <p>Hello {name}!</p>
        {isEditingName ? (
          <form onSubmit={handleEditingConfirmation}>
            <input type="text" value={userInput} id="name" onChange={handleInputChange} />
            <button type="submit">Confirm</button>
            <button type="button" onClick={() => setIsEditingName(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => setIsEditingName(true)}>
            Edit Name
          </button>
        )}
      </div>
      <div className="create-room-option">
        <CreateRoomOption />
      </div>
      <div className="join-room-option">
        <JoinRoomOption />
      </div>
    </div>
  );
};
