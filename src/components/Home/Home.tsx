import { useContext } from "react";
import { NameContext } from "../../contexts/name-context";
import { UserOptions } from "./RoomOptions/UserOptions/UserOptions";
import { RegisterUserForm } from "./RegisterUserForm";

export const Home = () => {
  const [name] = useContext(NameContext);

  return (
    <main className="home-container flex flex-col items-center space-y-9">
      <h1 className="text-4xl text-slate-200">Impostor Online Game</h1>
      <div className="body-container">{name ? <UserOptions /> : <RegisterUserForm />}</div>
    </main>
  );
};
