import { graphql } from "gql.tada";
import { type FormEvent, useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "../../ui/button";
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

  const handleLeaveRoom = async (e: FormEvent) => {
    e.preventDefault();
    const result = await leaveRoom({ roomId: id, playerName: name });
    if (result.data?.leaveRoom) {
      console.log("Query results:", result.data?.leaveRoom, `User ${name} left room ${id}`);
      Router.replace("Home");
    }
  };

  return (
    <section className="user-options-container flex flex-col w-full ">
      <div className="btns-container flex justify-evenly">
        <Button type="submit" onClick={handleLeaveRoom} variant="destructive">
          Leave Room
          <DoorOpen className="ml-3 max-sm:hidden" />
        </Button>
        <CopyToClipboard text={roomUrl} onCopy={onCopyUrl}>
          <Button type="button" size="lg" variant="cta">
            Invite Friends <Users className="ml-3 max-sm:hidden" />
          </Button>
        </CopyToClipboard>
      </div>
      <ToastContainer />
    </section>
  );
};
