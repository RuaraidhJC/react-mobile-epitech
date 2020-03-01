import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Choice from "./screens/Choice";
import Login from "./screens/Login";
import Home from "./screens/HomeF";
import Profile from "./screens/ProfileF";

const NonAuthedStack = createSwitchNavigator(
  {
    choiceScreen: { screen: Choice },
    loginScreen: { screen: Login }
  },
  {
    headerMode: "none",
    initialRouteName: "loginScreen"
  }
);

const Main = createSwitchNavigator(
  {
    loginStack: { screen: NonAuthedStack },
    homeScreen: { screen: Home },
    profileScreen: { screen: Profile }
  },
  {
    // Default config for all screens
    headerMode: "none",
    title: "Main",
    initialRouteName: "loginStack"
  }
);

const App = createAppContainer(Main);
export default App;
