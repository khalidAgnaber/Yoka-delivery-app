import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import data from '../../data/resturentData.json';
import { COLORS } from '../../constants/theme';

const RestaurentDetails = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
        navigation.navigate('Cart', { cartItems: [...cartItems, item] });
    };

    return(
        
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.name}>{data.name}</Text>
            </View>
            <View style={styles.line} />
            <Text style={styles.description}>{data.description}</Text>
            <View style={styles.line} />
            <Text style={styles.name}>Price: {data.money}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(data)}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RestaurentDetails;
