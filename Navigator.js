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
<<<<<<< HEAD
    profileScreen: { screen: ProfileWithState }
=======
    profileScreen: { screen: Profile }
>>>>>>> 0d5bb2503696e5e5fa64d3e0ede398ad79ae31dd
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
