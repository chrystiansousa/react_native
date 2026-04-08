//IMPORTANTE: como estou usando o drawer navigator, aprendi que esta importação do gesture-handler precisa ser obrigatoriamente a primeira linha do projeto
import 'react-native-gesture-handler';

//importo o navigationContainer que gerencia a árvore de navegação e o estado do app
import { NavigationContainer } from '@react-navigation/native';

//importo o meu navegador principal, a gaveta, que criei separando a lógica de navegação
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    //o navigationContainer deve envolver toda a estrutura de rotas do aplicativo, sem ele as transições de tela não funcionam
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}