import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importo as telas de autenticação e as novas telas de funcionalidades.
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import FormScreen from './FormScreen';
import ListScreen from './ListScreen';

// Importo os navegadores da prática anterior para manter a integração.
import HomeScreen from '../screens/HomeScreen';
import ModalTabsNavigator from '../navigation/ModalTabsNavigator';
import ScrollTabsNavigator from '../navigation/ScrollTabsNavigator';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Crio a navegação principal (Gaveta) que será exibida após o login.
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="NovoAluguel" component={FormScreen} options={{ title: 'Novo Aluguer' }} />
      <Drawer.Screen name="Historico" component={ListScreen} options={{ title: 'Histórico de Alugueres' }} />
      <Drawer.Screen name="Modais" component={ModalTabsNavigator} options={{ title: 'Modais' }} />
      <Drawer.Screen name="Listas" component={ScrollTabsNavigator} options={{ title: 'Listas' }} />
    </Drawer.Navigator>
  );
}

// O AppNavigator integra tudo usando um Stack Navigator como base.
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Telas acessíveis sem autenticação */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Criar Conta' }} 
      />
      
      {/* Área principal protegida após o login */}
      <Stack.Screen 
        name="MainApp" 
        component={DrawerNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}