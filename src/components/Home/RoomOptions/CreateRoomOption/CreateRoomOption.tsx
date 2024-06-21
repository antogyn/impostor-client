import { useContext } from "react";
import { useMutation } from "urql";
import { NameContext } from "../../../../contexts/name-context";
import { Router } from "../../../Router";
import { graphql } from "gql.tada";

import { Button } from "@/components/ui/button";

const CreateRoomMutation = graphql(`
  mutation CreateRoom($playerName: String!) {
    createRoom(playerName: $playerName, language: fr) {
      id
      players {
        name
      }
    }
  }
`);

export const CreateRoomOption = () => {
  const [name] = useContext(NameContext);
  const [createRoomResult, createRoom] = useMutation(CreateRoomMutation);

  if (createRoomResult.fetching) {
    return <div>Creating room...</div>;
  }

  if (createRoomResult.data?.createRoom) {
    console.log(createRoomResult.data);
    Router.push("Room", {
      roomId: createRoomResult.data.createRoom.id.toString(),
    });
    return;
  }

  return (
    <section className="create-room room-option flex flex-col m-auto w-full full space-y-6 items-center">
      <h2>Create New Room</h2>
      <div className="create-room-btn-container w-full flex justify-center">
        <Button type="button" onClick={() => createRoom({ playerName: name })} size="lg">
          Create room
        </Button>
      </div>
    </section>
  );
};
