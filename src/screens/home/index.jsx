// src/screens/home.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Menu</Text>
              <Image
                source={require('../../assets/menu.jpg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('AssortimentScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Assortiment</Text>
              <Image
                source={require('../../assets/assortiment.jpg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('SoupeScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Soupe</Text>
              <Image
                source={require('../../assets/soupe.jpg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('SaladeScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Salade</Text>
              <Image
                source={require('../../assets/salade.jpg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('PokeBowlScreen')} >
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Poke Bowl</Text>
              <Image
                source={require('../../assets/pokebowl.jpg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('NouillesScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Nouilles</Text>
              <Image
                source={require('../../assets/nouilles.jpeg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('DessertScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Desserts</Text>
              <Image
                source={require('../../assets/dessert.jpeg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('BoissonScreen')}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Boissons</Text>
              <Image
                source={require('../../assets/boisson.jpeg')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15, 
    paddingBottom: 20, 
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 15, 
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    width: '100%',
    height: 5,
    backgroundColor: '#ccc',
  },
});

export default HomeScreen;
