import { graphql } from "gql.tada";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useSubscription } from "urql";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";
import { RoomOptions } from "./RoomOptions/RoomOptions";

import { Button } from "../ui/button";

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

  const playersList = roomQueryResult.data.room?.players;
  const gameHasStarted = gameStartedSubscriptionResult.data;
  const role = gameStartedSubscriptionResult.data?.gameStarted?.__typename;

  return (
    <main className="room-container flex flex-col items-center space-y-9 w-full">
      <h1 className="text-4xl text-slate-200">Impostor Online Game</h1>
      <h2 className="text-2xl text-slate-200">Welcome to Room {id}!</h2>
      <div className="configuration w-full">
        <RoomOptions id={id} />
      </div>
      <div className="list-container flex flex-col w-full items-center space-y-6 py-3">
        <p className="text-xl text-slate-100">Players:</p>
        <ol className="list-content flex flex-col w-full items-center max-h-[500px] overflow-y-scroll text-slate-200">
          {playersList?.map((player) => {
            return (
              <li key={player.name}>
                {player.name === playerName ? `${player.name} (you)` : `${player.name}`}
              </li>
            );
          })}
        </ol>
      </div>
      <div>
        <Button type="button" onClick={() => startGame({ roomId: id })}>
          Start Game
        </Button>
      </div>

      {gameHasStarted && (
        <p className="text-slate-100 text-2xl">
          {role === "ImpostorInfo"
            ? "You are the impostor! 🤫"
            : `The secret word is "${gameStartedSubscriptionResult.data?.gameStarted?.word}" 😎`}
        </p>
      )}
    </main>
  );
};
