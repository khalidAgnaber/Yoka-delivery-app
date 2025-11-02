// src/screens/menu/Menu.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Rating from '../../components/rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const menuItems = [
  {
    "category": "menu",
    "description": "Salade de choux + 3 brochettes de blanc de poulet (Sasami avec riz nature et légumes sautés)",
    "image_url": "https://i.pinimg.com/564x/92/87/be/9287be27c40e8e33ad808ee8f89a14eb.jpg",
    "is_closed": false,
    "money": "59 DH",
    "name": "Kyoto",
    "rating": 4,
    "review_count": 1654
  },
  {
    "category": "menu",
    "description": "12 pièces de rolls + 3 brochettes de tsukune",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3KJ0XLkOKB92Ik7pbrTynOTPYrch6WGVa9Q&s",
    "is_closed": false,
    "money": "114 DH",
    "name": "Tokyo",
    "rating": 4.5,
    "review_count": 2491
  },
  {
    "category": "menu",
    "description": "Soupe miso + nouilles poulet",
    "image_url": "https://i.pinimg.com/564x/36/4b/6f/364b6ff730d2d6fd1148d24ea3dbeb22.jpg",
    "is_closed": false,
    "money": "69 DH",
    "name": "Osaka",
    "rating": 4,
    "review_count": 591
  },
  {
    "category": "menu",
    "description": "6 pièces de rolls + 4 pièces de sushi au saumon + brochettes de cuisses de poulet",
    "image_url": "https://rs-menus-api.roocdn.com/images/6e458f52-8302-42bb-b93b-5b9198d8ed5e/image.jpeg?width=1200&height=630&fit=cropv",
    "is_closed": false,
    "money": "114 DH",
    "name": "Nagoya",
    "rating": 4.5,
    "review_count": 5312
  },
  {
    "category": "menu",
    "description": "Tori salade + 3 brochettes boeuf au fromage + 1 café",
    "image_url": "https://s3.burpple.com/foods/3768eef6a5cd85349221476933_original.?1481712651",
    "is_closed": false,
    "money": "89 DH",
    "name": "Kobe",
    "rating": 3.5,
    "review_count": 1357
  },
];

const Menu = ({ navigation, handleAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = menuItems.filter(item =>
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
    marginBottom: 20,
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
      width: 0,
      height: 2,
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
  },
});

export default Menu;
