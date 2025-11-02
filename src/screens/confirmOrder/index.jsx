// src/screens/confirmOrder.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../constants/theme';
import { firebase_auth, fetchUserData, saveOrderHistory } from '../../../Database/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConfirmOrderScreen = ({ navigation, route, handleClearCart }) => {
  const user = firebase_auth.currentUser;
  const { cartItems } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid).then((data) => {
        if (data) {
          setPhoneNumber(data.phone || '');
          setAddress(data.address || '');
        }
      }).catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
    }
  }, [user]);

  const handleConfirmOrder = () => {
    const phoneNumberPattern = /^\d{10,}$/;

    if (!phoneNumberPattern.test(phoneNumber)) {
      setError('Invalid Phone number');
      return;
    }

    if (address.trim() === '') {
      Alert.alert('Missing Information', 'Please enter your address.');
    } else {
      const order = {
        items: cartItems,
        phoneNumber,
        address,
        timestamp: new Date().toISOString(),
        totalPrice: cartItems.reduce((total, item) => total + parseFloat(item.money.replace(' DH', '')) * item.quantity, 0).toFixed(2) + " DH"
      };

      saveOrderHistory(user.uid, order).then(() => {
        Alert.alert(
          'Order Confirmed',
          `Your order has been confirmed!\nPhone Number: ${phoneNumber}\nAddress: ${address}`,
          [{
            text: 'OK',
            onPress: () => {
              handleClearCart();
              navigation.navigate('Home');
            }
          }]
        );
        setError('');
      }).catch((error) => {
        console.error('Error saving order history:', error);
      });
    }
  };

  return (
    
    <View style={styles.container}>
     <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={COLORS.white} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Confirm Your Order</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          keyboardType="numeric"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            setError('');
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
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
    marginTop: -100,
    marginBottom: 200,
  
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmOrderScreen;
