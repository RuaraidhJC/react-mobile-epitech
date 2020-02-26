
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
// Galio components
import {
  Card, Block, Button,
} from 'galio-framework';
import theme from '../utils/theme';

import Storage from '../utils/Storage';
import Network from '../utils/Network';

import useGlobalState from '../context/global';
import AddFriends from '../modals/AddFriends';


const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 20,
  },
  titleleft: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 20,
  },
  big: {
    fontSize: 20,
    color: '#000',
  },
  bigdown: {
    fontSize: 25,
    color: '#000',
    marginTop: 20,
  },
  button: {
    width: (width - theme.SIZES.BASE * 2) / 2,
  },
  buttonadd: {
    position: 'absolute',
    right: 0,
    width: 100,
  },
  buttonl: {
    right: '60%',
    width: 100,
  },
  buttonr: {
    left: '60%',
    width: 100,
  },
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  carding: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardsolo: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default function ProfileWithState(props) {
  const { user } = useGlobalState();

  const { navigation } = props;
  return (
    <Profile user={user} navigation={navigation} />
  );
}

const BASE_URL = 'https://epitech-react.herokuapp.com/';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      navigation: props.navigation,
      openSendPage: false,
    };
  }

  componentDidMount() {

  }

    handleMaps = () => {
      const {
        navigation,
      } = this.state;
      navigation.navigate('homeScreen');
    };

    handleSignout = async () => {
      const {
        navigation,
      } = this.state;
      Storage.logout();
      navigation.navigate('loginScreen');
    };

    addFriend = async (id, email) => {
      console.log(`adding friend id: ${id}`);
      try {
        console.log(`add friend ${email}`);
        const response = await Network.get(`${BASE_URL
        }add-friend?confirm=true&email=${email}`);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    refuseFriend = (id, email) => {
      console.log(`refusing friend id: ${
        id}email = ${email}`);
    };

    closeModal = async () => {
      this.setState({ openSendPage: false });
    };

    reqFriend = () => {
      this.setState({ openSendPage: true });
    };


    render() {
      const {
        user,
        openSendPage,
      } = this.state;

      const friendList = user.Friends;
      const friendReqList = user.OpenFriendReqs;

      return (
        <View style={styles.container}>
          <Block style={styles.container}>
            <AddFriends
              visible={openSendPage}
              onRequestClose={() => this.closeModal()}
            />
            <View style={{ flexDirection: 'row' }}>

              <Button
                style={[styles.buttonl]}
                uppercase
                shadowless
                size="small"
                color="rgb(206, 102, 89)"
                onPress={this.handleSignout}
              >
                Logout
              </Button>

              <Text style={styles.title}> Profile </Text>

              <Button
                style={[styles.buttonr]}
                uppercase
                shadowless
                size="small"
                color="rgb(0, 177, 238)"
                onPress={this.handleMaps}
              >
                Map
              </Button>
            </View>

            <ScrollView contentContainerStyle={styles.cards}>

              <Block flex space="between">
                <Card
                  flex
                  borderless
                  shadowColor={theme.COLORS.BLACK}
                  style={styles.card}
                  title={user.email}
                  avatar={BASE_URL + user.profileUrl}
                />

                <View style={{ flexDirection: 'row' }}>

                  <Text style={styles.titleleft}> Friends </Text>

                  <Button
                    style={[styles.buttonadd]}
                    uppercase
                    shadowless
                    size="small"
                    color="rgb(0, 177, 238)"
                    onPress={this.reqFriend}
                  >
                    ADD
                  </Button>
                </View>

                <Text>{'\n'}</Text>

                {friendList && friendList.map((card, id) => (
                  <Card
                    key={`friend-${card.email}`}
                    flex
                    borderless
                    shadowColor={theme.COLORS.BLACK}
                    titleColor={card.full ? theme.COLORS.WHITE : null}
                    style={styles.card}
                    title={card.email}
                    avatar={BASE_URL + card.profileUrl}
                    footerStyle={card.full ? styles.full : null}
                  >
                    {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                  </Card>
                ))}

                {friendReqList && friendReqList.map((card, id) => (
                  <Card
                    key={`friendreq-${card.sender}`}
                    flex
                    borderless
                    shadowColor={theme.COLORS.GREY}
                    titleColor={card.full ? theme.COLORS.WHITE : null}
                    style={styles.card}
                    title={card.sender}
                    avatar="https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png"
                    footerStyle={card.full ? styles.full : null}
                  >
                    {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                    <View style={{ flexDirection: 'row' }}>
                      <Button
                        style={[styles.button]}
                        uppercase
                        shadowless
                        size="small"
                        color="rgb(176, 30, 11)"
                        onPress={() => this.refuseFriend(id, card.sender)}
                      >
                        Refuse
                      </Button>
                      <Button
                        style={[styles.button]}
                        uppercase
                        shadowless
                        size="small"
                        color="rgb(29, 145, 31)"
                        onPress={() => this.addFriend(id, card.sender)}
                      >
                        Accept
                      </Button>
                    </View>
                  </Card>
                ))}

              </Block>
            </ScrollView>
          </Block>
        </View>
      );
    }
}
