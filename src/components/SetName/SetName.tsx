import { useState, type FormEvent } from "react";
import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";

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
    <>
      <h2>Welcome to Room {id}</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Please enter your name first!</label>
        <input name="userName" value={userInput} onChange={handleInputChange} placeholder="John" />
        <button type="submit">Done!</button>
      </form>
    </>
  );
};
