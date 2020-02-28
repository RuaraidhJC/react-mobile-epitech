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

const StarRating = (props) => {
  const [choice, setChoice] = useState(0);
  const { checkBoxStyle } = props;

  console.log(choice, (choice > 2));
  return (
    <Block row middle style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Button
        onlyIcon
        icon={(choice > 0) ? "star" : "staro"}
        iconFamily="antdesign"
        iconSize={30}
        color="warning"
        style={checkBoxStyle}
        onPress={() => { setChoice(1); }}
      >
        A
      </Button>
      <Button
        onlyIcon
        icon={(choice > 1) ? "star" : "staro"}
        iconFamily="antdesign"
        iconSize={30}
        color="warning"
        style={checkBoxStyle}
        onPress={() => { setChoice(2); }}
      >
        B
      </Button>
      <Button
        onlyIcon
        icon={(choice > 2) ? "star" : "staro"}
        iconFamily="antdesign"
        iconSize={30}
        color="warning"
        style={checkBoxStyle}
        onPress={() => { setChoice(3); }}
      >
        C
      </Button>
      <Button
        onlyIcon
        icon={(choice > 3) ? "star" : "staro"}
        iconFamily="antdesign"
        iconSize={30}
        color="warning"
        style={checkBoxStyle}
        onPress={() => { setChoice(4); }}
      >
        D
      </Button>
      <Button
        onlyIcon
        icon={(choice > 4) ? "star" : "staro"}
        iconFamily="antdesign"
        iconSize={30}
        color="warning"
        style={checkBoxStyle}
        onPress={() => { setChoice(5); }}
      >
        E
      </Button>


    </Block>
  );
};


function ShareGps(props) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const { visible, onRequestClose } = props;

  const submit = async () => {
    console.log(`to: ${message}`);
    console.log('coords: ', props.coordinate);
    await Network.post('push', {
      address: props.address,
      coordinate: props.coordinate,
      to: message,
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
      <Block
        style={{ backgroundColor: 'white' }}
        flex
        safe
        card
        shadow

      >
        <Block flex>
          <Block flex middle style={{ marginHorizontal: 10 }}>
            <Text p muted bold>Name your current location</Text>
            <Input
              rounded
              placeholder="(Optional) Message"
            />
          </Block>
          <Block flex center>
            <Text p muted bold>Rate your experience!</Text>
            <StarRating checkBoxStyle={{ marginHorizontal: 10, width: 40, height: 40 }} />
          </Block>
        </Block>
        <Block flex>
          <Button round color="error">Press here to send</Button>
        </Block>
      </Block>

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

/* ShareGps.propTypes = {
  coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
  address: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}; */

export default ShareGps;
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
