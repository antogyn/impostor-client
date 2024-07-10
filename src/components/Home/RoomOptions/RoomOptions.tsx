import { useContext, useState, type FormEvent } from "react";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import { graphql } from "gql.tada";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Check, Pen, X } from "lucide-react";

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

export const RoomOptions = () => {
  const [name, setName] = useContext(NameContext);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [createRoomResult, createRoom] = useMutation(CreateRoomMutation);
  const [joinRoomResult, joinRoom] = useMutation(JoinRoomMutation);

  const [userInput, setUserInput] = useState<string>(name);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [roomId, setRoomId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleEditingConfirmation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(userInput);
    setIsEditingName(false);
  };

  const handleRoomNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleCloseForm = () => {
    setRoomId("");
    setIsFormVisible(false);
  };

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

  const handleJoinRoomFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomIdNumber = Number.parseInt(roomId, 10);
    const result = await joinRoom({ roomId: roomIdNumber, playerName: name });
    if (result.data?.joinRoom) {
      Router.push("Room", { roomId });
    }
    if (joinRoomResult.fetching) {
      return <div>Joining room...</div>;
    }
  };

  const handleCreateRoom = async () => {
    const result = await createRoom({ playerName: name });
    if (result.data?.createRoom) {
      console.log(`Room successfully created: ${result.data.createRoom.id}`);
      Router.push("Room", { roomId: result.data.createRoom.id.toString() });
    }
  };

  return (
    <section className="options-container flex flex-col h-full overflow-y-hidden">
      <div className="page-header">
        {!isEditingName && (
          <div className="flex flex-col space-y-6 items-center m-auto w-full justify-center">
            <h2 className="greeting">
              Hello <span className="username">{name}</span>! 👋
            </h2>
            <Button
              type="button"
              onClick={() => setIsEditingName(true)}
              variant="secondary"
              size="sm"
            >
              Edit name
              <Pen color="#cad2d7" className="ml-3" size={18} />
            </Button>
          </div>
        )}
        {isEditingName && (
          <div className="username-form-container flex m-auto" hidden={!isEditingName}>
            <form onSubmit={handleEditingConfirmation} className="form flex space-x-3 m-auto">
              <Input
                type="text"
                value={userInput}
                id="name"
                onChange={handleInputChange}
                className="w-3/4"
              />
              <Button className="confirm-btn bg-summer-green-400" type="submit" size="icon">
                <Check />
              </Button>
              <Button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditingName(false)}
                size="icon"
                variant="destructive"
              >
                <X />
              </Button>
            </form>
          </div>
        )}
      </div>
      <div className="page-content">
        <p className="text-lg self-center">What would you like to do?</p>
        <div className="create-room-option flex flex-col space-y-12 m-auto">
          {isFormVisible ? (
            <>
              <form
                onSubmit={handleJoinRoomFormSubmit}
                className="join-room-form flex flex-col space-y-3 items-center self-center"
              >
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={handleCloseForm}
                  className="flex self-end"
                >
                  <X color="#cad2d7" />
                </Button>
                <Label className="form-label text-lg text-pumpkin-300">Enter room ID</Label>
                <div className="flex w-full items-center justify-evenly">
                  <Input
                    name="roomId"
                    value={roomId}
                    onChange={handleRoomNumberChange}
                    placeholder="123456"
                    maxLength={6}
                    className="w-2/4"
                  />
                  <Button type="submit" className="submit-btn" disabled={!roomId} size="lg">
                    Join
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <Button type="submit" onClick={handleCreateRoom} size="lg">
                Create room
              </Button>
              <Button type="button" onClick={() => setIsFormVisible(true)}>
                Join room
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
