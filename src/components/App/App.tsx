import "./App.css";
import { Provider } from "urql";
import { graphqlClient } from "../../graphql-client";
import { NameContextProvider } from "../../name-context";
import { match } from "ts-pattern";
import { Router } from "../Router";
import { Home } from "../Home/Home";
import { Room } from "../Room/Room";

function App() {
  const route = Router.useRoute(["Home", "Room"]);

  return (
    <Provider value={graphqlClient}>
      <NameContextProvider>
        {match(route)
          .with({ name: "Home" }, () => <Home />)
          .with({ name: "Room" }, ({ params }) => (
            <Room id={Number.parseInt(params.roomId, 10)} />
          ))
          .otherwise(() => (
            <h1>404</h1>
          ))}
      </NameContextProvider>
    </Provider>
  );
}

export default App;
