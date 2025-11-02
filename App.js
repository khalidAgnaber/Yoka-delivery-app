// App.js
import React, { useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SIZES, COLORS } from './src/constants/theme';
import Router from "./src/router/router";

const slides = [
  {
    id: 1,
    title: 'Your sushi is just a few taps away! Order now and enjoy fresh sushi delivered straight to you!',
    image: require('./src/assets/tof111.png'),
  },
  {
    id: 2,
    title: 'Fast, reliable, and ready to serve! Our delivery team is on the move to bring your favorite sushi right to your doorstep.',
    image: require('./src/assets/tof22.png'),
  },
  {
    id: 3,
    title: 'Explore the easiest way to order sushi! Tap into convenience with our app—where great food meets great technology.',
    image: require('./src/assets/tof33.png'),
  }
];

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  StatusBar.setBarStyle('light-content', true);

  const buttonLabel = (label) => (
    <View style={{ padding: 15 }}>
      <Text style={{ color: COLORS.title, fontWeight: '800', fontSize: SIZES.h4 }}>
        {label}
      </Text>
    </View>
  );

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleIncrementQuantity = (name) => {
    setCartItems((prevItems) =>
      prevItems.map(cartItem =>
        cartItem.name === name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const handleDecrementQuantity = (name) => {
    setCartItems((prevItems) =>
      prevItems
        .map(cartItem =>
          cartItem.name === name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
        .filter(cartItem => cartItem.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogout = () => {
    setShowHomePage(false);
  };

  const handleLogin = () => {
    setShowHomePage(true);
  };

  if (!showHomePage) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => (
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.bg,
            }}>
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 80,
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text style={{
                fontWeight: 'bold',
                color: COLORS.title,
                fontSize: SIZES.h4,
                textAlign: 'center',
                marginTop: 10,
                marginHorizontal: 50,
              }}>
                {item.title}
              </Text>
            </View>
          )}
          activeDotStyle={{
            backgroundColor: COLORS.primary,
            width: 20,
          }}
          showSkipButton
          renderNextButton={() => buttonLabel("Next")}
          renderSkipButton={() => buttonLabel("Skip")}
          renderDoneButton={() => buttonLabel("Done")}
          onDone={() => {
            setShowHomePage(true);
          }}
        />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Router
        screenProps={{
          cartItems,
          handleAddToCart,
          handleIncrementQuantity,
          handleDecrementQuantity,
          handleClearCart,
          handleLogout,
          handleLogin,
        }}
      />
    </GestureHandlerRootView>
  );
}
