import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { globalStyles } from '../styles/globalStyles';

export default function ListScreen() {
  const [rentals, setRentals] = useState([]);

  // Hook useEffect para buscar os dados assim que a tela for carregada.
  useEffect(() => {
    const fetchRentals = async () => {
      const querySnapshot = await getDocs(collection(db, 'rentals'));
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setRentals(data);
    };
    fetchRentals();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Histórico de Aluguéis</Text>
      
      <FlatList 
        data={rentals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold' }}>Carro: {item.carName}</Text>
            <Text>Cliente: {item.clientName}</Text>
            <Text>Valor: R$ {item.value}</Text>
            <Text>Data: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  }
});