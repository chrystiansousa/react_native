import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { globalStyles } from '../styles/globalStyles';

export default function FormScreen() {
  const [carName, setCarName] = useState('');
  const [clientName, setClientName] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  // Função para persistir os dados do aluguel no Firestore.
  const handleSaveRental = async () => {
    try {
      // Crio um novo documento dentro da coleção 'rentals'
      await addDoc(collection(db, 'rentals'), {
        carName,
        clientName,
        value: parseFloat(value),
        date,
        createdAt: new Date()
      });
      Alert.alert('Salvo!', 'Aluguel registrado com sucesso.');
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Novo Aluguel de Carro</Text>
      
      <TextInput placeholder="Nome do Carro" onChangeText={setCarName} style={{ borderBottomWidth: 1, marginBottom: 15 }} />
      <TextInput placeholder="Nome do Cliente" onChangeText={setClientName} style={{ borderBottomWidth: 1, marginBottom: 15 }} />
      <TextInput placeholder="Valor do Aluguel" keyboardType="numeric" onChangeText={setValue} style={{ borderBottomWidth: 1, marginBottom: 15 }} />
      <TextInput placeholder="Data (DD/MM/AAAA)" onChangeText={setDate} style={{ borderBottomWidth: 1, marginBottom: 15 }} />
      
      <Button title="Salvar Registro" onPress={handleSaveRental} color="green" />
    </View>
  );
}