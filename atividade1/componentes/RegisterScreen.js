import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para realizar o cadastro do usuário no Firebase Auth.
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Sucesso!', 'Usuário criado com sucesso!');
        navigation.navigate('Login');
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro de Usuário</Text>
      
      {/* Inputs para capturar os dados do novo usuário */}
      <TextInput 
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="E-mail"
        onChangeText={setEmail}
      />
      <TextInput 
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />
      
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}