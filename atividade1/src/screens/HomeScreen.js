import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Bem-vindo ao Aplicativo!</Text>
      <Text style={globalStyles.text}>Utilize o menu lateral para navegar entre as seções.</Text>
    </View>
  );
}