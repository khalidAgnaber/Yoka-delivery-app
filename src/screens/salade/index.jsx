// src/screens/salade/Salade.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Rating from '../../components/rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const saladItems = [
  {
    "category": "salade",
    "description": "Carotte ou concombre",
    "image_url": "https://i0.wp.com/leculdepoule.co/wp-content/uploads/2020/06/salade-de-wakame-le-cul-de-poule.jpg?fit=1719%2C2197&ssl=1",
    "is_closed": false,
    "money": "30 DH",
    "name": "Salade Wakame",
    "rating": 4,
    "review_count": 1843
  },
  {
    "category": "salade",
    "description": "Bouillon de nouilles",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw2ygWopwFm7jr-RbK_rEiShw3CfQBRkfy8Q&s",
    "is_closed": false,
    "money": "20 DH",
    "name": "Salade de choux",
    "rating": 4.5,
    "review_count": 1284
  },
  {
    "category": "salade",
    "description": "",
    "image_url": "https://api.allonaya.ma/assets/files/Media/SZN5GSDSjFddf5gZw/image/chouk%20soumon.jpg",
    "is_closed": false,
    "money": "45 DH",
    "name": "Salade de choux au saumon",
    "rating": 4,
    "review_count": 1953
  },
  {
    "category": "salade",
    "description": "",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsv1rkwtVS84Eac2EY5JADrW8s7kK_bnTnvA&s",
    "is_closed": false,
    "money": "40 DH",
    "name": "Salade de choux au crevettes",
    "rating": 4.5,
    "review_count": 2414
  },
  {
    "category": "salade",
    "description": "",
    "image_url": "https://api.allonaya.ma/assets/files/Media/Hack6yyfXhoy9BvZ8/image/1592074669-1548343953-Yoka-Sushi-Salade-Choux-Crevettes.jpg",
    "is_closed": false,
    "money": "40 DH",
    "name": "Umi salade fruits de mer",
    "rating": 5,
    "review_count": 1843
  },
  {
    "category": "salade",
    "description": "Crevettes, poulet, crudités",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD-2R8p5Hlo3txpOcVVQaj37eE4LHdz4CaZX5Plnj4EA&s",
    "is_closed": false,
    "money": "40 DH",
    "name": "Yoka Salade",
    "rating": 4.5,
    "review_count": 1943
  },
  {
    "category": "salade",
    "description": "",
    "image_url": "https://norecipes.com/wp-content/uploads/2018/09/seaweed-salad-recipe-003.jpg",
    "is_closed": false,
    "money": "60 DH",
    "name": "Sea Salade",
    "rating": 3.5,
    "review_count": 1483
  },
  {
    "category": "salade",
    "description": "",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuw7gLdv9etLsLcDM_C6RY8T-B7tpS9BD_AGzAyVGlzA&s",
    "is_closed": false,
    "money": "55 DH",
    "name": "Salade saumon avocat",
    "rating": 4,
    "review_count": 1294
  },
  {
    "category": "salade",
    "description": "",
    "image_url": "https://www.cookomix.com/wp-content/uploads/2021/07/salade-thai-boeuf-thermomix-800x600.jpg",
    "is_closed": false,
    "money": "60 DH",
    "name": "Salade de boeuf thai",
    "rating": 4,
    "review_count": 1482
  }
];

const Salade = ({ navigation, handleAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState(saladItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = saladItems.filter(item =>
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

export default Salade;
