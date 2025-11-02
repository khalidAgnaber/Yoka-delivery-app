// src/router/router.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { COLORS } from '../constants/theme';

import SignInScreen from '../screens/signIn';
import SignUpScreen from '../screens/signUp';
import ForgotPwScreen from '../screens/forgotPw';
import HomeScreen from '../screens/home';
import LogoutScreen from '../screens/logout';
import CartScreen from '../screens/cart';
import Menu from '../screens/menu';
import Dessert from '../screens/dessert';
import Assortiment from '../screens/assortiment';
import Nouilles from '../screens/nouilles';
import Soupe from '../screens/soupe';
import Salade from '../screens/salade';
import PokeBowl from '../screens/pokeBowl';
import Boisson from '../screens/boisson';
import CheckoutScreen from '../screens/checkout';
import ConfirmOrderScreen from '../screens/confirmOrder';
import AccountScreen from '../screens/account';
import OrderHistoryScreen from '../screens/history/OrderHistoryScreen';
import OrderDetailsScreen from '../screens/history/OrderDetailsScreen';
import RestaurentDetails from '../screens/restaurent';

// Authentication Stack
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = (props) => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn">
      {(screenProps) => (
        <SignInScreen
          {...screenProps}
          handleLogin={props.handleLogin}
        />
      )}
    </AuthStack.Screen>
    <AuthStack.Screen name="SignUp">
      {(screenProps) => (
        <SignUpScreen
          {...screenProps}
          handleLogin={props.handleLogin}
        />
      )}
    </AuthStack.Screen>
    <AuthStack.Screen name="ForgotPw" component={ForgotPwScreen} />
  </AuthStack.Navigator>
);

// Home Navigator
const HomeNavigator = (props) => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
    />
    <HomeStack.Screen name="MenuScreen">
      {(screenProps) => (
        <Menu
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="AssortimentScreen">
      {(screenProps) => (
        <Assortiment
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="PokeBowlScreen">
      {(screenProps) => (
        <PokeBowl
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="SoupeScreen">
      {(screenProps) => (
        <Soupe
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="SaladeScreen">
      {(screenProps) => (
        <Salade
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="NouillesScreen">
      {(screenProps) => (
        <Nouilles
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="DessertScreen">
      {(screenProps) => (
        <Dessert
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="BoissonScreen">
      {(screenProps) => (
        <Boisson
          {...screenProps}
          handleAddToCart={props.screenProps.handleAddToCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="RestaurentDetails" component={RestaurentDetails} />
    <HomeStack.Screen name="CheckoutScreen">
      {(screenProps) => (
        <CheckoutScreen
          {...screenProps}
          route={{ params: { items: props.screenProps.cartItems } }}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="ConfirmOrderScreen">
      {(screenProps) => (
        <ConfirmOrderScreen
          {...screenProps}
          route={{ params: { cartItems: props.screenProps.cartItems } }}
          handleClearCart={props.screenProps.handleClearCart}
        />
      )}
    </HomeStack.Screen>
    <HomeStack.Screen name="OrderDetails" component={OrderDetailsScreen} />
  </HomeStack.Navigator>
);

// Tab Navigator
const TabNavigator = (props) => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false, // Hide the labels at the top for all tab screens
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.grey,
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarStyle: { paddingTop: 5 },
    }}
  >
      <Tab.Screen
      name="History"
      component={OrderHistoryScreen}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color, size }) => <Icon name="history" size={size} color={color} />,
      }}
    />

    <Tab.Screen
      name="Cart"
      children={() => (
        <CartScreen
          items={props.screenProps.cartItems}
          handleIncrement={props.screenProps.handleIncrementQuantity}
          handleDecrement={props.screenProps.handleDecrementQuantity}
        />
      )}
      options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => <Icon name="cart" size={size} color={color} />,
      }}
    />
       <Tab.Screen
      name="Home"
      children={() => <HomeNavigator screenProps={props.screenProps} />}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
      }}
    />

    <Tab.Screen
      name="Logout"
      children={() => <LogoutScreen handleLogout={props.screenProps.handleLogout} />}
      options={{
        tabBarLabel: 'Logout',
        tabBarIcon: ({ color, size }) => <Icon name="logout" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

// Main Application Navigator
const Router = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <TabNavigator
          screenProps={{
            ...props.screenProps,
            handleLogout,
            handleLogin,
          }}
        />
      ) : (
        <AuthNavigator handleLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default Router;
