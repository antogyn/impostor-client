import { graphql } from "gql.tada";
import { type FormEvent, useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import "react-toastify/dist/ReactToastify.css";

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
    <>
      <div>
        <button type="submit" onClick={handleLeaveRoom}>
          Leave Room
        </button>
      </div>
      <div>
        <CopyToClipboard text={roomUrl} onCopy={onCopyUrl}>
          <button type="button">Invite Friends!</button>
        </CopyToClipboard>
      </div>
      <ToastContainer />
    </>
  );
};
