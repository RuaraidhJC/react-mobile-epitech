import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Choice from './screens/Choice';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home.jsx';
import Profile from './screens/Profile.jsx';

const NonAuthedStack = createSwitchNavigator(
  {
    choiceScreen: { screen: Choice },
    loginScreen: { screen: Login },
    registerScreen: { screen: Register },
    profileScreen: { screen: Profile },
  },
  {
    headerMode: 'none',
    initialRouteName: 'profileScreen',
  },
);

const Main = createSwitchNavigator(
  {
    loginStack: { screen: NonAuthedStack },
    homeScreen: { screen: Home },
    profileScreen: { screen: Profile },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
  },
);

const App = createAppContainer(Main);
export default App;
