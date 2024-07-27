import AppContextsProvider from "../../contexts";
import { match } from "ts-pattern";
import { Router } from "../Router";
import { Home } from "../Home/Home";
import { Room } from "../Room/Room";
import { SetName } from "../SetName/SetName";
import { useTranslation } from "react-i18next";

import { LocaleSelector } from "./LocaleSelector/LocaleSelector";
import { GameRules } from "./GameRules/GameRules";
// import ScreenSize from "../devComponent/ScreenSize";

function App() {
  const route = Router.useRoute(["Home", "Room", "SetName"]);
  const { t } = useTranslation();

  return (
    <AppContextsProvider>
      <div className="bg-[url('/background/background.svg')] h-[100%] min-h-[100vh]">
        <div className="responsive-content p-3 flex flex-col h-full w-full sm:max-w-[640px] sm:max-h-[700px] m-auto min-h-[inherit]">
          <header className="header flex flex-col h-[15vh] items-center justify-center">
            <GameRules />
            <LocaleSelector />
            <svg fill="#fd7014" height="50%" viewBox="0 0 612 792">
              <title>Masquerade Icon</title>
              <path
                d="M557.987,241.457c-17.762-32.593-37.158-48.438-59.296-48.438c-34.312,0-61.109,39.384-84.761,74.146
	c-11.384,16.728-24.28,35.683-32.273,40.041c-2.959,1.616-7.984,2.705-14.145,3.466c3.278-21.425,5.063-42.84,5.063-63.636
	c0-63.391-29.033-76.701-53.388-76.701c-26.309,0-57.709,16.127-85.409,30.357c-17.996,9.242-38.397,19.725-47.499,19.725
	s-29.502-10.482-47.499-19.725c-27.7-14.231-59.1-30.358-85.41-30.358C29.033,170.326,0,183.635,0,247.027
	c0,143.935,83.098,317.776,186.296,317.776c38.632,0,74.456-24.374,104.147-62.424c59.625,65.993,139.577,119.288,206.105,119.288
	c18.438,0,35.223-4.048,49.875-12.032C637.026,560.266,626.835,367.855,557.987,241.457z M99.413,370.683
	c-23.022,0-41.685-9.462-41.685-21.134s18.663-21.134,41.685-21.134c23.022,0,41.685,9.462,41.685,21.134
	S122.435,370.683,99.413,370.683z M186.296,477.582c-50.711,0.047-77.632-38.886-70.849-42.662
	c5.391-4.781,33.72,16.982,70.849,16.043c37.129,0.939,65.458-20.824,70.849-16.043
	C263.918,438.705,237.008,477.628,186.296,477.582z M273.179,370.683c-23.022,0-41.685-9.462-41.685-21.134
	s18.663-21.134,41.685-21.134c23.022,0,41.685,9.462,41.685,21.134S296.201,370.683,273.179,370.683z M377.249,480.761
	c-20.214,11.009-41.127,11.621-46.713,1.366c-5.585-10.255,6.274-27.492,26.487-38.501c20.214-11.009,41.128-11.621,46.713-1.366
	C409.322,452.515,397.463,469.752,377.249,480.761z M509.626,360.479c20.21-11.011,41.121-11.625,46.707-1.372
	c5.586,10.253-6.269,27.49-26.479,38.5c-20.21,11.011-41.121,11.625-46.707,1.372C477.561,388.727,489.416,371.49,509.626,360.479z
	 M566.581,498.537c-2.442,6.772-37.74,1.212-69.891,19.809c-33.062,16.935-47.518,49.603-54.543,47.978
	c-7.758-0.075-2.743-47.142,41.807-71.357C528.464,470.668,570.723,491.981,566.581,498.537z"
                className=""
              />
            </svg>
            <h1 className="app-title">•&nbsp;{t("app.title")}&nbsp;•</h1>
            <p className="app-subtitle text-lg">{t("app.subtitle")}</p>
          </header>
          <div className="h-3" />
          <main className="body flex flex-col grow">
            {match(route)
              .with({ name: "Home" }, () => <Home />)
              .with({ name: "Room" }, ({ params }) => (
                <Room id={Number.parseInt(params.roomId, 10)} />
              ))
              .with({ name: "SetName" }, ({ params }) => (
                <SetName id={Number.parseInt(params.roomId, 10)} />
              ))
              .otherwise(() => (
                <h1 className="m-auto">Oops! Not found!</h1>
              ))}
          </main>
          {/* <ScreenSize /> */}
        </div>
      </div>
    </AppContextsProvider>
  );
}

export default App;
