import { useContext, useState, type FormEvent } from "react";
import { useMutation } from "urql";
import { NameContext } from "../../../contexts/name-context";
import { Router } from "../../Router";
import { graphql } from "gql.tada";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Check, Pen, X } from "lucide-react";

import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateRoomMutation = graphql(`
  mutation CreateRoom($playerName: String!, $language: Language!) {
    createRoom(playerName: $playerName, language: $language) {
      id
      players {
        name
      },
      language
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
  const { t } = useTranslation();
  const [name, setName] = useContext(NameContext);

  const [createRoomResult, createRoom] = useMutation(CreateRoomMutation);
  const [joinRoomResult, joinRoom] = useMutation(JoinRoomMutation);

  /* Handling user name update */
  const [userInput, setUserInput] = useState<string>(name);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleEditingConfirmation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(userInput);
    setIsEditingName(false);
  };

  /* Handling create room feature */
  const [isCreateRoomFormVisible, setIsCreateRoomFormVisible] = useState<boolean>(false);
  const [selectedLocale, setSelectedLocale] = useState<string | null>(null);

  const handleOpenCreateRoomForm = () => {
    setIsJoinRoomFormVisible(false);
    setIsCreateRoomFormVisible(true);
  };

  const handleSelectedLocaleChange = (locale: "en" | "fr") => {
    setSelectedLocale(locale);
  };

  const handleCreateRoomFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedLocale) return;
    const localeIsValid = selectedLocale === "en" || selectedLocale === "fr";
    if (localeIsValid) {
      const result = await createRoom({ playerName: name, language: selectedLocale });
      if (result.data?.createRoom) {
        setSelectedLocale(null);
        console.log(`Room successfully created: ${result.data.createRoom.id}`);
        Router.push("Room", { roomId: result.data.createRoom.id.toString() });
      }
    }
    if (createRoomResult.fetching) {
      return <div>Creating room...</div>;
    }
    return;
  };

  /* Handling join room feature */
  const [roomId, setRoomId] = useState("");
  const [isJoinRoomFormVisible, setIsJoinRoomFormVisible] = useState<boolean>(false);

  const handleOpenJoinRoomForm = () => {
    setIsJoinRoomFormVisible(true);
    setIsCreateRoomFormVisible(false);
  };

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };
  const handleJoinRoomFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomIdNumber = Number.parseInt(roomId, 10);
    const result = await joinRoom({ roomId: roomIdNumber, playerName: name });
    if (result.data?.joinRoom) {
      Router.push("Room", { roomId });
    }
    if (joinRoomResult.fetching) {
      return <div>{t("joining-room")}</div>;
    }
  };

  const handleCloseForm = () => {
    setRoomId("");
    setSelectedLocale(null);
    setIsJoinRoomFormVisible(false);
    setIsCreateRoomFormVisible(false);
  };

  return (
    <section className="options-container flex flex-col h-full overflow-y-hidden">
      <div className="page-header">
        {!isEditingName && (
          <div className="flex flex-col space-y-6 items-center m-auto w-full justify-center">
            <h2 className="greeting">{t("home.greeting", { name })} 👋</h2>
            <Button
              type="button"
              onClick={() => setIsEditingName(true)}
              variant="secondary"
              size="sm"
            >
              {t("button.edit-name")}
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
        <p className="text-lg self-center">{t("home.what-to-do")}</p>
        <div className="create-room-option flex flex-col space-y-12 m-auto">
          {isCreateRoomFormVisible && (
            <>
              <form
                onSubmit={handleCreateRoomFormSubmit}
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
                <div className="flex flex-col space-y-6 w-full">
                  <Label className="form-label text-lg m-auto text-pumpkin-300">
                    {t("form.create-room.label")}
                  </Label>
                  <div className="flex space-x-6">
                    <Select onValueChange={handleSelectedLocaleChange} value={selectedLocale || ""}>
                      <SelectTrigger className="w-[180px] m-auto">
                        <SelectValue placeholder={t("form.create-room.select-value.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="en">{t("locale.english")}</SelectItem>
                          <SelectItem value="fr">{t("locale.french")}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button
                      type="submit"
                      className="submit-btn m-auto"
                      disabled={!selectedLocale}
                      size="lg"
                    >
                      {t("button.create")}
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )}
          {isJoinRoomFormVisible && (
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
                <Label className="form-label text-lg text-pumpkin-300">
                  {t("form.join-room.label")}
                </Label>
                <div className="flex w-full items-center justify-evenly">
                  <Input
                    name="roomId"
                    value={roomId}
                    onChange={handleRoomIdChange}
                    placeholder={t("form.join-room.input.placeholder")}
                    maxLength={6}
                    className="w-2/4"
                  />
                  <Button type="submit" className="submit-btn" disabled={!roomId} size="lg">
                    {t("button.join")}
                  </Button>
                </div>
              </form>
            </>
          )}

          {!isCreateRoomFormVisible && !isJoinRoomFormVisible && (
            <>
              <Button type="submit" onClick={handleOpenCreateRoomForm} size="lg">
                {t("button.create-room")}
              </Button>
              <Button type="button" onClick={handleOpenJoinRoomForm} size="lg">
                {t("button.join-room")}
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
