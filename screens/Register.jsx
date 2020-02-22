import React, { useState } from 'react';
import {
  View, TextInput, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import Storage from '../utils/Storage';
import Network from '../utils/Network';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { navigation } = props;
  const submit = async () => {
    const notificationToken = await Storage.getNotificationToken();
    const response = await Network.post('register', {
      email,
      password,
      confirmPassword,
      notificationToken,
    });

    if (response.data.success) {
      await Storage.setEmail(email);
      await Storage.setJwt(response.data.token);
      Network.defaults.headers.common.Authorization = response.data.token;
      return navigation.navigate('homeScreen');
    }
    return true;
  };

  return (
    <View>
      <TextInput value={email} onChangeText={(value) => setEmail(value)} />
      <TextInput value={password} onChangeText={(value) => setPassword(value)} />
      <TextInput
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />
      <Button onPress={() => submit()} title="Submit" />
      <Button onPress={() => navigation.goBack()} title="Back" />
    </View>
  );
}

Register.propTypes = {
  navigation: PropTypes.element.isRequired,
};
