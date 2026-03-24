import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function ScrollViewScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>ScrollView</Text>
      {Array.from({ length: 15 }).map((_, i) => (
        <View key={i} style={{ padding: 20, backgroundColor: '#ddd', marginVertical: 5 }}>
          <Text>Texto longo para testar rolagem {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}