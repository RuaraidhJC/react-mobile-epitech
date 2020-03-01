import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Network from '../utils/Network';
import {Block, Accordion, Checkbox, Button, Text, Input, Slider} from 'galio-framework';

const StarRating = (props) => {
  const [choice, setChoice] = useState(0);
  const {checkBoxStyle} = props;

  console.log(choice, (choice > 2));
  return (
      <Block row middle style={{marginVertical: 10, marginHorizontal: 10}}>
        <Checkbox style={checkBoxStyle} iconName='star' initialValue={(choice > 2)} onChange={() => setChoice(1)}/>
        <Checkbox style={checkBoxStyle} iconName='star' initialValue={(choice > 1)} onChange={() => setChoice(2)}/>
        <Checkbox style={checkBoxStyle} iconName='star' initialValue={(choice > 2)} onChange={() => setChoice(3)}/>
        <Checkbox style={checkBoxStyle} iconName='star' initialValue={(choice > 3)} onChange={() => setChoice(4)}/>
        <Checkbox style={checkBoxStyle} iconName='star' initialValue={true} onChange={() => setChoice(5)}/>
      </Block>
  )
};



function ShareGps(props) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5)
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
          style={{backgroundColor: 'white'}}
          flex
          safe
          card
          shadow

      >
        <Block flex >
          <Block flex middle style={{marginHorizontal: 10}}>
            <Text p muted bold>Name your current location</Text>
            <Input
                rounded
                placeholder='(Optional) Message'
            />
          </Block>
          <Block flex center>
            <Text p muted bold>Rate your experience!</Text>
            <Block row middle >
              <Block flex={8} style={{horizontalMargin: 10}} >
                <Slider

                />
              </Block>
              <Block flex={2} middle>
                <Text h3 muted>{rating}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block flex >
          <Button round color='error'>Press here to send</Button>
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

/*ShareGps.propTypes = {
  coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
  address: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};*/

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