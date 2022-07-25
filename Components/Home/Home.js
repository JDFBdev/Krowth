import React, {useState, useEffect} from "react";
import { View, Text, Image , StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mainIcon from '../../assets/icon.png';
import {StatusBar, ScrollView} from 'react-native';
import Card from '../Card/Card';
import axios from 'axios';

let widthvw = Dimensions.get('window').width; //full width
let heightvh = Dimensions.get('window').height; //full height 

export default function Home(){
    const [coins, setCoins] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            let promise = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)
            let response = promise.data;
            setCoins(response);
        }
        fetchData();
    },[])

    return(
        <View style={s.container}>
            <StatusBar barStyle='light-content' backgroundColor="#161831" />
            <View style={s.navbar}>
                <Image style={s.navbarImg} source={mainIcon} />
                <Text style={s.navbarTitle}>Krowth</Text>
                <Ionicons name="ios-menu" size={50} color="white" />
            </View>
            <ScrollView>
                <View style={s.content}>
                    <Text style={s.cardsTitle}>By Market Cap</Text>
                    <View style={s.cards}>
                    {
                        coins?.map((c,i)=>{
                            return (
                                <View key={i}>
                                    <Card coin={c} />
                                    <View style={{height: 15}}/>
                                </View>
                            )
                        })

                    }
                        <Card/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


const s = StyleSheet.create({
    container: { backgroundColor: '#161831', width: widthvw, minHeight: heightvh},
    navbar: { alignSelf: 'stretch', height: 70, display: 'flex', flexDirection: 'row' ,  justifyContent: 'space-between', alignItems: 'center', paddingLeft: '3%', paddingRight: '3%'},
    navbarImg: { height: '80%', width: 60 ,  resizeMode: 'contain'},
    navbarTitle: { color: '#EEF1FA', fontSize: 30 },
    cardsTitle: { color: '#EEF1FA', fontSize: 25 },
    content: { padding: 25 },
    cards: { paddingBottom: 100 }
})