import { graphql } from "gql.tada";
import { type FormEvent, useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import { DoorOpen, Users } from "lucide-react";

interface RoomProps {
  id: number;
}

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

export const RoomOptions = ({ id }: RoomProps) => {
  const [name] = useContext(NameContext);
  const [_leaveRoomResult, leaveRoom] = useMutation(LeaveRoomMutation);

  const roomUrl = location.href;
  console.log("Current url is:", roomUrl);

  const onCopyUrl = () => {
    toast.success("Link copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleLeaveRoom = (e: FormEvent) => {
    e.preventDefault();
    leaveRoom({ roomId: id, playerName: name });
    console.log(`User ${name} left room ${id}`);
    Router.push("Home");
    return;
  };

  return (
    <section className="user-options-container flex flex-col w-full">
      <div className="btns-container flex justify-evenly">
        <Button type="submit" onClick={handleLeaveRoom}>
          Leave Room
          <DoorOpen className="ml-3" />
        </Button>
        <CopyToClipboard text={roomUrl} onCopy={onCopyUrl}>
          <Button type="button">
            Invite Friends <Users className="ml-3" />
          </Button>
        </CopyToClipboard>
      </div>
      <ToastContainer />
    </section>
  );
};
