import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

export default function ModalSlideScreen() {
  //utilizo o hook useState para controlar se o modal está visível ou não
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Animação: Slide</Text>
      <Text style={globalStyles.text}>Este modal desliza de baixo para cima.</Text>
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Ver Efeito Slide" 
          onPress={() => setModalVisible(true)} 
          color={theme.colors.primary} 
        />
      </View>

      {/*componente Modal do React Native. animationType="slide": define que ele entra subindo na tela     transparent={true}: permite que eu veja o fundo da tela anterior por trás do modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={globalStyles.title}>Modal Slide</Text>
            <Text style={globalStyles.text}>A animação de entrada foi do tipo 'slide'.</Text>
            <View style={{ marginTop: 20 }}>
              <Button title="Fechar" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', //rio um fundo escurecido para dar foco ao modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  }
});