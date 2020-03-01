import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  Block, Accordion, Checkbox, Button, Text, Input, Slider,
} from 'galio-framework';
import Network from '../utils/Network';


function AddFriends(props) {
  const [message, setMessage] = useState('');
  const { visible, onRequestClose } = props;

  const BASE_URL = 'https://epitech-react.herokuapp.com/';


  const submit = async () => {
        try {
            console.log("add friend :" + BASE_URL + 'add-friend?email=' + message);
            const response = await Network.get(BASE_URL +
                'add-friend?email=' + message);
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
      <Block
        style={{ backgroundColor: 'white' }}
        flex
        safe
        card
        shadow

      >
        <Block flex>
            <Input
                onChangeText={(value) => {setMessage(value)}}
                rounded
                placeholder="Friend's email"
            />
        </Block>
        <Block flex>
            <Button round color="error" onPress={submit}>Press here to send</Button>
        </Block>
      </Block>

    </Modal>
  );
}

StyleSheet.create({
  buttonStyle: {
    flexDirection: 'column',
    height: 50,
    alignItems: 'center',
  },
});

export default AddFriends;
/*
 <View
        style={{
          backgroundColor: 'white',
          borderRadius: 4,
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TextInput onChangeText={(text) => setMessage(text)} />
        <Button onPress={() => submit()} title="Envoyer à mon ami!" />
      </View>
  */
