import React from 'react';
import { Notifications } from 'expo';
import {StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Block, Button} from 'galio-framework';
import ShareGps from '../modals/ShareGps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      location: null,
      coords: [],
      notifications: [],
      openSendPage: false,
    };
  }

  componentDidMount = async () => {
    const { notifications } = this.state;
    Notifications.addListener((notification) => {
      if (
        notifications.find(
          (x) => x.notificationId === notification.notificationId,
        ) === undefined
      ) {
        console.log(notification);
        this.setState({
          notifications: [...notifications, notification],
        });
      }
    });
    this.getLocationAsync().then(() => {
      setTimeout(() => {
        this.componentDidMount();
      }, 2000);
    });
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log('coords: ', location.coords);
    const { latitude } = location.coords;
    const { longitude } = location.coords;
    this.setState({ coords: [latitude, longitude] });
    const geo = (
      await Location.reverseGeocodeAsync({ latitude, longitude })
    )[0];
    let address = `${geo.name} `;
    address += `${geo.street} `;
    address += `${geo.postalCode} `;
    address += `${geo.city} `;
    address += geo.country;
    this.setState({ location: address });
  };

  closeModal = async () => {
    this.setState({ openSendPage: false });
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  onSwipePerformed = () => {
    this.setState({ openSendPage: true });
  };

  // <ShareGps visible={this.state.openSendPage} onRequestClose={() =>
  // this.closeModal()} address={this.state.location}/>


    handleProfile = () => {
        this.props.navigation.navigate('profileScreen');
    };


  render() {
    const {
      notifications, coords, location, openSendPage, isMapReady,
    } = this.state;
    if (location) {
      const userLatitude = coords[0];
      const userLongitutde = coords[1];
      return (
        <Block flex center style={styles.container}>

            <Button
                style={{ alignSelf: 'center' }}
                uppercase
                size="small"
                color="rgb(206, 102, 89)"
                onPress={this.handleProfile}
            >
                Profile
            </Button>

          <ShareGps
            visible={openSendPage}
            onRequestClose={() => this.closeModal()}
            address={location}
            coordinate={coords}
          />
          <MapView
            style={styles.map}
            onLayout={this.onMapLayout}
            initialRegion={{
              latitude: userLatitude,
              longitude: userLongitutde,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {isMapReady
              && (
              <MapView.Marker
                coordinate={{ latitude: userLatitude, longitude: userLongitutde }}
                title="My Location"
              >
                <Image source={{ uri: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png' }} style={{ height: 35, width: 35 }} />
              </MapView.Marker>
              )}

            {isMapReady && notifications.length !== 0
                && notifications.map((elem) => (
                  <MapView.Marker
                    key={elem.notificationId}
                    coordinate={{
                      latitude: elem.data.coordinate[0],
                      longitude: elem.data.coordinate[1],
                    }}
                    title={elem.data.email}
                  />
                ))}
          </MapView>
          <GestureRecognizer
            onSwipe={(gestureName) => console.log('swiped: ', gestureName)}
            onSwipeUp={this.onSwipePerformed}
            style={{
              borderTopColor: 'grey',
              height: '10%',
              justifyContent: 'center',
            }}
            config={{
              velocityThreshold: 0.3,
              directionalOffsetThreshold: 80,
            }}
          >
            <Button
              style={{ alignSelf: 'center' }}
              uppercase
              size="small"
              color="rgb(0, 177, 238)"
            >
              Swipe up to share my position
            </Button>
          </GestureRecognizer>
        </Block>
      );
    }
    return (
      <Block flex center>
        <Button
          style={{ position: 'absolute', bottom: 10 }}
          loading
          size="small"
          color="rgb(0, 177, 238)"
          loadingSize="large"
        >
          Loading...
        </Button>
      </Block>
    );
  }
}
