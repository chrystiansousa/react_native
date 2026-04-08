import { createDrawerNavigator } from '@react-navigation/drawer';

//importo a tela inicial e os navegadores de abas
import HomeScreen from '../screens/HomeScreen';
import ModalTabsNavigator from './ModalTabsNavigator';
import ScrollTabsNavigator from './ScrollTabsNavigator';

//instanciando o navegador do tipo gaveta
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    //configuro a tela home como a primeira a aparecer
    <Drawer.Navigator initialRouteName="Home">
    {/* Primeira opção da gaveta: apenas uma tela simples */}
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />

      {/*segunda opção: aqui aplico o conceito de navegação aninhada, ao clicar em modais, o usuário é levado para um Tab navigator.*/}
      <Drawer.Screen name="Modais" component={ModalTabsNavigator} options={{ title: 'Área de Modais' }} />

      {/*terceira opção: leva para o tab navigator das listas*/}
      <Drawer.Screen name="Listas" component={ScrollTabsNavigator} options={{ title: 'Área de Listas' }} />
    </Drawer.Navigator>
  );
}