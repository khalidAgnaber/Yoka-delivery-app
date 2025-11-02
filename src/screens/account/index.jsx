import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firebase_auth, fetchUserData, updateUserData } from '../../../Database/firebase';
import { COLORS } from '../../constants/theme';

const AccountScreen = ({ navigation }) => {
    const user = firebase_auth.currentUser;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUserData(user.uid).then((data) => {
                if (data) {
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setAddress(data.address || '');
                    setPhone(data.phone || '');
                }
            }).catch((error) => {
                console.error("Failed to fetch user data:", error);
            });
        }
    }, [user]);

    const handleSave = () => {
        if (user) {
            setLoading(true);
            updateUserData(user.uid, {
                firstName,
                lastName,
                address,
                phone
            }).then(() => {
                alert('Profile updated successfully!');
            }).catch((error) => {
                alert(`Failed to update profile: ${error.message}`);
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>My Account</Text>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                    placeholder="Enter your first name"
                    placeholderTextColor={COLORS.grey}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input}
                    placeholder="Enter your last name"
                    placeholderTextColor={COLORS.grey}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                    placeholder="Enter your address"
                    placeholderTextColor={COLORS.grey}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="phone-pad"
                />
            </View>
            <TouchableOpacity onPress={handleSave} disabled={loading} style={[styles.button, loading && styles.buttonDisabled]}>
                <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    contentContainer: {
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 20,
        marginTop: 25,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 8,
        padding: 10,
        color: COLORS.black,
        backgroundColor: COLORS.white,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: COLORS.grey,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AccountScreen;
