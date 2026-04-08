import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//importo as três telas de modais que criei na pasta de modais
import ModalSlideScreen from '../screens/modals/ModalSlideScreen';
import ModalFadeScreen from '../screens/modals/ModalFadeScreen';
import ModalNoneScreen from '../screens/modals/ModalNoneScreen';

//crio a instância do navegador por abas
const Tab = createBottomTabNavigator();

export default function ModalTabsNavigator() {
  return (
    /*defino headerShown como false aqui porque este navegador de abas está dentro de um drawer. Se eu deixasse como true, a interface exibiria dois títulos de cabeçalho um sobre o outro*/
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/*cada Tab.Screen representa uma das três telas de demonstração de comportamento de modais exigidas no requisito 2.2*/}
      <Tab.Screen name="Slide" component={ModalSlideScreen} />
      <Tab.Screen name="Fade" component={ModalFadeScreen} />
      <Tab.Screen name="Nenhum" component={ModalNoneScreen} />
    </Tab.Navigator>
  );
}