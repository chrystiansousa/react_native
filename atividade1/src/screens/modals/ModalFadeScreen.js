import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function ModalFadeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Animação: Fade</Text>
      <Text style={globalStyles.text}>Este modal surge suavemente (opacidade).</Text>
      
      <View style={{ marginTop: 20 }}>
        <Button title="Ver Efeito Fade" onPress={() => setModalVisible(true)} />
      </View>

      <Modal
        animationType="fade" //diferencial: efeito de esmaecimento
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={globalStyles.title}>Modal Fade</Text>
            <Text style={globalStyles.text}>Utilizando transição suave de transparência.</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  content: { backgroundColor: 'white', padding: 30, borderRadius: 10, width: '80%' }
});