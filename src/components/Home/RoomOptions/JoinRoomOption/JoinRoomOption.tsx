import { useContext, useState, type FormEvent } from "react";
import { Router } from "../../../Router";

import { graphql } from "gql.tada";
import { useMutation } from "urql";
import { NameContext } from "../../../../contexts/name-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <section className="join-room-form-container w-full">
      <form
        onSubmit={handleFormSubmit}
        className="join-room-form flex flex-col space-y-3 items-center"
      >
        <Label className="form-label text-md text-slate-100">Enter Room ID</Label>
        <Input
          name="roomId"
          value={roomId}
          type=""
          onChange={handleInputChange}
          placeholder="12345678"
          maxLength={6}
        />
        <Button type="submit" className="submit-btn" disabled={!roomId}>
          Join Room
        </Button>
      </form>
    </section>
  );
};
