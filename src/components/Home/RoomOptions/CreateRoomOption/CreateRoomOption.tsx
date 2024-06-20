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
    <Button type="button" onClick={() => createRoom({ playerName: name })}>
      Create room
    </Button>
  );
};
