import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Rating from '../../components/rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const PokeBowlItems = [
  {
    "category": "pokebowl",
    "description": "Saumon, mangue, avocat, edamame, légumes croquants, tobiko red, sésame",
    "image_url": "https://norecipes.com/wp-content/uploads/2018/01/spicy-salmon-poke-007.jpg",
    "is_closed": false,
    "money": "85 DH",
    "name": "Poke salmon",
    "rating": 4,
    "review_count": 1842
  },
  {
    "category": "pokebowl",
    "description": "Bœuf snacké épicé, avocat, choux rouge, edamame, radis, légumes croquants, tempura d’oignons, sauce teriyaki",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zfwYJYY11cAbsz8CykTIDF8yAxo1csOz40lmZCn_1Q&s",
    "is_closed": false,
    "money": "80 DH",
    "name": "Poke beef",
    "rating": 4,
    "review_count": 1274
  },
  {
    "category": "pokebowl",
    "description": "Crevettes panées, mangue, avocat, légumes croquants, choux rouge, gingembre confit, noix de cajou, chili sauce",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6tSePVMNYKbRAuNMBKCVYr7IiJrHkK35Ig&s",
    "is_closed": false,
    "money": "80 DH",
    "name": "Poke crevette",
    "rating": 4.5,
    "review_count": 1384
  },
  {
    "category": "pokebowl",
    "description": "Poulet pané, mangue, avocat, légumes croquants, choux rouge, radis, cacahuètes, sauce okinawa",
    "image_url": "https://www.kikkoman.fr/fileadmin/_processed_/1/a/csm_110-recipe-page-Poke-Bowl-with-Crispy-Chicken_mobile_7938a2c4aa.webp",
    "is_closed": false,
    "money": "76 DH",
    "name": "Poke poulet crispy",
    "rating": 3.5,
    "review_count": 1129
  }
 

];

const PokeBowl = ({ navigation, handleAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState(PokeBowlItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = PokeBowlItems.filter(item =>
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

export default PokeBowl;



