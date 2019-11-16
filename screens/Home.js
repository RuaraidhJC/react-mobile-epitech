import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ShareGps from "../modals/ShareGps";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      openSendPage: false
    };
  }

  async componentDidMount() {
    this._getLocationAsync().then(() => {
      setTimeout(() => {
        this.componentDidMount();
      }, 2000);

    })
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const geo = (await Location.reverseGeocodeAsync({latitude, longitude}))[0];
    let address = geo.name + " ";
    address += geo.street + " ";
    address += geo.postalCode + " ";
    address += geo.city + " ";
    address += geo.country;
    this.setState({location: address});
  };

  async closeModal() {
    this.setState({openSendPage: false});
  }

  render() {
    return (
      <View>
        <ShareGps visible={this.state.openSendPage} onRequestClose={() => this.closeModal()} address={this.state.location}/>
        <Button onPress={() => this.setState({openSendPage: !this.state.openSendPage})} title="Partager ma position"/>
        <Text>{this.state.location}</Text>
      </View>
    );
  }
}
