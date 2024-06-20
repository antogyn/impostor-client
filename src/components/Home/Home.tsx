import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { RoomOptionsForm } from "./RoomOptions/RoomOptions";
import { RegisterUserForm } from "./RegisterUserForm";

export const Home = () => {
  const [name] = useContext(NameContext);

  return (
    <>
      <h1>Impostor Online Game</h1>
      {name ? <RoomOptionsForm /> : <RegisterUserForm />}
    </>
  );
};
