// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase, ref, get, set, push, child } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  databaseURL: ""
};

// Initialize Firebase (ensure that the app is initialized only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics if supported
isAnalyticsSupported().then(supported => {
  if (supported) {
    const analytics = getAnalytics(app);
    console.log('Analytics enabled');
  } else {
    console.log('Analytics not supported in this environment');
  }
}).catch(error => {
  console.error("Error initializing Firebase Analytics", error);
});

// Initialize Firebase Authentication with persistence
const firebase_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
console.log('Firebase Auth initialized');

// Initialize Firebase Realtime Database
const database = getDatabase(app);
console.log('Firebase Realtime Database initialized');

// Fetch user data by user ID
async function fetchUserData(userId) {
  const dbRef = ref(database, `users/${userId}`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log(`Fetched user data for user ${userId}:`, snapshot.val());
      return snapshot.val();
    } else {
      console.log(`No data available for user ${userId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching user data for user ${userId}:`, error);
    return null;
  }
}

// Update user data by user ID
async function updateUserData(userId, data) {
  const dbRef = ref(database, `users/${userId}`);
  try {
    await set(dbRef, data);
    console.log(`User data updated for user ${userId}`);
  } catch (error) {
    console.error(`Error updating user data for user ${userId}:`, error);
  }
}

// Save order history for the user
async function saveOrderHistory(userId, order) {
  const dbRef = ref(database, `orders/${userId}`);
  try {
    const newOrderRef = push(dbRef);
    await set(newOrderRef, order);
    console.log(`Order history saved for user ${userId}`);
  } catch (error) {
    console.error(`Error saving order history for user ${userId}:`, error);
  }
}

// Fetch all orders for a user
async function fetchOrderHistory(userId) {
  const dbRef = ref(database, `orders/${userId}`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log(`Fetched order history for user ${userId}:`, snapshot.val());
      return snapshot.val();
    } else {
      console.log(`No order history available for user ${userId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching order history for user ${userId}:`, error);
    return null;
  }
}

export { firebase_auth, database, fetchUserData, updateUserData, saveOrderHistory, fetchOrderHistory };
