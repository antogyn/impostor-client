import { graphql } from "gql.tada";
import { type FormEvent, useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "../../ui/button";
import { DoorOpen, Users, Copy, QrCodeIcon } from "lucide-react";

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

export const UserOptions = ({ id }: RoomProps) => {
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
    <>
      <div className="btns-container w-full flex justify-evenly m-auto">
        <Button type="submit" onClick={handleLeaveRoom} variant="destructive" size="withIcons">
          Leave Room
          <DoorOpen className="ml-3" size={18} />
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button type="button" variant="cta" size="withIcons">
              Add friends
              <Users className="ml-3" size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent
            onCloseAutoFocus={() => setQrIsVisible(false)}
            className="flex flex-col space-y-3"
          >
            <DialogHeader>
              <DialogTitle className="text-lg self-center">What would you like to do?</DialogTitle>
            </DialogHeader>
            <DialogDescription className="space-y-6 flex flex-col m-auto items-center">
              <CopyToClipboard text={roomUrl} onCopy={onCopyUrl}>
                <Button type="button" size="lg" variant="cta">
                  Copy Link <Copy className="ml-3" size={24} />
                </Button>
              </CopyToClipboard>
              <p className="text-pumpkin-400">OR</p>
              <Button
                type="button"
                size="lg"
                variant="cta"
                onClick={() => setQrIsVisible(!qrIsVisible)}
              >
                {qrIsVisible ? (
                  "Hide QR Code"
                ) : (
                  <>
                    Display QR Code <QrCodeIcon className="ml-3" size={24} />
                  </>
                )}
              </Button>
              {qrIsVisible && (
                <div className="qr-code">
                  <QRCode bgColor="#eceff2" fgColor="#222831" value={roomUrl} size={300} />
                </div>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer />
    </>
  );
};
