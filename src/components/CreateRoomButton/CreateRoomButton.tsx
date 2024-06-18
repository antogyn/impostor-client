import { useContext } from "react";
import { useMutation } from "urql";
import { NameContext } from "../../name-context";
import { Router } from "../Router";
import { graphql } from "gql.tada";

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

export const CreateRoomButton = () => {
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
    <button type="button" onClick={() => createRoom({ playerName: name })}>
      Create room
    </button>
  );
};
