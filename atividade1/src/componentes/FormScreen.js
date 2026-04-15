import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function FormScreen({ navigation }) {
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [dias, setDias] = useState('');

  const handleSave = async () => {
    // Validação simples
    if (!modelo || !marca || !dias) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Tenta salvar na coleção 'alugueis'
      await addDoc(collection(db, 'alugueis'), {
        modelo: modelo,
        marca: marca,
        dias: parseInt(dias),
        dataRegistro: new Date().toISOString()
      });
      
      Alert.alert('Sucesso!', 'Veículo registrado com sucesso.');
      
      // Limpa os campos
      setModelo('');
      setMarca('');
      setDias('');
      
      // Redireciona para a tela de Histórico
      navigation.navigate('Historico');

    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Novo Aluguel</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Marca do Veículo (ex: Toyota)" 
        value={marca}
        onChangeText={setMarca} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Modelo (ex: Corolla)" 
        value={modelo}
        onChangeText={setModelo} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Quantidade de Dias" 
        keyboardType="numeric"
        value={dias}
        onChangeText={setDias} 
      />
      
      <Button title="Salvar Registro" onPress={handleSave} color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});