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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [name] = useContext(NameContext);
  const [_leaveRoomResult, leaveRoom] = useMutation(LeaveRoomMutation);
  const [qrIsVisible, setQrIsVisible] = useState<boolean>(false);

  const roomUrl = location.href;
  console.log("Current url is:", roomUrl);

  const onCopyUrl = () => {
    toast.success(t("toaster.copied-to-clipboard"), {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleLeaveRoom = async (e: FormEvent) => {
    e.preventDefault();
    const result = await leaveRoom({ roomId: id, playerName: name });
    if (result.data?.leaveRoom) {
      const playersRemaining = result.data.leaveRoom.players;
      console.log("Query results:", result.data?.leaveRoom, `User ${name} left room ${id}`);
      if (playersRemaining.length === 0) {
        console.log("No players left in the room, redirecting...");
        Router.push("Home");
      } else {
        console.log(`${playersRemaining.length} players left in room`);
      }
    }
  };

  return (
    <>
      <div className="btns-container w-full flex justify-evenly m-auto">
        <Button type="submit" onClick={handleLeaveRoom} variant="destructive" size="withIcons">
          {t("button.leave-room")}
          <DoorOpen className="ml-3" size={18} />
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button type="button" variant="cta" size="withIcons">
              {t("button.add-friends")}
              <Users className="ml-3" size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent
            onCloseAutoFocus={() => setQrIsVisible(false)}
            className="flex flex-col space-y-3"
          >
            <DialogHeader>
              <DialogTitle className="text-lg self-center">{t("room.dialog.title")}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="space-y-6 flex flex-col m-auto items-center">
              <CopyToClipboard text={roomUrl} onCopy={onCopyUrl}>
                <Button type="button" size="lg" variant="cta">
                  {t("button.copy-link")} <Copy className="ml-3" size={24} />
                </Button>
              </CopyToClipboard>
              <p className="text-pumpkin-400">{t("room.dialog.or-option")}</p>
              <Button
                type="button"
                size="lg"
                variant="cta"
                onClick={() => setQrIsVisible(!qrIsVisible)}
              >
                {qrIsVisible ? (
                  t("button.hide-qr")
                ) : (
                  <>
                    {t("button.display-qr")} <QrCodeIcon className="ml-3" size={24} />
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
