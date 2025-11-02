import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { firebase_auth, fetchOrderHistory } from '../../../Database/firebase';

const OrderHistoryScreen = ({ navigation }) => {
  const user = firebase_auth.currentUser;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrderHistory(user.uid).then((data) => {
        if (data) {
          const ordersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
          setOrders(ordersArray);
        }
      }).catch((error) => {
        console.error("Error fetching order history:", error);
      });
    }
  }, [user]);

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => navigation.navigate('OrderDetails', { order: item })}
    >
      <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
      <Text style={styles.orderDetails}>Total: {item.totalPrice}</Text>
      <Text style={styles.orderDetails}>Date: {new Date(item.timestamp).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.bg,
  },
  title: {
    marginTop: 30,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderTitle: {

    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDetails: {
    fontSize: 16,
    color: '#777',
  },
});

export default OrderHistoryScreen;
