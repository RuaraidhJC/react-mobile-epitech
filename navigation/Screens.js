import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'

const transitionConfig = (transitionProps, prevTransitionProps) => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index
      const width = layout.initWidth
      
      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1],
      })
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })
  
      const scaleWithOpacity = { opacity }
      const screenName = "Search"
  
      if (screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
        return scaleWithOpacity;
      }
      return { transform: [{ translateX }] }
    }
  })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen, 
    navigationOptions: ({ navigation }) => ({
      header: <Header title="login" navigation={navigation}></Header>
    })
  }
}, {
  transitionConfig
});

const ResgisterStack = createStackNavigator({
  Register: {
    screen: RegisterScreen, 
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Register" navigation={navigation}></Header>
    })
  }
}, {
  transitionConfig
});