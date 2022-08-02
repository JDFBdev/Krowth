import React, { useState } from "react";
import { View, Text, Image , StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mainIcon from '../../assets/icon.png';

export default function Navbar({navigation, setFilter, isCoin}){
    const [modalVisible, setModalVisible] = useState(false);

    const handleFilter = function(filter){
        if(setFilter){
            setFilter(filter);
        }
        setModalVisible(false);
        navigation.navigate('Home');
    }

    return (
        <View style={s.navbar}>
            <TouchableOpacity onPress={()=> {navigation.navigate('Home')}}>
                <Image style={s.navbarImg} source={mainIcon} />
            </TouchableOpacity>
            <Text style={s.navbarTitle}>Krowth</Text>
            {
                isCoin ? 
                <TouchableOpacity>
                    <Ionicons name="ios-menu" size={50} color="white" />
                </TouchableOpacity> : 
                <TouchableOpacity onPress={()=> setModalVisible(true)}>
                    <Ionicons name="ios-menu" size={50} color="white" />
                </TouchableOpacity>
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                    <TouchableOpacity style={s.modalFrame} onPress={()=> {setModalVisible(false);}} activeOpacity={1}>
                        <TouchableOpacity style={s.modal} activeOpacity={1}>
                            <View style={s.filters}>
                                <Text style={s.filtersTitle}>Criptocurrencies</Text>
                                <TouchableOpacity onPress={()=> {handleFilter('By Market Cap');}}>
                                    <Text style={s.filter}>By Market Cap</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Lowest Market Cap');}}>
                                    <Text style={s.filter}>By Lowest Market Cap</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Highest Price');}}>
                                    <Text style={s.filter}>By Highest Price</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Lowest Price');}}>
                                    <Text style={s.filter}>By Lowest Price</Text>   
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Highest 1H Percentage'); }}>
                                    <Text style={s.filter}>By Highest 1H Percentage</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Lowest 1H Percentage');}}>
                                    <Text style={s.filter}>By Lowest 1H Percentage</Text>   
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Highest 1D Percentage');}}>
                                    <Text style={s.filter}>By Highest 1D Percentage</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Lowest 1D Percentage');}}>
                                    <Text style={s.filter}>By Lowest 1D Percentage</Text>   
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Highest 1W Percentage');}}>
                                    <Text style={s.filter}>By Highest 1W Percentage</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {handleFilter('By Lowest 1W Percentage');}}>
                                    <Text style={s.filter}>By Lowest 1W Percentage</Text>   
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
        </View>
    )
}

const s = StyleSheet.create({
    navbar: { alignSelf: 'stretch', height: 70, display: 'flex', flexDirection: 'row' ,  justifyContent: 'space-between', alignItems: 'center', paddingLeft: '3%', paddingRight: '3%'},
    navbarImg: { height: '80%', width: 60 ,  resizeMode: 'contain'},
    navbarTitle: { color: '#EEF1FA', fontSize: 30 },
    modalFrame: {
        width: "100%",
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050'
    },
    modal: {
        width: '60%',
        height: '100%',
        backgroundColor: '#161831',
        marginRight: '40%'
    },
    filters: {
        padding: 10
    },
    filtersTitle: {
        color: '#EEF1FA',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 18
    },
    filter: {
        color: '#EEF1FA',
        fontSize: 20,
        marginBottom: 2
    }
    
})