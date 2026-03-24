import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

export default function ModalNoneScreen() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Modal - Sem Animação</Text>
      <Text style={globalStyles.text}>Este modal aparece instantaneamente.</Text>
      
      <View style={{ marginTop: 20 }}>
        <Button title="Abrir Modal (None)" onPress={() => setVisible(true)} color={theme.colors.primary} />
      </View>

      <Modal 
        animationType="none" // Diferencial desta tela
        visible={visible} 
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={globalStyles.title}>Efeito None</Text>
            <Text style={globalStyles.text}>Sem transição, apenas surgiu na tela.</Text>
            <View style={{ marginTop: 20 }}>
              <Button title="Fechar" onPress={() => setVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.white,
    padding: theme.spacing * 2,
    borderRadius: 15,
    elevation: 5,
  }
});