import { graphql } from "gql.tada";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useSubscription } from "urql";
import { NameContext } from "../../contexts/name-context";
import { Router } from "../Router";
import { UserOptions } from "./UserOptions/UserOptions";

import type { FormEvent } from "react";

import { Button } from "../ui/button";

import { LucideX, CirclePlay } from "lucide-react";

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

const LeaveRoomMutation = graphql(`
    mutation LeaveRoom($roomId: Int!, $playerName: String!) {
      leaveRoom(roomId: $roomId, playerName: $playerName) {
        __typename
        id
        players {
          name
        }
      }
    }
  `);

interface Player {
  name: string;
}

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
  const [_startGameMutationResult, startGame] = useMutation(StartGameMutation);
  const [_leaveRoomResult, leaveRoom] = useMutation(LeaveRoomMutation);

  const [roomUpdatedSubscriptionResult] = useSubscription({
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

  console.log({ roomUpdatedSubscriptionResult });

  const [hasJoined, setHasJoined] = useState(false);
  const [_players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!playerName) {
      Router.push("SetName", { roomId: id.toString() });
      return;
    }

    if (roomQueryResult.data?.room && !hasJoined) {
      // check if player is in room already
      const hasAlreadyJoined = roomQueryResult.data.room.players.some(
        ({ name }) => name === playerName,
      );
      console.log("Has player already joined?", hasAlreadyJoined);
      if (!hasAlreadyJoined) {
        // if player is not in room, joins room
        joinRoom({ roomId: id, playerName }).then(() => {
          console.log(`${playerName} joined room ${id}`);
          setHasJoined(true);
        });
      } else {
        setHasJoined(true);
      }
    }
  }, [id, playerName, roomQueryResult.data?.room, joinRoom, hasJoined]);

  useEffect(() => {
    if (roomUpdatedSubscriptionResult.data?.roomUpdated?.players) {
      const updatedPlayers = roomUpdatedSubscriptionResult.data.roomUpdated.players;
      setPlayers(updatedPlayers);
      console.log(
        `Something changed!\nPlayers list:\n${updatedPlayers.map((player) => player.name).join("\n")}`,
      );
      if (!updatedPlayers.some(({ name }) => name === playerName)) {
        Router.replace("Home");
      }
    }
  }, [roomUpdatedSubscriptionResult.data, playerName]);

  if (roomQueryResult.fetching) {
    return <div>Loading...</div>;
  }

  if (!roomQueryResult.data) {
    return;
  }

  const playersList = roomQueryResult.data.room?.players;
  const firstPlayer = roomQueryResult.data.room?.players[0].name;
  const isFirstPlayer = playerName === firstPlayer;
  const gameHasStarted = gameStartedSubscriptionResult.data;
  const role = gameStartedSubscriptionResult.data?.gameStarted?.__typename;

  const handleKickPlayerOut = async (e: FormEvent, selectedPlayer: string) => {
    e.preventDefault();
    const result = await leaveRoom({ roomId: id, playerName: selectedPlayer });
    if (result.data?.leaveRoom?.players) {
      const updatedPlayers = result.data.leaveRoom.players;
      console.log(
        `Players list updated:\n${updatedPlayers.map((player) => player.name).join("\n")}`,
      );
      setPlayers(updatedPlayers);
      if (selectedPlayer === playerName) {
        Router.replace("Home");
      }
    }
  };

  return (
    <main className="room-container flex flex-col items-center space-y-9 w-full">
      <div className="page-header ">
        <h2 className="">
          Welcome to Room <span className="font-bold">{id}</span>!
        </h2>
        <UserOptions id={id} />
      </div>
      <div className="page-content w-full space-y-6 border-t-[1.5px] border-pumpkin-200 p-6">
        <div className="flex w-full">
          {isFirstPlayer ? (
            <Button type="button" onClick={() => startGame({ roomId: id })} className="m-auto">
              Start Game <CirclePlay className="ml-3" size={24} />
            </Button>
          ) : (
            <p className="text-sm m-auto">
              <span className="text-pumpkin-300">{firstPlayer}</span> will start the game soon! 🏁
            </p>
          )}
        </div>
        <div className="list-container flex flex-col w-[90%] m-auto items-center space-y-6 py-3 h-[350px] overflow-hidden p-6 ">
          <h3>Players in the room:</h3>
          <ul className="list-content flex flex-col w-full items-center max-h-[500px] overflow-y-auto no-scrollbar space-y-2">
            {playersList?.map((player) => {
              return (
                <li key={player.name} className="flex space-x-2 w-full items-center justify-center">
                  <p className="flex">
                    {player.name === playerName ? `${player.name} (you)` : `${player.name}`}
                  </p>
                  {player.name !== playerName && (
                    <Button
                      type="submit"
                      className="flex"
                      size="icon"
                      variant="ghost"
                      onClick={(e) => handleKickPlayerOut(e, player.name)}
                    >
                      <LucideX color="#b12737" />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {gameHasStarted && (
          <p className="text-xl m-auto flex">
            {role === "ImpostorInfo" ? (
              "You are the impostor! 🤫"
            ) : (
              <>
                The secret word is "
                <span className="text-pumpkin-500">
                  {gameStartedSubscriptionResult.data?.gameStarted?.word}
                </span>
                " 😎
              </>
            )}
          </p>
        )}
      </div>
    </main>
  );
};
