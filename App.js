import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigator';
import Notification from "./utils/Notification";

export default function App() {
  Notification();
  return (
    <Navigator />
  );
}
