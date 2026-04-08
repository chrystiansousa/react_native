import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function ScrollViewScreen() {
  return (
    //diferente das outras listas, o scrollView renderiza todos os itens de uma vez, ele é recomendado apenas para telas com pouco conteúdo e não para listas dinâmicas grandes, pois pode consumir muita memória
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Exemplo de ScrollView</Text>
      
      <Text style={[globalStyles.text, { marginBottom: 20 }]}>
        Role a tela para baixo para ver todo o conteúdo.
      </Text>

      {/*gerando blocos genéricos de visualização apenas para forçar a rolagem da tela*/}
      {Array.from({ length: 15 }).map((_, i) => (
        <View key={i} style={styles.scrollBlock}>
          <Text style={styles.blockText}>Bloco de conteúdo estático {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBlock: {
    padding: 30,
    backgroundColor: '#e9ecef',
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  blockText: {
    color: '#495057',
    fontWeight: 'bold',
  }
});