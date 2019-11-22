import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Choice from './screens/Choice';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';

const NonAuthedStack = createSwitchNavigator({
  choiceScreen: { screen: Choice },
  loginScreen: { screen: Login },
  registerScreen: { screen: Register },
}, {
  headerMode: 'none',
  initialRouteName: 'loginScreen'
});

const Main = createSwitchNavigator({
  loginStack: { screen: NonAuthedStack },
  homeScreen: { screen: Home }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'

});

const App = createAppContainer(Main);
export default App;
