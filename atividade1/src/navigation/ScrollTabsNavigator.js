import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//importo as minhas três telas que demonstram os tipos de scroll
import ScrollViewScreen from '../screens/scroll/ScrollViewScreen';
import FlatListScreen from '../screens/scroll/FlatListScreen';
import SectionListScreen from '../screens/scroll/SectionListScreen';

//instanciando o navegador de abas inferiores
const Tab = createBottomTabNavigator();

export default function ScrollTabsNavigator() {
  return (
    //oculto o cabeçalho (headerShown: false) porque o drawer principal já possui um cabeçalho, se eu deixasse true, a tela ficaria com dois cabeçalhos empilhados.
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Scroll" component={ScrollViewScreen} />
      <Tab.Screen name="Flat" component={FlatListScreen} />
      <Tab.Screen name="Section" component={SectionListScreen} />
    </Tab.Navigator>
  );
}