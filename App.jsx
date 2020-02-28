import React, {useEffect} from 'react';
import Navigator from './Navigator';
import Notification from './utils/Notification';
import useGlobalState, { GlobalStateProvider } from "./context/global";

const AskNotifications = () => {
    const globalState = useGlobalState();
    const setNotificationToken = globalState.setNotificationToken;
    useEffect(() => {
        async function getNotifs() {
            const token = await Notification();
            setNotificationToken(token);
        }
        getNotifs();
    }, []);
    return null;
};

export default function App() {
  console.log('lol');
  return (
      <GlobalStateProvider>
        <AskNotifications/>
        <Navigator />
      </GlobalStateProvider>
      );
}
