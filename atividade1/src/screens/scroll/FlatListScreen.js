import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { listData } from '../../utils/data';

export default function FlatListScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>FlatList</Text>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 15, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}