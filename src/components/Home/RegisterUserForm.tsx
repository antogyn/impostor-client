import { type FormEvent, useState } from "react";

import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";

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
    <form onSubmit={handleFormSubmit}>
      <label>Enter your name!</label>
      <input name="userName" value={userInput} onChange={handleInputChange} placeholder="John" />
      <button type="submit">Done!</button>
    </form>
  );
};
