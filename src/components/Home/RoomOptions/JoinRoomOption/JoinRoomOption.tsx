import { useContext, useState, type FormEvent } from "react";
import { Router } from "../../../Router";

import { graphql } from "gql.tada";
import { useMutation } from "urql";
import { NameContext } from "../../../../contexts/name-context";

const JoinRoomMutation = graphql(`
   mutation JoinRoom($roomId: Int!, $playerName: String!) {
    joinRoom(roomId: $roomId, playerName: $playerName) {
       id
       players {
         name
       }
     }
   }
 `);

export const JoinRoomOption = () => {
  const [name] = useContext(NameContext);
  const [roomId, setRoomId] = useState("");
  const [joinRoomResult, joinRoom] = useMutation(JoinRoomMutation);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomIdNumber = Number.parseInt(roomId, 10);
    joinRoom({ roomId: roomIdNumber, playerName: name }).then(() => {
      Router.push("Room", { roomId });
    });
    if (joinRoomResult.fetching) {
      return <div>Joining room...</div>;
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Enter Room ID</label>
      <input name="roomId" value={roomId} onChange={handleInputChange} placeholder="12345678" />
      <button type="submit">Join Room</button>
    </form>
  );
};
