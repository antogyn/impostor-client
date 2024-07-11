import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { graphqlClient } from "./graphql-client.ts";
import App from "./components/App/App.tsx";
import "./index.css";
import "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <Provider value={graphqlClient}>
    <App />
  </Provider>,
);
