import { View, Text } from 'react-native';
//importo a minha padronização visual
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
  return (
    //utilizo a classe 'centered' dos meus estilos globais para alinhar o conteúdo
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Bem-vindo ao Aplicativo!</Text>
      <Text style={globalStyles.text}>Utilize o menu lateral para navegar entre as seções.</Text>
    </View>
  );
}