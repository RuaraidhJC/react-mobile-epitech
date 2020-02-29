
import React from 'react'
import { View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
// Galio components
import {
    Card, Block, NavBar, Icon, Button
} from 'galio-framework';
import theme from '../utils/theme';

import Storage from '../utils/Storage';
import Network from '../utils/Network';
import GestureRecognizer from "react-native-swipe-gestures";

import useGlobalState from '../context/global';
import AddFriends from "../modals/AddFriends";

const cards = [
    {
        id: 1,
        avatar: 'http://i.pravatar.cc/100',
        title: 'Christopher Moon',
        caption: '138 minutes ago',
        location: 'Los Angeles, CA',
        friends: true,
    },
    {
        id: 2,
        avatar: 'http://i.pravatar.cc/100',
        title: 'Christopher Moon 2',
        caption: '138 minutes ago',
        location: 'Los Angeles, CA',
        friends: true,

    },
    {
        id: 3,
        avatar: 'http://i.pravatar.cc/100',
        title: 'Christopher Moon 3',
        caption: '138 minutes ago',
        location: 'Los Angeles, CA',
        friends: true,
        padded: true,
    },
    {
        id: 4,
        avatar: 'http://i.pravatar.cc/100',
        title: 'Christopher Moon 4',
        caption: '138 minutes ago',
        location: 'Los Angeles, CA',
        friends: false,
        padded: true,
    },
];

const cardsreq = [
    {
        id: 1,
        avatar: 'http://i.pravatar.cc/100',
        title: 'Monique Moon',
        caption: '138 minutes ago',
        location: 'Los Angeles, CA',
        friends: false,
    },
    {
        id: 2,
        avatar: 'http://i.pravatar.cc/100',
        title: 'Jacqueline Moon',
        caption: '138 minutes ago',
        location: 'Los Angeles, CA',
        friends: false,

    },
];

export default function ProfileWithState() {
    const {user} = useGlobalState();

    return (
        <Profile user={user}/>
    )
};


const BASE_URL = 'https://epitech-react.herokuapp.com/';


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : props.user,
            openSendPage : false,
        };
        // this.user = props.user;
        // this.openSendPage = false;
    }

    componentDidMount() {

    }

    handleMaps = () => {
        this.props.navigation.navigate('homeScreen')
    };

    handleSignout = async () => {
        Storage.logout();
        this.props.navigation.navigate('loginScreen')
    };

    addFriend = async (id) => {
        console.log("adding friend id: " + id);
        const friendEmail = this.user.FriendReqs[id].email;
            try {
                console.log("add friend " + friendEmail);
                const response = await Network.get(BASE_URL +
                    '/add-friend?confirm=true&email=' + friendEmail);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
    };

    refuseFriend = (id) => {
        console.log("refusing friend id: " + id)
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
        //const user = this.state.user;

        const friendList = user.Friends;
        const friendReqList = user.FriendReqs;

        console.log(friendList.length);

        return (
            <View style={styles.container}>
                <Block style={styles.container}>
                    <AddFriends
                        visible={openSendPage}
                        onRequestClose={() => this.closeModal()}
                    />
                    <View style={{flexDirection: "row"}}>

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

                        <View style={{flexDirection: "row"}}>

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
                                key={`cardfriend-${card.id}`}
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
                               // key={`cardreq-${card.id}`}
                                flex
                                borderless
                                shadowColor={theme.COLORS.GREY}
                                titleColor={card.full ? theme.COLORS.WHITE : null}
                                style={styles.card}
                                title={card.sender}
                                footerStyle={card.full ? styles.full : null}
                            >
                                {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                                <View style={{flexDirection: "row"}}>
                                    <Button
                                        style={[styles.button]}
                                        uppercase
                                        shadowless
                                        size="small"
                                        color="rgb(176, 30, 11)"
                                        onPress={() => this.refuseFriend(id)}
                                    >
                                        Refuse
                                    </Button>
                                    <Button
                                        style={[styles.button]}
                                        uppercase
                                        shadowless
                                        size="small"
                                        color="rgb(29, 145, 31)"
                                        onPress={() => this.addFriend(id)}
                                    >
                                        Accept
                                    </Button>
                                </View>
                            </Card>
                        ))}




{/*                        {cards && cards.map((card, id) => (
                            <Card
                                key={`cardfriend-${card.id}`}
                                flex
                                borderless
                                shadowColor={theme.COLORS.BLACK}
                                titleColor={card.full ? theme.COLORS.WHITE : null}
                                style={styles.card}
                                title={card.title}
                                caption={card.caption}
                                location={card.location}
                                avatar={`${card.avatar}?${id}`}
                                footerStyle={card.full ? styles.full : null}
                            >
                                {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                            </Card>
                        ))}

                        {cardsreq && cardsreq.map((card, id) => (
                            <Card
                                key={`cardreq-${card.id}`}
                                flex
                                borderless
                                shadowColor={theme.COLORS.GREY}
                                titleColor={card.full ? theme.COLORS.WHITE : null}
                                style={styles.card}
                                title={card.title}
                                avatar={`${card.avatar}?${id}`}
                                footerStyle={card.full ? styles.full : null}
                            >
                                {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                                <View style={{flexDirection: "row"}}>
                                    <Button
                                        style={[styles.button]}
                                        uppercase
                                        shadowless
                                        size="small"
                                        color="rgb(176, 30, 11)"
                                        onPress={() => this.refuseFriend(id)}
                                    >
                                        Refuse
                                    </Button>
                                    <Button
                                        style={[styles.button]}
                                        uppercase
                                        shadowless
                                        size="small"
                                        color="rgb(29, 145, 31)"
                                        onPress={() => this.addFriend(id)}
                                    >
                                        Accept
                                    </Button>
                                </View>
                            </Card>
                        ))}*/}
                    </Block>
                </ScrollView>
                </Block>
            </View>
        )
    }
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        color: '#000'
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

