// src/screens/assortiment/Assortiment.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Rating from '../../components/rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const assortmentItems = [
  {
    "category": "assortiment",
    "description": "6 maki saumon, 4 cream cheese, 4 rolls casher, 4 sushis saumon",
    "image_url": "https://www.manicook-traiteur.fr/wp-content/uploads/2020/05/sushi-maki.jpg",
    "is_closed": false,
    "money": "145 DH",
    "name": "California lovers",
    "rating": 5,
    "review_count": 2852
  },
  {
    "category": "assortiment",
    "description": "6 Rouleaux de printemps mixte, 4 Rolls du chef, 4 Sashimi saumon, 2 Sushi thon",
    "image_url": "https://usakor.com/qwhibachi-fairoaks-mall/wp-content/uploads/sites/14/2019/01/s_02.jpg",
    "is_closed": false,
    "money": "164 DH",
    "name": "Season roll",
    "rating": 4.5,
    "review_count": 1853
  },
  {
    "category": "assortiment",
    "description": "4 Crunchy, 4 Sushi pizza, 4 Fry Ebi Fry, 4 Rabat, 6 Aromaki Pami",
    "image_url": "https://api.allonaya.ma/assets/files/Media/3GtMiWFgu5zwm4CXL/image/WhatsApp%20Image%202023-12-09%20at%2019.33.17.jpg",
    "is_closed": false,
    "money": "179 DH",
    "name": "Hot Roll",
    "rating": 4,
    "review_count": 1557
  },
  {
    "category": "assortiment",
    "description": "2 Sushi crevettes, 4 Sashimi saumon, 4 Rolls du chef, 4 Rolls classic, 6 Rouleaux de printemps saumon",
    "image_url": "https://api.allonaya.ma/assets/files/Media/HRhMPzs5YHid8EvCA/medium/1592074083-1548333519-Yoka-Sushi-Hot-Roll.jpg",
    "is_closed": false,
    "money": "189 DH",
    "name": "Old school",
    "rating": 4.5,
    "review_count": 2952
  },
  {
    "category": "assortiment",
    "description": "4 Crunchy, 4 Arcs en ciel, 6 Rouleaux de printemps crevettes, 2 Sushi saumon, 4 Cream cheese, 4 Sashimi saumon",
    "image_url": "https://food.blk.ma/upload/1592074247-1548333549-Yoka-Sushi-Funky-Japs.jpg",
    "is_closed": false,
    "money": "199 DH",
    "name": "Yoka Royal",
    "rating": 3.5,
    "review_count": 1985
  },
  {
    "category": "assortiment",
    "description": "4 Sashimi saumon, 4 Cream cheese, 4 Rolls saumon épicé",
    "image_url": "https://api.allonaya.ma/assets/files/Media/4SivwBzoZP35iyf4K/large/CALIFORNIA%20LOVERS.jpg",
    "is_closed": false,
    "money": "99 DH",
    "name": "Yoka Slim",
    "rating": 4,
    "review_count": 1348
  },
  {
    "category": "assortiment",
    "description": "4 Rolls classic, 4 Dragon Roll, 4 Arc en ciel, 4 Cream cheese, 4 Fresh Roll, 4 Ebi Fry, 4 Boston Roll, 4 Shake Roll, 4 Rolls saumon",
    "image_url": "https://api.allonaya.ma/assets/files/Media/MrWvkxgFCNLcfDW9n/image/WhatsApp%20Image%202023-12-09%20at%2019.33.22.jpg",
    "is_closed": false,
    "money": "290 DH",
    "name": "Big Roll",
    "rating": 4,
    "review_count": 1296
  }
];

const Assortiment = ({ navigation, handleAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState(assortmentItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = assortmentItems.filter(item =>
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
  }
});

export default Assortiment;
