import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Network from '../utils/Network';


function ShareGps(props) {
  const [email, setEmail] = useState('');
  const { visible, onRequestClose } = props;


  const submit = async () => {
    console.log(`to: ${email}`);
    console.log('coords: ', props.coordinate);
    await Network.post('push', {
      address: props.address,
      coordinate: props.coordinate,
      to: email,
    });
    props.onRequestClose();
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
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 4,
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TextInput onChangeText={(text) => setEmail(text)} />
        <Button onPress={() => submit()} title="Envoyer à mon ami!" />
      </View>
    </Modal>
  );
}

StyleSheet.create({
  buttonStyle: {
    flexDirection: 'column',
    height: 60,
    alignItems: 'center',
  },
});

ShareGps.propTypes = {
  coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
  address: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ShareGps;
