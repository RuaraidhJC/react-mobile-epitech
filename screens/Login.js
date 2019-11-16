import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Storage from "../utils/Storage";
import Network from "../utils/Network";

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const notificationToken = await Storage.getNotificationToken();
    console.log(notificationToken)
    const response = await Network.post("login", {
      email,
      password,
      notificationToken
    });

    if (response.data.success) {
      await Storage.setEmail(email);
      await Storage.setJwt(response.data.token);
      Network.defaults.headers.common['Authorization'] = response.data.token;
      return props.navigation.navigate("homeScreen");
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={(value) => setEmail(value)} />
      <TextInput value={password} onChangeText={(value) => setPassword(value)} />
      <Button onPress={() => submit()} title="Submit" />
    </View>);
}
