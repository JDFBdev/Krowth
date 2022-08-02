import React, {useState, useEffect, useRef} from "react";
import { View, Text, Image, Dimensions , StyleSheet, StatusBar, TextInput, Modal, TouchableOpacity, Alert} from 'react-native';
import Navbar from '../Navbar/Navbar';
import {LinearGradient} from 'expo-linear-gradient';
import Arrows from '../../assets/arrows.png';
import axios from 'axios';
import { Chart, Line, HorizontalAxis } from 'react-native-responsive-linechart';

let widthvw = Dimensions.get('window').width; //full width
let heightvh = Dimensions.get('window').height; //full height 

export default function Coin({route, navigation}){
    const isFirstRender = useRef(true);
    const { coin } = route.params;
    const [prices, setPrices] = useState({USD: 0, BTC: 0, ETH: 0, LTC: 0, BNB: 0, EOS: 0, XRP: 0, XLM: 0, LINK: 0, DOT: 0})
    const [conversion, setConversion] = useState({first: 1, second: coin.current_price});
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [modalVisible, setModalVisible] = useState(false);
    const [sparkline, setSparkline] = useState([]);
    const [colors, setColors] = useState({sparkline: '#d6d6d6', h: '#d6d6d6', d:'#d6d6d6', w: '#d6d6d6'});

    useEffect(()=>{

        async function fetchData() {
            try{
                let promise = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cusd-coin%2Cethereum%2Cbinancecoin%2Cripple%2Cpolkadot%2Clitecoin%2Cstellar%2Ceos%2Cchainlink&vs_currencies=usd`)
                let response = promise.data;
                setPrices({USD: response['usd-coin'].usd, BTC: response.bitcoin.usd, ETH: response.ethereum.usd, LTC: response.litecoin.usd, BNB: response.binancecoin.usd, EOS: response.eos.usd, XRP: response.ripple.usd, XLM: response.stellar.usd, LINK: response.chainlink.usd, DOT: response.polkadot.usd})
            }catch(e) {
                Alert.alert('Something went wrong! Please try again later.')
            }
        }
        fetchData();
        
    },[])

    const handleConversionFirst = function(e){
        // Cant de coin * precio del coin / precio del selected coin
        setConversion((prev)=> ({first: e, second: Number.parseFloat(e * coin.current_price / prices[selectedCurrency]).toFixed(3)}))
    }

    const handleConversionSecond = function(e){
        setConversion((prev)=> ({second: e, first: Number.parseFloat(e / coin.current_price * prices[selectedCurrency]).toFixed(3)}))
    }

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
          } else {
            setConversion((prev)=> ({...prev, second: Number.parseFloat(prev.first * coin.current_price / prices[selectedCurrency]).toFixed(3)}))
          }
    },[selectedCurrency])

    useEffect(()=>{
        if(coin.sparkline_in_7d){
            let data = [];
            let colores = {sparkline: '#d6d6d6', h: '#d6d6d6', d:'#d6d6d6', w: '#d6d6d6'};
            coin.sparkline_in_7d.price.forEach((p,index) =>{
                data.push({x: index, y: p})
            });
            setSparkline(data);

            if(coin.sparkline_in_7d.price[0] < coin.sparkline_in_7d.price[data.length-1]){
                colores.sparkline = '#56d756';
            } else if (coin.sparkline_in_7d.price[0] > coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length-1]){
                colores.sparkline = '#d43d3d';
            } else {
                colores.sparkline = '#d6d6d6';
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
                } else if (p < 0){
                    colores[prop] = '#e44f4f';
                } else {
                    colores[prop] = '#d6d6d6';
                }

            })

            setColors(colores);

        }
        
    },[coin])

    return (
        <View style={s.container}>
            <StatusBar barStyle='light-content' backgroundColor="#161831" />
            <Navbar navigation={navigation} isCoin={true} />
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
                            onChangeText={handleConversionFirst}
                            keyboardType="numeric"
                            value={conversion.first.toString()}
                        />
                    </View>
                    <Image style={{width:25, height: 20}} source={Arrows} />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            style={s.input2}
                            onChangeText={handleConversionSecond}
                            keyboardType="numeric"
                            value={conversion.second.toString()}
                        />
                        <TouchableOpacity onPress={()=> {setModalVisible(true);}}>
                            <LinearGradient colors={['#3AE778', '#5054A2']} style={s.conversionSymbolContainer2} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                                <Text style={{color: '#EEF1FA'}}>
                                    {selectedCurrency}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={s.chartTitle}>7 Day View</Text>
                <Chart
                    style={{ height: 200, width:'100%'}}
                        data={sparkline}
                        padding={{ left: 10, bottom: 20, right: 20, top: 20 }}
                    >
                    <HorizontalAxis tickCount={10} />
                    <Line theme={{ stroke: { color: colors.sparkline, width: 2 }}} />
                </Chart>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <TouchableOpacity style={s.modalFrame} onPress={()=> {setModalVisible(false);}} activeOpacity={1}>
                    <TouchableOpacity style={s.modal} activeOpacity={1}>
                        <Text style={{color: '#EEF1FA',fontSize: 20, marginBottom: 20}}>
                            Select a currency to convert
                        </Text>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('USD'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>USD</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('BTC'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>BTC</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('ETH'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>ETH</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('LTC'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>LTC</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('BNB'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>BNB</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('EOS'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>EOS</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('XRP'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>XRP</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('XLM'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>XLM</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('LINK'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>LINK</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {setSelectedCurrency('DOT'); setModalVisible(false);}}>
                            <View style={s.selectorBtn}>
                                <Text style={s.selectorBtnText}>DOT</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
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
    },
    conversionSymbolContainer1: {
        height: 40,
        padding: 10,
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    input1: {
        height: 40,
        width: '45%',
        alignSelf:'stretch',
        marginRight: -30,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        padding: 10,
        backgroundColor: '#44455C',
        color: '#EEF1FA'
    },
    conversionSymbolContainer2: {
        height: 40,
        padding: 10,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
    },
    input2: {
        height: 40,
        width: '45%',
        borderRadius: 8,
        marginLeft: -30,
        alignSelf:'stretch',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        padding: 10,
        backgroundColor: '#44455C',
        color: '#EEF1FA'
    },
    modalFrame: {
        width: "100%",
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050'
    },
    modal: {
        width: 320,
        backgroundColor: '#262842',
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    selectorBtn: {
        backgroundColor: '#44455C',
        padding: 8,
        borderRadius: 5,
        flexWrap: 'wrap',
        marginRight: 10,
        marginBottom: 10
    },
    selectorBtnText: {
        color: '#EEF1FA'
    },
    chartTitle: {
        color: '#EEF1FA',
        fontSize: 25,
        marginTop: 30
    }

})