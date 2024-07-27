import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { RoomOptions } from "./RoomOptions/RoomOptions";
import { RegisterUserForm } from "./RegisterUserForm";

export const Home = () => {
  const [name] = useContext(NameContext);

  return (
    <div className="home-container flex flex-col grow space-y-9 w-full h-full">
      {name ? <RoomOptions /> : <RegisterUserForm />}
    </div>
  );
};
