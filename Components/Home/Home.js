import React, {useState, useEffect} from "react";
import { View, Text , StyleSheet, Dimensions, Alert, Modal } from 'react-native';
import {StatusBar, ScrollView} from 'react-native';
import Card from '../Card/Card';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

let widthvw = Dimensions.get('window').width; //full width
let heightvh = Dimensions.get('window').height; //full height 

export default function Home({navigation}){
    const [coins, setCoins] = useState([]);
    const [filter, setFilter] = useState('By Market Cap');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            try{
                let promise = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)
                let response = promise.data;
                setCoins(response);
            }catch(e) {
                Alert.alert('Something went wrong! Please try again later.')
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        let aux = [...coins];
        switch (filter) {
            case 'By Market Cap':
                aux.sort((a,b) => (a.market_cap > b.market_cap) ? -1 : ((b.market_cap > a.market_cap) ? 1 : 0));
                break;
    
            case 'By Lowest Market Cap':
                aux.sort((a,b) => (a.market_cap > b.market_cap) ? 1 : ((b.market_cap > a.market_cap) ? -1 : 0))
                break;

            case 'By Highest Price':
                aux.sort((a,b) => (a.current_price > b.current_price) ? -1 : ((b.current_price > a.current_price) ? 1 : 0));
                break;

            case 'By Lowest Price':
                aux.sort((a,b) => (a.current_price > b.current_price) ? 1 : ((b.current_price > a.current_price) ? -1 : 0));
                break;

            case 'By Highest 1H Percentage':
                aux.sort((a,b) => (a.price_change_percentage_1h_in_currency > b.price_change_percentage_1h_in_currency) ? -1 : ((b.price_change_percentage_1h_in_currency > a.price_change_percentage_1h_in_currency) ? 1 : 0));
                break;

            case 'By Lowest 1H Percentage':
                aux.sort((a,b) => (a.price_change_percentage_1h_in_currency > b.price_change_percentage_1h_in_currency) ? 1 : ((b.price_change_percentage_1h_in_currency > a.price_change_percentage_1h_in_currency) ? -1 : 0));
                break;

            case 'By Highest 1D Percentage':
                aux.sort((a,b) => (a.price_change_percentage_24h_in_currency > b.price_change_percentage_24h_in_currency) ? -1 : ((b.price_change_percentage_24h_in_currency > a.price_change_percentage_24h_in_currency) ? 1 : 0));
                break;

            case 'By Lowest 1D Percentage':
                aux.sort((a,b) => (a.price_change_percentage_24h_in_currency > b.price_change_percentage_24h_in_currency) ? 1 : ((b.price_change_percentage_24h_in_currency > a.price_change_percentage_24h_in_currency) ? -1 : 0));
                break;

            case 'By Highest 1W Percentage':
                aux.sort((a,b) => (a.price_change_percentage_7d_in_currency > b.price_change_percentage_7d_in_currency) ? -1 : ((b.price_change_percentage_7d_in_currency > a.price_change_percentage_7d_in_currency) ? 1 : 0));
                break;

            case 'By Lowest 1W Percentage':
                aux.sort((a,b) => (a.price_change_percentage_7d_in_currency > b.price_change_percentage_7d_in_currency) ? 1 : ((b.price_change_percentage_7d_in_currency > a.price_change_percentage_7d_in_currency) ? -1 : 0));
                break;

            default:
                return

        }
        setCoins(aux);
    }, [filter])

    return(
        <View style={s.container}>
            <StatusBar barStyle='light-content' backgroundColor="#161831" />
            <Navbar navigation={navigation} setFilter={setFilter} />
            <ScrollView>
                <View style={s.content}>
                    <Text style={s.cardsTitle}>{filter}</Text>
                    <View style={s.cards}>
                    {
                        coins?.map((c,i)=>{
                            return (
                                <View key={i}>
                                    <Card coin={c} navigation={navigation} />
                                    <View style={{height: 15}}/>
                                </View>
                            )
                        })
                    }
                        <Card/>
                    </View>
                </View>
            </ScrollView>
            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={loading}>
                    <View style={s.modalFrame}>
                        <View style={{width: 200, height: 100, borderRadius: 10, backgroundColor: 'white' ,  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 30}}>Loading...</Text>
                        </View>
                    </View>
            </Modal> */}
        </View>
    )
}


const s = StyleSheet.create({
    container: { backgroundColor: '#161831', width: widthvw, minHeight: heightvh},
    navbar: { alignSelf: 'stretch', height: 70, display: 'flex', flexDirection: 'row' ,  justifyContent: 'space-between', alignItems: 'center', paddingLeft: '3%', paddingRight: '3%'},
    navbarImg: { height: '80%', width: 60 ,  resizeMode: 'contain'},
    navbarTitle: { color: '#EEF1FA', fontSize: 30 },
    cardsTitle: { color: '#EEF1FA', fontSize: 30, marginBottom: 20 },
    content: { padding: 25 },
    cards: { paddingBottom: 100 },
    modalFrame: {
        width: "100%",
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050'
    },
})