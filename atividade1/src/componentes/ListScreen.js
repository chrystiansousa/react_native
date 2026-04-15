import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function ListScreen() {
  const [alugueis, setAlugueis] = useState([]);

  useEffect(() => {
    // Cria a referência para a coleção e ordena pelos mais recentes
    const q = query(collection(db, 'alugueis'), orderBy('dataRegistro', 'desc'));

    // onSnapshot escuta o banco de dados em tempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaTemp = [];
      querySnapshot.forEach((doc) => {
        listaTemp.push({ id: doc.id, ...doc.data() });
      });
      setAlugueis(listaTemp);
    }, (error) => {
      console.log("Erro ao buscar dados: ", error);
    });

    // Limpa o listener quando a tela for fechada
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.textoDestaque}>{item.marca} - {item.modelo}</Text>
      <Text>Período: {item.dias} dias</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {alugueis.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum aluguel registrado ainda.</Text>
      ) : (
        <FlatList 
          data={alugueis}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  textoDestaque: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }
});