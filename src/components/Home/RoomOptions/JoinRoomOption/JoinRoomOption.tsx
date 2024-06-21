import { useContext, useState, type FormEvent } from "react";
import { Router } from "../../../Router";

import { graphql } from "gql.tada";
import { useMutation } from "urql";
import { NameContext } from "../../../../contexts/name-context";

import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";

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
    <section className="join-room-form-container room-option flex flex-col w-full m-auto space-y-3 items-center">
      <h2>Join Existing Room</h2>
      <form
        onSubmit={handleFormSubmit}
        className="join-room-form flex flex-col space-y-3 items-center"
      >
        <Input
          name="roomId"
          value={roomId}
          type=""
          onChange={handleInputChange}
          placeholder="123456"
          maxLength={6}
          className="w-3/4"
        />
        <Button type="submit" className="submit-btn" disabled={!roomId} size="lg">
          Join Room
        </Button>
      </form>
    </section>
  );
};
