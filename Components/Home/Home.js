import React from "react";
import { View, Text, Image , StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mainIcon from '../../assets/icon.png';
import {StatusBar} from 'react-native';
import Card from '../Card/Card';

let widthvw = Dimensions.get('window').width; //full width
let heightvh = Dimensions.get('window').height; //full height 

export default function Home(){
    return(
        <View style={s.container}>
            <StatusBar barStyle='light-content' backgroundColor="#161831" />
            <View style={s.navbar}>
                <Image style={s.navbarImg} source={mainIcon} />
                <Text style={s.navbarTitle}>Krowth</Text>
                <Ionicons name="ios-menu" size={50} color="white" />
            </View>
            <View style={s.content}>
                <Text style={s.cardsTitle}>By Market Cap</Text>
                <View style={s.cards}>
                    <Card/>
                </View>
            </View>
        </View>
    )
}


const s = StyleSheet.create({
    container: { backgroundColor: '#161831', width: widthvw, height: heightvh },
    navbar: { alignSelf: 'stretch', height: 70, display: 'flex', flexDirection: 'row' ,  justifyContent: 'space-between', alignItems: 'center', paddingLeft: '3%', paddingRight: '3%'},
    navbarImg: { height: '80%', width: 60 ,  resizeMode: 'contain'},
    navbarTitle: { color: '#EEF1FA', fontSize: 30 },
    cardsTitle: { color: '#EEF1FA', fontSize: 25 },
    content: { padding: 25 }
})