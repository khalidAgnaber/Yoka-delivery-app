// src/screens/forgotPw/ForgotPwScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles'; // Make sure this path is correct to your styles
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebase_auth } from '../../../Database/firebase'; // Update this path to where your firebase.js is located

const ForgotPwScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (email.trim() === '') {
      Alert.alert('Input Error', 'Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(firebase_auth, email);
      Alert.alert('Check your email', 'A link to reset your password has been sent to your email address.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email address</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.textinput}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handlePasswordReset}>
        <View style={styles.button}>
          <Text style={styles.buttonTxt}>Send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPwScreen;
