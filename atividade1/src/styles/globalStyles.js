import { StyleSheet } from 'react-native';
//importo o meu tema para garantir a consistência do visual
import { theme } from './theme';

//aqui são definidos o sestilos globais. A ideia é reutilizar essas classes em várias telas para evitar repetição de código
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1, //faz a view ocupar a tela disponível
    padding: theme.spacing,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center', //centraliza no eixo vertical
    alignItems: 'center', //centraliza no eixo horizontal
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 22, //melhora a legibilidade dando espaço entre as linhas
    textAlign: 'center',
  },
});