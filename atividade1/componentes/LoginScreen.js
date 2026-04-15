import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
// Importo o serviço de autenticação que configurei anteriormente.
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para validar o login no Firebase.
  const handleLogin = () => {
    // Verifico se os campos não estão vazios antes de chamar o Firebase.
    if (email === '' || password === '') {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Se o login for bem-sucedido, o utilizador é enviado para a área principal (Drawer).
        Alert.alert('Bem-vindo!', 'Login realizado com sucesso.');
        navigation.replace('MainApp');
      })
      .catch(error => {
        // Trato erros comuns como senha errada ou utilizador não encontrado.
        Alert.alert('Erro no Login', 'E-mail ou palavra-passe incorretos.');
      });
  };

  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Acesso ao Sistema</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Palavra-passe"
        secureTextEntry
        onChangeText={setPassword}
      />
      
      <View style={{ width: '80%', marginTop: 10 }}>
        <Button title="Entrar" onPress={handleLogin} color={theme.colors.primary} />
      </View>

      {/* Opção para navegar até à tela de registo caso o utilizador não tenha conta. */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
        <Text style={{ color: theme.colors.primary }}>Não tem uma conta? Registe-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: 20,
    paddingHorizontal: 10,
  }
});