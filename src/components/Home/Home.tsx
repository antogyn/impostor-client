import { useContext } from "react";
import { NameContext } from "../../name-context";
import { CreateRoomButton } from "../CreateRoomButton/CreateRoomButton";
import { JoinRoomButton } from "../JoinRoomButton/JoinRoomButton";

export const Home = () => {
  return (
    <>
      <NameInput />
      <CreateRoomButton />
      <JoinRoomButton />
      <NameDisplay />
    </>
  );
};

const NameInput = () => {
  const [name, setName] = useContext(NameContext);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

const NameDisplay = () => {
  const [name] = useContext(NameContext);
  return <div>Hello {name}!</div>;
};
