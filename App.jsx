import React from 'react';
import Navigator from './Navigator';
import Notification from './utils/Notification';

export default function App() {
  Notification();
  console.log('lol');
  return <Navigator />;
}
