import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// ALTERE ESTA LINHA ABAIXO:
import AppNavigator from './src/componentes/AppNavigator'; 

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}