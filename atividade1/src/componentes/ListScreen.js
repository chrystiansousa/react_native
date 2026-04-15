import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function ListScreen() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ordena do mais recente para o mais antigo usando o campo createdAt
    const q = query(collection(db, 'rentals'), orderBy('createdAt', 'desc'));

    // onSnapshot escuta o banco e atualiza a tela instantaneamente
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setRentals(data);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar aluguéis: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.carName}>{item.carName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.cardBody}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.clientName}>{item.clientName}</Text>
        </View>
        <View style={styles.valueBlock}>
          <Text style={styles.label}>Valor Pago</Text>
          <Text style={styles.value}>R$ {item.value}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Aluguéis</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />
      ) : rentals.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
      ) : (
        <FlatList 
          data={rentals}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde combinando com o botão do formulário
  },
  date: {
    fontSize: 14,
    color: '#777777',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginBottom: 10,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlock: {
    flex: 1,
  },
  valueBlock: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    color: '#999999',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 16,
    color: '#444444',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 30,
    fontSize: 16,
  }
});