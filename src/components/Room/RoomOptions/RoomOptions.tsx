import { graphql } from "gql.tada";
import { type FormEvent, useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "../../ui/button";
import { DoorOpen, Users } from "lucide-react";

import QRCode from "react-qr-code";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [qrIsVisible, setQrIsVisible] = useState<boolean>(false);

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
        <Dialog>
          <DialogTrigger>
            <Button type="button" size="lg" variant="cta">
              Invite friends
              <Users className="ml-3 max-sm:hidden" />
            </Button>
          </DialogTrigger>
          <DialogContent onCloseAutoFocus={() => setQrIsVisible(false)}>
            <DialogHeader>
              <DialogTitle>Select Option</DialogTitle>
              <DialogDescription>
                <CopyToClipboard text={roomUrl} onCopy={onCopyUrl}>
                  <Button type="button" size="lg" variant="cta">
                    Copy Link <Users className="ml-3 max-sm:hidden" />
                  </Button>
                </CopyToClipboard>
                <p>OR</p>
                <Button
                  type="button"
                  size="lg"
                  variant="cta"
                  onClick={() => setQrIsVisible(!qrIsVisible)}
                >
                  {qrIsVisible ? "Hide QR Code" : "Display QR Code"}
                </Button>
                {qrIsVisible && (
                  <div className="qr-code">
                    <QRCode bgColor="#eceff2" fgColor="" value={roomUrl} size={200} />
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer />
    </section>
  );
};
