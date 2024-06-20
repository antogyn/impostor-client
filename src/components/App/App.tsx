import "./App.css";
import AppContextsProvider from "../../contexts";
import { match } from "ts-pattern";
import { Router } from "../Router";
import { Home } from "../Home/Home";
import { Room } from "../Room/Room";
import { SetName } from "../SetName/SetName";

function App() {
  const route = Router.useRoute(["Home", "Room", "SetName"]);

  return (
    <AppContextsProvider>
      {match(route)
        .with({ name: "Home" }, () => <Home />)
        .with({ name: "Room" }, ({ params }) => <Room id={Number.parseInt(params.roomId, 10)} />)
        .with({ name: "SetName" }, ({ params }) => (
          <SetName id={Number.parseInt(params.roomId, 10)} />
        ))
        .otherwise(() => (
          <h1>Oops! Not found!</h1>
        ))}
    </AppContextsProvider>
  );
}

export default App;
