import { createRouter } from "@swan-io/chicane";

export const Router = createRouter({
  Home: "/",
  Room: "/rooms/:roomId",
  SetName: "/rooms/:roomId/set-name",
});
