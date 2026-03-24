import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ModalTabsNavigator from './ModalTabsNavigator';
import ScrollTabsNavigator from './ScrollTabsNavigator';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="Modais" component={ModalTabsNavigator} options={{ title: 'Área de Modais' }} />
      <Drawer.Screen name="Listas" component={ScrollTabsNavigator} options={{ title: 'Área de Listas' }} />
    </Drawer.Navigator>
  );
}