// src/screens/signIn/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { COLORS } from '../../constants/theme';
import { firebase_auth } from '../../../Database/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ({ navigation, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
      console.log('Signed in user:', userCredential.user);

      handleLogin(); // Call handleLogin to set authentication status
    } catch (error) {
      Alert.alert('Login Error', error.message);
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
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>
          <View style={styles.dataContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.textinput}
                placeholderTextColor={COLORS.white}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={handleSignIn}>
              <View style={styles.button1}>
                <Text style={styles.btnText}>SIGN IN</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.text}>Don't have an account? | Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPw')}>
              <Text style={styles.text}>Forgot password? | Click here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};


export default SignInScreen;
