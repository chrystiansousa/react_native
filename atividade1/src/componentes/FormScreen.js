import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  Alert, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function FormScreen() {
  const [carName, setCarName] = useState('');
  const [clientName, setClientName] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  const handleSaveRental = async () => {
    try {
      await addDoc(collection(db, 'rentals'), {
        carName,
        clientName,
        value: parseFloat(value),
        date,
        createdAt: new Date()
      });
      
      Alert.alert('Salvo!', 'Aluguel registrado com sucesso.');
      
      // Limpa os campos após salvar
      setCarName('');
      setClientName('');
      setValue('');
      setDate('');
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Novo Aluguel</Text>

          <Text style={styles.label}>Veículo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Toyota Corolla" 
            value={carName}
            onChangeText={setCarName} 
          />

          <Text style={styles.label}>Cliente</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nome completo do locatário" 
            value={clientName}
            onChangeText={setClientName} 
          />

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: 150.00" 
            keyboardType="numeric" 
            value={value}
            onChangeText={setValue} 
          />

          <Text style={styles.label}>Data do Aluguel</Text>
          <TextInput 
            style={styles.input} 
            placeholder="DD/MM/AAAA" 
            value={date}
            onChangeText={setDate} 
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveRental}>
            <Text style={styles.buttonText}>Salvar Registro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8', // Fundo cinza claro para destacar o cartão
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Sombra para Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#2e7d32', // Verde moderno
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});