import React from 'react'
import { View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
//import { connect } from 'react-redux'
//import Firebase from '../config/Firebase'
import {LinearGradient} from 'expo';
import {primaryGradientArray} from "../utils/Colors";
//import SubTitle from "../app/components/SubTitle";


import Storage from '../utils/Storage';
import Network from '../utils/Network';

export default class Profile extends React.Component {
    state = {
        email: null,
        loading: true

};

    componentDidMount() {

        Promise.all(this.getUserData())
            .then(([email]) => {
                this.setState({email, loading: false});
                console.log("email set");
                console.log(this.email);
            })
            .catch(error => {
                this.setState({loading : false });
            });
    }

    getUserData = async () => {
        this.setState({email: await Storage.getEmail()});
    }

    handleMaps = () => {
        this.props.navigation.navigate('homeScreen')
    }

    handleSignout = async () => {
        Storage.logout();
        this.props.navigation.navigate('loginScreen')
    }




    render() {
        const {
            email,
            loading
        } = this.state;

        if (loading)
            return null;

        return (
            <View style={styles.container}>
                <Text style={styles.title}> Profile </Text>
                <Text style={styles.big}> {email} </Text>
                <Text>{'\n'}</Text>
                <Button title='Logout' onPress={this.handleSignout} />
                <Text>{'\n'}</Text>
                <Button title='Map' onPress={this.handleMaps} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1e1e1e'
    },
    big: {
        fontSize: 20,
        color: '#000'
    }
})

