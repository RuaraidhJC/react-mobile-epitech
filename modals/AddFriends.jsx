import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Block, Button, Input } from "galio-framework";

import Network from "../utils/Network";

function AddFriends(props) {
  const [message, setMessage] = useState("");
  const { visible, onRequestClose } = props;

  const BASE_URL = "https://epitech-react.herokuapp.com/";

  const submit = async () => {
    try {
      console.log(`add friend :${BASE_URL}add-friend?email=${message}`);
      const response = await Network.get(
        `${BASE_URL}add-friend?email=${message}`
      );
      console.log(response);
      onRequestClose();
    } catch (err) {
      console.log(err);
      onRequestClose();
    }
  };

  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.7}
      animationIn="bounceIn"
      animationOut="bounceOut"
      animationInTiming={600}
      animationOutTiming={300}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={300}
      isVisible={visible}
      onRequestClose={onRequestClose}
      onBackdropPress={onRequestClose}
    >
      <Block style={styles.block} safe card shadow>
        <Block flex>
          <Input
            onChangeText={value => {
              setMessage(value);
            }}
            rounded
            placeholder="Friend's email"
          />
        </Block>
        <Block flex>
          <Button round color="info" onPress={submit}>
            Press here to send
          </Button>
        </Block>
      </Block>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: "column",
    height: 50,
    alignItems: "center"
  },
  block: {
    backgroundColor: "white",
    height: "30%"
  }
});

export default AddFriends;
