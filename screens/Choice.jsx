import React from "react";
import { View, Button } from "react-native";
import Notification from "../utils/Notification";

function Choice(props) {
  Notification();

  return (
    <View>
      <Button
        onPress={() => props.navigation.navigate("registerScreen")}
        title="Register"
      />
      <Button
        onPress={() => props.navigation.navigate("loginScreen")}
        title="Login"
      />
    </View>
  );
}

export default Choice;
