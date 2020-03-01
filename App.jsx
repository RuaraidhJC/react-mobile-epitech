import React, { useEffect } from "react";
import { Notifications } from "expo";
import Navigator from "./Navigator";
import Notification from "./utils/Notification";
import useGlobalState, { GlobalStateProvider } from "./context/global";
import Network from "./utils/Network";

const AskNotifications = ({ children }) => {
  const globalState = useGlobalState();
  const { setNotificationToken, setUser } = globalState;
  useEffect(() => {
    async function getNotifs() {
      const token = await Notification();
      setNotificationToken(token);
    }

    Notifications.addListener(async () => {
      const response = await Network.get("/me");
      if (response.data.success) {
        setUser(response.data.data);
      }
    });
    getNotifs();
  }, []);
  return children;
};
export default function App() {
  return (
    <GlobalStateProvider>
      <AskNotifications>
        <Navigator />
      </AskNotifications>
    </GlobalStateProvider>
  );
}
