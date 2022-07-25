import React, {useState, useEffect} from "react";
import { View, Text, Image , StyleSheet, Dimensions } from 'react-native';
import { Chart, Line } from 'react-native-responsive-linechart';

export default function Card({coin}){
    const [sparkline, setSparkline] = useState([]);
    const [colors, setColors] = useState({sparkline: '', h: '', d:'', w: '' });

    if(!coin){
        return <View></View>;
    }

    useEffect(()=>{
        if(coin.sparkline_in_7d){
            let data = [];
            let colores = {sparkline: '', h: '', d:'', w: ''};
            coin.sparkline_in_7d.price.forEach((p,index) =>{
                data.push({x: index, y: p})
            });
            setSparkline(data);

            if(coin.sparkline_in_7d.price[0] < coin.sparkline_in_7d.price[data.length-1]){
                colores.sparkline = 'green';
            } else if (coin.sparkline_in_7d.price[0] > coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length-1]){
                colores.sparkline = '#d43d3d';
            } else {
                colores.sparkline = 'gray';
            }

            [
                coin.price_change_percentage_1h_in_currency,
                coin.price_change_percentage_24h_in_currency,
                coin.price_change_percentage_7d_in_currency
            ].forEach((p,i)=>{
                let prop = '';
                if (i === 0) prop = 'h';
                if (i === 1) prop = 'd';
                if (i === 2) prop = 'w';

                if (p > 0){
                    colores[prop] = '#56d756';
                } else if (p < 0)
                {
                    colores[prop] = '#e44f4f';
                } else {
                    colores[prop] = '#d6d6d6';
                }

            })

            setColors(colores);

        }
        
    },[coin])

    return (
        <View style={s.card}>
            <Image style={s.cardImg} alt='Coin' source={{uri: coin.image}} />
            <View style={s.cardData}>
                <View style={s.cardNameContainer}>
                    <Text style={s.cardName} numberOfLines={1}>{coin.name} - ${coin.current_price}</Text>
                </View>
                <View style={s.cardStats}>
                    <View style={s.cardStat}>
                        <Text style={s.cardStatText}>1h</Text>
                        <Text style={[s.cardStatText, {color: colors.h } ]}>{Math.floor(coin.price_change_percentage_1h_in_currency * 100) / 100}%</Text>
                    </View>
                    <View style={s.cardStat}>
                        <Text style={s.cardStatText}>24h</Text>
                        <Text style={[s.cardStatText, {color: colors.d } ]}>{Math.floor(coin.price_change_percentage_24h_in_currency * 100) / 100}%</Text>
                    </View>
                    <View style={s.cardStat}>
                        <Text style={s.cardStatText}>7d</Text>
                        <Text style={[s.cardStatText, {color: colors.w } ]}>{Math.floor(coin.price_change_percentage_7d_in_currency * 100) / 100}%</Text>
                    </View>
                </View>
            </View>
            <Chart
                style={{ height: 90, width: 150 }}
                    data={sparkline}
                    padding={{ left: 10, bottom: 20, right: 20, top: 20 }}
                >
                <Line theme={{ stroke: { color: colors.sparkline, width: 2 }}} />
            </Chart>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 30,
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