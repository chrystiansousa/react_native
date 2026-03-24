import React, { useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function ModalSlideScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Modal Slide</Text>
      <Button title="Abrir Modal" onPress={() => setVisible(true)} />
      <Modal animationType="slide" visible={visible} transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={globalStyles.text}>Este é o Modal com efeito Slide!</Text>
            <Button title="Fechar" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}