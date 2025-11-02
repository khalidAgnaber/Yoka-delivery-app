import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderDetailsScreen = ({ navigation, route }) => {
  const { order } = route.params;

  const renderItem = ({ item }) => {
    // Ensure that item.price is not undefined, providing a fallback value
    const itemPrice = parseFloat(item.money?.replace(' DH', '') || '0') * item.quantity;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemPrice}>Price: {itemPrice.toFixed(2)} DH</Text>
      </View>
    );
  };

  return order ? (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={COLORS.white} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.detail}>Order ID: {order.id}</Text>
      <Text style={styles.detail}>Total: {order.totalPrice}</Text>
      <Text style={styles.detail}>Date: {new Date(order.timestamp).toLocaleString()}</Text>
      <FlatList
        data={order.items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>No Order Details Available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start', // Ensures the button doesn't stretch across the row
    marginTop: 50,
    marginBottom: -20,
    
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
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
  detail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
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
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#777',
  },
});

export default OrderDetailsScreen;
