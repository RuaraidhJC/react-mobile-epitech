import React, { useState } from 'react';
import { Notifications } from 'expo';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import { Block, Button, Text } from 'galio-framework'
import Network from "../utils/Network";
import ShareGps from '../modals/ShareGps'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      coords: [],
      notifications: [],
      openSendPage: false
    };
  }

  async componentDidMount() {
    this._notificationSubscription = Notifications.addListener((notification) => {if (this.state.notifications.find(x => x.notificationId === notification.notificationId) === undefined) {this.setState({notifications:[...this.state.notifications, notification]})}})
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
    this.setState({coords: [latitude, longitude]})
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
//<ShareGps visible={this.state.openSendPage} onRequestClose={() => this.closeModal()} address={this.state.location}/>
  render() {
    if (this.state.location) {
      userLatitude = this.state.coords[0];
      userLongitutde = this.state.coords[1]
      return (
        <Block flex center>
          <ShareGps visible={this.state.openSendPage} onRequestClose={() => this.closeModal()} address={this.state.location} coordinate={this.state.coords}/>
          <MapView 
            style={{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            initialRegion={{
              latitude: userLatitude,
              longitude: userLongitutde,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}>    
            <MapView.Marker coordinate={{latitude: userLatitude, longitude: userLongitutde}} title="My Location"/>
            {this.state.notifications.length !== 0 && this.state.notifications.map((elem) => <MapView.Marker key={elem.notificationId} coordinate={{latitude: elem.data.coordinate[0], longitude:elem.data.coordinate[1]}} title={elem.data.email}/>)}
          </MapView>
          <Button onPress={() => this.setState({openSendPage: true})} style={{position: 'absolute', bottom: 10}} uppercase size='small' color='rgb(0, 177, 238)'>Share my position</Button>   
        </Block>
        
      );
    } 
    return (
      <Block flex center>
        <Button style={{position: 'absolute', bottom: 10}} loading size='small' color='rgb(0, 177, 238)' loadingSize='large'>Loading...</Button>
      </Block>
      
    )
  }
}
