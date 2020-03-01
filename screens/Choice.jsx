import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";
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

Choice.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};

export default Choice;
