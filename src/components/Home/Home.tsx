import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { RoomOptions } from "./RoomOptions/RoomOptions";
import { RegisterUserForm } from "./RegisterUserForm";

export const Home = () => {
  const [name] = useContext(NameContext);

  return (
    <main className="home-container flex flex-col space-y-9 w-full h-full">
      {name ? <RoomOptions /> : <RegisterUserForm />}
    </main>
  );
};
