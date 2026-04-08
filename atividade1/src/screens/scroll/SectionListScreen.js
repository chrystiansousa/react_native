import { SectionList, Text, View, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
//importo os dados estruturados em seções que preparei no arquivo data.js
import { sectionData } from '../../utils/data';
import { theme } from '../../styles/theme';

export default function SectionListScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Minha SectionList</Text>
      
      {/*s sectionList é ideal quando precisamos agrupar dados em categorias (como uma lista de contatos), ela requer propriedades diferentes da flatList*/}
      <SectionList
        //passando os dados agrupados
        sections={sectionData}
        
        //crio uma chave única combinando o nome do item e o índice
        keyExtractor={(item, index) => item + index}
        
        //renderItem desenha os itens individuais dentro de cada seção, novamente, uso a desestruturação ({ item }) para não renderizar o objeto inteiro
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        
        //renderSectionHeader é específico da sectionList e desenha o título de cada grupo
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
}

//estilos locais apenas para a renderização desta lista
const styles = StyleSheet.create({
  itemRow: {
    padding: 15,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  headerRow: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: theme.colors.white,
    fontSize: 18,
  }
});