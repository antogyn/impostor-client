import { useState } from "react";
import { Router } from "../Router";

export const JoinRoomButton = () => {
  const [displayRoomForm, setDisplayRoomForm] = useState(false);
  const [roomId, setRoomId] = useState("");

  return displayRoomForm ? (
    <>
      <label>Room id</label>
      <input
        placeholder="12345"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button type="button" onClick={() => Router.push("Room", { roomId })}>
        Confirm room id
      </button>
    </>
  ) : (
    <button type="button" onClick={() => setDisplayRoomForm(true)}>
      Join room
    </button>
  );
};
