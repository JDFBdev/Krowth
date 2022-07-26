import React from "react";
import { View, Text, Image, Dimensions , StyleSheet, StatusBar, TextInput  } from 'react-native';
import Navbar from '../Navbar/Navbar';
import {LinearGradient} from 'expo-linear-gradient';
import Arrows from '../../assets/arrows.png';

let widthvw = Dimensions.get('window').width; //full width
let heightvh = Dimensions.get('window').height; //full height 

export default function Coin({route}){
    const { coin } = route.params;
    const [text, setText] = React.useState(0);

    const handleText = function(){
        setText()
    }

    return (
        <View style={s.container}>
            <StatusBar barStyle='light-content' backgroundColor="#161831" />
            <Navbar />
            <View style={s.content}>
                <View style={s.header}>
                    <LinearGradient colors={['#3AE778', '#5054A2']} style={s.rankContainer} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                        <Text style={s.rank}>Rank #{coin.market_cap_rank}</Text>
                    </LinearGradient>
                    <View style={{height: 10}}/>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={s.coinLogo} source={{uri: coin.image}} />
                        <Text style={s.coinName} >{coin.symbol.toUpperCase()} - {coin.name}</Text>
                    </View>
                    <View style={{height: 10}}/>
                    <Text style={s.price}>US${coin.current_price}</Text>
                </View>
                <View style={s.conversionContainer}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <LinearGradient colors={['#3AE778', '#5054A2']} style={s.conversionSymbolContainer1} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                            <Text style={{color: '#EEF1FA'}}>{coin.symbol.toUpperCase()}</Text>
                        </LinearGradient>
                        <TextInput
                            style={s.input1}
                            onChangeText={handleText}
                            value={text}
                            keyboardType="numeric"
                        />
                    </View>
                    <Image style={{width:25, height: 20}} source={Arrows} />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            style={s.input2}
                            onChangeText={handleText}
                            value={text}
                            keyboardType="numeric"
                        />
                        <LinearGradient colors={['#3AE778', '#5054A2']} style={s.conversionSymbolContainer2} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                            <Text style={{color: '#EEF1FA'}}>USD</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        backgroundColor: '#161831',
        width: widthvw,
        minHeight: heightvh
    },
    content: {
        padding: 16
    },
    header: {
        marginBottom: 20
    },
    rankContainer: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    rank: {
        color: '#EEF1FA',
        fontSize: 14
    },
    coinLogo: {
        height: 50,
        aspectRatio: 1/1,
        resizeMode: 'contain',
        borderRadius: 8
    },
    coinName: {
        color: '#EEF1FA',
        fontSize: 28,
        marginLeft: 10
    },
    price: {
        color: '#EEF1FA',
        fontSize: 28,
        marginLeft: 10
    },
    conversionContainer: {
        backgroundColor: '#262842',
        height: 80,
        alignSelf: 'stretch',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, conversionSymbolContainer1: {
        height: 40,
        padding: 10,
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    input1: {
        height: 40,
        width: 120,
        margin: 12,
        marginLeft: 0,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        padding: 10,
        backgroundColor: '#44455C',
        color: '#EEF1FA'
    }, conversionSymbolContainer2: {
        height: 40,
        padding: 10,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
    },
    input2: {
        height: 40,
        width: 120,
        margin: 12,
        marginRight: 0,
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        padding: 10,
        backgroundColor: '#44455C',
        color: '#EEF1FA'
    }

})