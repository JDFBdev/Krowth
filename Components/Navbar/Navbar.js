import React from "react";
import { View, Text, Image , StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mainIcon from '../../assets/icon.png';

export default function Navbar(){
    return (
        <View style={s.navbar}>
            <Image style={s.navbarImg} source={mainIcon} />
            <Text style={s.navbarTitle}>Krowth</Text>
            <Ionicons name="ios-menu" size={50} color="white" />
        </View>
    )
}

const s = StyleSheet.create({
    navbar: { alignSelf: 'stretch', height: 70, display: 'flex', flexDirection: 'row' ,  justifyContent: 'space-between', alignItems: 'center', paddingLeft: '3%', paddingRight: '3%'},
    navbarImg: { height: '80%', width: 60 ,  resizeMode: 'contain'},
    navbarTitle: { color: '#EEF1FA', fontSize: 30 },
})