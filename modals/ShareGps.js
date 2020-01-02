import React, {Component, useState} from 'react';
import {View, TouchableHighlight, Text, Alert, Platform, StyleSheet, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import Network from "../utils/Network";

export default function ShareGps(props) {
  const [email, setEmail] = useState('');

  const submit = async () => {
    console.log("to: "+email);
    console.log('coords: ', props.coordinate)
    const response = await Network.post("push", {
      address: props.address,
      coordinate: props.coordinate,
      to: email
    });

    props.onRequestClose();
  };

  return (
    <Modal backdropColor="black"
           backdropOpacity={0.7}
           animationIn="bounceIn"
           animationOut="bounceOut"
           animationInTiming={600}
           animationOutTiming={300}
           backdropTransitionInTiming={600}
           backdropTransitionOutTiming={300}
           isVisible={props.visible}
           onRequestClose={props.onRequestClose}
           onBackdropPress={props.onRequestClose}
    >
      <View style={{
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: 'center'
      }}>
        <TextInput onChangeText={(text) => setEmail(text)}  />
        <Button onPress={() => submit()} title="Envoyer à mon ami!" />
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'column',
    height: 60,
    alignItems: 'center'
  },
});

