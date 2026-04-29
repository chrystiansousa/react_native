import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { listData } from '../../utils/data';

export default function FlatListScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Exemplo de FlatList</Text>
      
      {/*optei pela flatList neste cenário pois ela é muito mais eficiente que o scrollView comum para listas longas. Ela economiza memória renderizando apenas o que está visível para o usuário*/}
      <FlatList
        //data: passo o array de objetos que criei no arquivo utils/data.js
        data={listData}
        
        //keyExtractor: informo ao React qual propriedade é o identificador único (ID)
        keyExtractor={(item) => item.id}
        
        /*renderItem: função que desenha cada linha da lista. Uso a desestruturação ({ item }) para acessar as propriedades do objeto diretamente. Isso evita o erro de tentar renderizar o objeto inteiro como se fosse um componente*/
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#0056b3', //faço um detalhe visual com a cor primária do tema
    elevation: 3, //adiciono uma sombra leve para destacar o item do fundo
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  }
});