import React, { useEffect, useState } from 'react';
import { Notifications } from 'expo';
import * as Location from 'expo-location';
import { Block, Button } from 'galio-framework';
import MapView from 'react-native-maps';
import { Image, StyleSheet } from 'react-native';
import ShareGps from '../modals/ShareGps';
import Network from '../utils/Network';
import useGlobalState from '../context/global';

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


const getLocationAsync = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude } = location.coords;
    const { longitude } = location.coords;
    return { latitude, longitude };
  } catch (error) {
    return { latitude: 0, longitude: 0 };
  }
};

const HomeF = (props) => {
  const globalState = useGlobalState();
  const { user, setUser } = globalState;
  const [notifications, setNotifications] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  const [isPositionSet, setIsPositionSet] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { navigation } = props;

  useEffect(() => {
    const getPosition = async () => {
      const coords = await getLocationAsync();
      setCurrentPosition(coords);
      setIsPositionSet(true);
    };
    getPosition();
    Notifications.addListener(async (notification) => {
      if (notifications.find(
        (x) => x.notificationId === notification.notificationId,
      ) === undefined) {
        setNotifications([...notifications, notification]);
        const response = await Network.get('/me');
        if (response.data.success) {
          setUser(response.data.data);
        }
      }
      return null;
    });
  });

  if (isPositionSet) {
    return (
      <Block flex center style={styles.container}>
        <Button
          style={{ alignSelf: 'center' }}
          uppercase
          size="small"
          color="rgb(206, 102, 89)"
          onPress={() => navigation.navigate('profileScreen')}
        >
          Profile
        </Button>
        <ShareGps
          coords={currentPosition}
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        />

        <MapView
          style={styles.map}
          onLayout={() => { setIsMapReady(true); }}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {isMapReady
                    && (
                    <MapView.Marker
                      coordinate={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude }}
                      title="My Location"
                    >
                      <Image source={{ uri: user.profileUrl }} style={{ height: 35, width: 35 }} />
                    </MapView.Marker>
                    )}

          {isMapReady && user['Friends'].length !== 0
                    && user['Friends']['Positions'].map((elem) => (
                      <MapView.Marker
                        key={elem.notificationId}
                        coordinate={{
                          latitude: elem.data.coordinate[0],
                          longitude: elem.data.coordinate[1],
                        }}
                        title={elem.data.email}
                      >
                          <Image source={{ uri: elem.profileUrl }} style={{ height: 35, width: 35 }} />
                      </MapView.Marker>
                    ))}
        </MapView>

        <Button
          style={{ alignSelf: 'center' }}
          uppercase
          size="small"
          color="rgb(0, 177, 238)"
          onPress={() => { setOpenModal(true); }}
        >
          Swipe up to share my position
        </Button>
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
};


/*
* <GestureRecognizer
          onSwipe={(gestureName) => console.log('swiped: ', gestureName)}
          onSwipeUp={() => setOpenModal(true)}
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
*
* */
export default HomeF;
