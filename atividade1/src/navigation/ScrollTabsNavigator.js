import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScrollViewScreen from '../screens/scroll/ScrollViewScreen';
import FlatListScreen from '../screens/scroll/FlatListScreen';
import SectionListScreen from '../screens/scroll/SectionListScreen';

const Tab = createBottomTabNavigator();

export default function ScrollTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Scroll" component={ScrollViewScreen} />
      <Tab.Screen name="Flat" component={FlatListScreen} />
      <Tab.Screen name="Section" component={SectionListScreen} />
    </Tab.Navigator>
  );
}