import React from 'react';
import { SectionList, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { sectionData } from '../../utils/data';

export default function SectionListScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>SectionList</Text>
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={{ padding: 10 }}>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold', backgroundColor: '#ccc', padding: 5 }}>{title}</Text>
        )}
      />
    </View>
  );
}