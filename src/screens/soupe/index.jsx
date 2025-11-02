// src/screens/soupe/Soupe.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Rating from '../../components/rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const soupItems = [
  {
    "category": "soupe",
    "description": "Japanese miso soup with tofu and seaweed",
    "image_url": "https://www.wandercooks.com/wp-content/uploads/2020/06/japanese-miso-soup-recipe-ft.jpg",
    "is_closed": false,
    "money": "26 DH",
    "name": "Miso",
    "rating": 4,
    "review_count": 1239
  },
  {
    "category": "soupe",
    "description": "Tempura shrimp in broth",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-1kaiBfK5oMlCX9_QInREZWkFPbAqOk1rjqeel5NBA&s",
    "is_closed": false,
    "money": "40 DH",
    "name": "Tempura Crevettes",
    "rating": 4.5,
    "review_count": 1483
  },
  {
    "category": "soupe",
    "description": "Chicken soba noodles in broth",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-lu4EZmI7qQujeaHC52SXwnDFqT7r387Wsg&s",
    "is_closed": false,
    "money": "37 DH",
    "name": "Soba Udon Poulet",
    "rating": 5,
    "review_count": 2592
  },
  {
    "category": "soupe",
    "description": "Salmon soup",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxw47bqZuI2TQK3hiWQzqdlddoaviJaFyYtw&s",
    "is_closed": false,
    "money": "50 DH",
    "name": "Soupe Saumon",
    "rating": 4,
    "review_count": 1947
  },
  {
    "category": "soupe",
    "description": "Seafood soup",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9phg538gL6EIMoqR-8A6r0EyIzMO8A1Teyg&s",
    "is_closed": false,
    "money": "46 DH",
    "name": "Soupe Fruits de mer",
    "rating": 4.5,
    "review_count": 1242
  },
  {
    "category": "soupe",
    "description": "White fish, vermicelli, mushrooms",
    "image_url": "https://api.allonaya.ma/assets/files/Media/Ff2vD9snBRTBmfJ5N/image/sakana.jpg",
    "is_closed": false,
    "money": "46 DH",
    "name": "Soupe Sakana",
    "rating": 4,
    "review_count": 1852
  },
  {
    "category": "soupe",
    "description": "Tofu, shrimp, spicy broth",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhI16CyTcQw_rVNnv1YRa4f-geJ0qYmSdoHQ&s",
    "is_closed": false,
    "money": "50 DH",
    "name": "Soupe Ebi Tofu",
    "rating": 4,
    "review_count": 1483
  },
  {
    "category": "soupe",
    "description": "Royal soup",
    "image_url": "https://api.allonaya.ma/assets/files/Media/5dFPcHbSpYzyKCaYD/large/a360_recettes_visuel_188.jpg",
    "is_closed": false,
    "money": "60 DH",
    "name": "Soupe Royale",
    "rating": 4,
    "review_count": 1923
  },
  {
    "category": "soupe",
    "description": "Thai shrimp curry soup",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOBR1tM-pe6A2JP6-8dpwU0ib-7P9H50brg&s",
    "is_closed": false,
    "money": "50 DH",
    "name": "Soupe Thai crevettes curry rouge",
    "rating": 4,
    "review_count": 2584
  },
  {
    "category": "soupe",
    "description": "Thai coconut chicken soup",
    "image_url": "https://api.allonaya.ma/assets/files/Media/DoPwF8NzwoTByzvLK/image/soupe-thaie-au-poulet-a-la-mijoteuse-550x550.jpg",
    "is_closed": false,
    "money": "50 DH",
    "name": "Soupe Thai lait coco poulet",
    "rating": 4.5,
    "review_count": 1483
  }
];

const Soupe = ({ navigation, handleAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState(soupItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = soupItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMenuItems(filtered);
  };

  const addToCartAndNavigate = (item) => {
    handleAddToCart(item);
    navigation.navigate('Cart');
  };

  return (
    <ScrollView>
     <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={COLORS.white} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.grey} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="What are you craving"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.container}>
        {filteredMenuItems.map((menuItem, index) => (
          <View key={index} style={styles.menuItem}>
            <Image source={{ uri: menuItem.image_url }} style={styles.image} />
            <Text style={styles.name}>{menuItem.name}</Text>
            <Text style={styles.description}>{menuItem.description}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>{menuItem.money}</Text>
              <View style={styles.ratingContainer}>
                <Rating count={menuItem.rating} />
                <Text style={styles.reviewCount}>{`Reviews: ${menuItem.review_count}`}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => addToCartAndNavigate(menuItem)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
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
    marginLeft: 15,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.grey,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  menuItem: {
    width: 350,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0, height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  reviewCount: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Soupe;
