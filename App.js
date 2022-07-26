import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home/Home';
import Coin from './Components/Coin/Coin';

export default function App(){

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} options={{ title: null }} />
        <Stack.Screen name="Coin" component={Coin} options={{ title: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}