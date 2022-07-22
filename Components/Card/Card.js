import React from "react";
import { View, Text, Image , StyleSheet, Dimensions } from 'react-native';

export default function Card(){

    return (
        <View style={s.card}>
            <Image style={s.cardImg} alt='Coin' source={{uri: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Bitcoin-BTC-icon.png'}} />
            <View style={s.cardData}>
                <View style={s.cardNameContainer}>
                    <Text style={s.cardName} numberOfLines={1}>Bitcoin - $20,650.7</Text>
                </View>
                <View style={s.cardStats}>
                    <View style={s.cardStat}>
                        <Text style={s.cardStatText}>1h</Text>
                        <Text style={s.cardStatText}>-1%</Text>
                    </View>
                    <View style={s.cardStat}>
                        <Text style={s.cardStatText}>24h</Text>
                        <Text style={s.cardStatText}>23%</Text>
                    </View>
                    <View style={s.cardStat}>
                        <Text style={s.cardStatText}>7d</Text>
                        <Text style={s.cardStatText}>3%</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    card: {
        alignSelf: 'stretch',
        aspectRatio: 4/1,
        backgroundColor: '#262842',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset:{ width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16, // hmmm
        paddingLeft: 20,
        paddingRight: 20
    },
    cardImg:{
        height: '60%',
        aspectRatio: 1/1,
        resizeMode: 'contain',
        borderRadius: 8
    },
    cardData: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 16
    },
    cardNameContainer: {
        width: 150,
        overflow: 'hidden'
    },
    cardName:{
        color: '#EEF1FA',
        fontSize: 18
    },
    cardStats:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center"
    },
    cardStat:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    cardStatText:{
        color: '#EEF1FA',
        fontSize: 15
    }
})