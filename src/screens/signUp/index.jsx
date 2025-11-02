// src/screens/signUp/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { COLORS } from '../../constants/theme';
import { firebase_auth } from '../../../Database/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const SignUpScreen = ({ navigation, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVerificationVisible, setPasswordVerificationVisible] = useState(false);

  const handleSignUp = async () => {
    if (password !== passwordVerification) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(firebase_auth, email, password);
      sendEmailVerification(userCredential.user)
        .then(() => {
          Alert.alert('Verify your email', 'Please check your email and follow the instructions to verify your account.');
        })
        .catch((error) => {
          Alert.alert('Verification email failed', error.message);
        });

      console.log('User created:', userCredential.user);
      handleLogin(); // Call handleLogin to set authentication status
      navigation.replace('HomeStack'); // Navigate to the main app after registration
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Get started</Text>
            <Text style={styles.subtitle}>Sign up to continue</Text>
          </View>
          <View style={styles.dataContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.textinput}
                placeholderTextColor={COLORS.white}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.passwordToggle}
              >
                <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password verification"
                value={passwordVerification}
                onChangeText={setPasswordVerification}
                style={styles.textinput}
                placeholderTextColor={COLORS.white}
                secureTextEntry={!passwordVerificationVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVerificationVisible(!passwordVerificationVisible)}
                style={styles.passwordToggle}
              >
                <Icon name={passwordVerificationVisible ? 'eye' : 'eye-slash'} size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={handleSignUp}>
              <View style={styles.button1}>
                <Text style={styles.btnText}>SIGN UP</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.text}>Already have an account? | Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;
