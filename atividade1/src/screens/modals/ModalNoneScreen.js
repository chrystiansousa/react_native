import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function ModalNoneScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Animação: Nenhuma</Text>
      <Text style={globalStyles.text}>O modal aparece de forma instantânea.</Text>
      
      <View style={{ marginTop: 20 }}>
        <Button title="Abrir Sem Animação" onPress={() => setModalVisible(true)} />
      </View>

      <Modal
        animationType="none" //o modal aparece "seco", sem transição
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={globalStyles.title}>Efeito 'None'</Text>
            <Text style={globalStyles.text}>Ideal para casos onde a velocidade é prioridade sobre a estética.</Text>
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