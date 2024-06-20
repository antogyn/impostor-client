import { graphql } from "gql.tada";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useSubscription } from "urql";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";
import { RoomOptions } from "./RoomOptions/RoomOptions";

const RoomQuery = graphql(`
  query RoomById($id: Int!) {
    room(id: $id) {
      __typename
      id
      players {
        name
      }
    }
  }
`);

const RoomUpdatedSubscription = graphql(`
  subscription RoomUpdated($roomId: Int!) {
    roomUpdated(roomId: $roomId) {
      __typename
      id
      players {
        name
      }
    }
  }
`);

const GameStartedSubscription = graphql(`
  subscription GameStarted($roomId: Int!, $playerName: String!) {
    gameStarted(roomId: $roomId, playerName: $playerName) {
      __typename
      ... on RegularInfo {
        word
      }
    }
  }
`);

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

const StartGameMutation = graphql(`
  mutation StartGame($roomId: Int!) {
    startGame(roomId: $roomId)
  }
`);

export const Room = ({ id }: { id: number }) => {
  const [playerName] = useContext(NameContext);

  const [roomQueryResult, _reexecuteQuery] = useQuery({
    query: RoomQuery,
    variables: {
      id,
    },
    pause: id === null,
  });

  const [_joinRoomResult, joinRoom] = useMutation(JoinRoomMutation);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (!playerName) {
      Router.push("SetName", { roomId: id.toString() });
      return;
    }
    if (
      roomQueryResult.data?.room &&
      !roomQueryResult.data.room.players.some(({ name }) => name === playerName) &&
      !hasJoined
    ) {
      joinRoom({ roomId: id, playerName });
      console.log(`${playerName} joined room ${id}`);
      setHasJoined(true);
    }
  }, [
    id,
    playerName,
    roomQueryResult.data?.room,
    roomQueryResult.data?.room?.players,
    joinRoom,
    hasJoined,
  ]);

  const [_startGameMutationResult, startGame] = useMutation(StartGameMutation);

  useSubscription({
    query: RoomUpdatedSubscription,
    variables: {
      roomId: id,
    },
  });

  const [gameStartedSubscriptionResult] = useSubscription({
    query: GameStartedSubscription,
    variables: {
      roomId: id,
      playerName,
    },
  });

  if (roomQueryResult.fetching) {
    return <div>Loading...</div>;
  }

  if (!roomQueryResult.data) {
    return;
  }

  return (
    <div>
      <div className="configuration">
        <RoomOptions id={id} />
      </div>
      <h2>Welcome to Room {id}</h2>
      <div>
        Players:
        <ol>
          {roomQueryResult.data.room?.players.map(({ name }) => {
            return <li key={name}>{name === playerName ? `${name} (you)` : `${name}`}</li>;
          })}
        </ol>
      </div>
      <div>
        <button type="button" onClick={() => startGame({ roomId: id })}>
          Start game!
        </button>
      </div>

      <div>
        {gameStartedSubscriptionResult.data ? (
          <span>
            {gameStartedSubscriptionResult.data.gameStarted?.__typename === "ImpostorInfo"
              ? "Imposteur!"
              : `Your word is "${gameStartedSubscriptionResult.data.gameStarted?.word}"`}
          </span>
        ) : null}
      </div>
    </div>
  );
};
