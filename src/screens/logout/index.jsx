import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase_auth } from '../../../Database/firebase';

const LogoutScreen = ({ handleLogout }) => {
  const onLogoutPress = () => {
    handleLogout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogoutPress} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
