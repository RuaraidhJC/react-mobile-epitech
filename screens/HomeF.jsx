import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Block, Button } from "galio-framework";
import MapView from "react-native-maps";
import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ShareGps from "../modals/ShareGps";
import useGlobalState from "../context/global";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
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

const HomeF = props => {
  const globalState = useGlobalState();
  const { user, currentPosition, setCurrentPosition } = globalState;
  const [isMapReady, setIsMapReady] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { navigation } = props;

  useEffect(() => {
    const getPosition = async () => {
      const coords = await getLocationAsync();
      setCurrentPosition(coords);
    };
    // console.log(user);
    getPosition();
  });

  if (currentPosition) {
    return (
      <Block flex center style={styles.container}>
        <ShareGps
          coords={currentPosition}
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        />

        <MapView
          style={styles.map}
          onLayout={() => {
            setIsMapReady(true);
          }}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          {isMapReady &&
            user.Positions.length !== 0 &&
            user.Positions.map(elem => (
              <MapView.Marker
                key={user.Positions.findIndex(val => val === elem).toString()}
                coordinate={{
                  latitude: elem.latitude,
                  longitude: elem.longitude
                }}
                title="My Position"
                description={`${
                  elem.rating ? `Rated: ${"\u2b50".repeat(elem.rating)}` : ""
                }`}
              >
                <Image
                  source={{
                    uri: `https://epitech-react.herokuapp.com${user.profileUrl}`
                  }}
                  style={{ height: 35, width: 35 }}
                />
              </MapView.Marker>
            ))}

          {isMapReady &&
            user.Friends.length !== 0 &&
            user.Friends.map(friend =>
              friend.Positions.map(elem => (
                <MapView.Marker
                  key={friend.Positions.findIndex(
                    val => val === elem
                  ).toString()}
                  coordinate={{
                    latitude: elem.latitude,
                    longitude: elem.longitude
                  }}
                  title={friend.email}
                  description={`${
                    elem.rating ? `Rated: ${"\u2b50".repeat(elem.rating)}` : ""
                  }`}
                >
                  <Image
                    source={{
                      uri: `https://epitech-react.herokuapp.com${friend.profileUrl}`
                    }}
                    style={{ height: 35, width: 35 }}
                  />
                </MapView.Marker>
              ))
            )}
        </MapView>

        <Block row>
          <Button
            style={{ marginHorizontal: 15 }}
            uppercase
            size="small"
            color="rgb(206, 102, 89)"
            onPress={() => navigation.navigate("profileScreen")}
          >
            Profile
          </Button>
          <Button
            style={{ marginHorizontal: 15 }}
            uppercase
            size="small"
            color="rgb(0, 177, 238)"
            onPress={() => {
              setOpenModal(true);
            }}
          >
            share my position
          </Button>
        </Block>
      </Block>
    );
  }
  return (
    <Block flex center>
      <Button
        style={{ position: "absolute", bottom: 10 }}
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

HomeF.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};
export default HomeF;
