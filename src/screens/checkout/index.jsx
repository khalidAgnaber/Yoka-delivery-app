// src/screens/checkout/CheckoutScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const CheckoutScreen = ({ route, navigation }) => {
  const { items } = route.params;
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [hasAppliedDiscount, setHasAppliedDiscount] = useState(false);
  const deliveryFee = 10;

  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'FALAH10' && !hasAppliedDiscount) {
      setDiscount(0.1);
      setHasAppliedDiscount(true);
      Alert.alert('Discount Applied', 'You have received a 10% discount!');
    } else if (hasAppliedDiscount) {
      Alert.alert('Already Applied', 'You have already applied the discount code.');
    } else {
      Alert.alert('Invalid Code', 'The discount code you entered is invalid.');
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.money.replace(' DH', ''));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subTotal = parseFloat(calculateSubtotal());
    const discountedSubtotal = subTotal - subTotal * discount;
    return (discountedSubtotal + deliveryFee).toFixed(2);
  };

  const proceedToConfirm = () => {
    navigation.navigate('ConfirmOrderScreen', { cartItems: items });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemPrice}>Subtotal: {(parseFloat(item.money.replace(' DH', '')) * item.quantity).toFixed(2)} DH</Text>
      </View>
    </View>
  );

  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={COLORS.white} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          style={styles.cartList}
          contentContainerStyle={styles.cartListContainer}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.discountContainer}>
          <TextInput
            style={styles.discountInput}
            placeholder="Enter Discount Code"
            value={discountCode}
            onChangeText={setDiscountCode}
          />
          <TouchableOpacity style={styles.discountButton} onPress={applyDiscount}>
            <Text style={styles.discountButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Delivery Fee: {deliveryFee} DH</Text>
          <Text style={styles.totalText}>Total: {calculateTotal()} DH</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={proceedToConfirm}>
            <Text style={styles.checkoutButtonText}>Proceed to Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: -40,
  
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.primary,
    marginTop: 10,
  },
  cartList: {
    flex: 1,
    width: '100%',
  },
  cartListContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
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
    marginBottom: 10,
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  discountInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginRight: 10,
  },
  discountButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  discountButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    width: '100%',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
