# Yoka Delivery App 🍣

A modern React Native mobile application for ordering sushi and Japanese cuisine with delivery service. Built with Expo, featuring user authentication, shopping cart functionality, and order history tracking.

## 📱 Project Overview

Yoka Delivery App is a full-featured food delivery application specializing in Japanese cuisine, particularly sushi. The app provides users with an intuitive interface to browse menus, add items to cart, place orders, and track their order history.

## ✨ Features

- **User Authentication**: Sign up, sign in, and password recovery using Firebase Authentication
- **Onboarding Experience**: Interactive intro slider for first-time users
- **Menu Browsing**: Browse through various food categories:
  - Menu (Sushi sets)
  - Assortiment (Assorted items)
  - Soupe (Soups)
  - Salade (Salads)
  - Poke Bowl
  - Nouilles (Noodles)
  - Desserts
  - Boissons (Beverages)
- **Shopping Cart**: Add items, adjust quantities, and manage cart items
- **Checkout & Order Confirmation**: Complete order placement flow
- **Order History**: View past orders and order details
- **Restaurant Details**: Browse restaurant information and ratings
- **Account Management**: User profile and account settings
- **Beautiful UI**: Modern, responsive design with custom theming

## 🛠 Technology Stack

### Core Technologies
- **React Native** ^0.74.1 - Mobile app framework
- **Expo** ^51.0.1 - Development platform and tooling
- **React** 18.2.0 - UI library

### Navigation
- **@react-navigation/native** ^6.1.17 - Navigation library
- **@react-navigation/native-stack** ^6.9.26 - Stack navigator
- **@react-navigation/bottom-tabs** ^6.5.20 - Tab navigator
- **@react-navigation/stack** ^6.3.29 - Stack navigator (legacy)

### Backend & Database
- **Firebase** ^10.11.1 - Authentication and Realtime Database
- **@react-native-async-storage/async-storage** ^1.23.1 - Local data persistence

### UI & Styling
- **react-native-vector-icons** ^10.1.0 - Icon library (MaterialCommunityIcons)
- **react-native-gesture-handler** ~2.16.1 - Gesture handling
- **react-native-reanimated** ^3.11.0 - Animations
- **react-native-safe-area-context** ^4.10.1 - Safe area handling
- **react-native-screens** ^3.31.1 - Native screen optimization
- **react-native-app-intro-slider** ^4.0.4 - Onboarding slider

### Development Tools
- **@babel/core** ^7.20.0 - JavaScript compiler
- **babel-preset-expo** - Expo Babel preset

## 📁 Project Structure

```
YokaDeliveryApp/
├── App.js                          # Main app entry point with onboarding
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
├── package.json                    # Dependencies and scripts
│
├── Database/
│   └── firebase.js                 # Firebase initialization and utilities
│
├── assets/                         # App icons and splash screens
│   ├── icon.png
│   ├── splash.png
│   └── ...
│
└── src/
    ├── assets/                     # Image assets
    │   ├── logo.png
    │   ├── background.jpeg
    │   ├── menu.jpg
    │   └── ...
    │
    ├── components/                 # Reusable components
    │   ├── rating/                 # Rating component
    │   └── restaurent/             # Restaurant card component
    │
    ├── constants/
    │   └── theme.jsx               # Color scheme and sizing constants
    │
    ├── context/
    │   └── CartContext.js          # Shopping cart context (future implementation)
    │
    ├── data/
    │   ├── data.json               # Food items data
    │   └── resturentData.json      # Restaurant data
    │
    ├── router/
    │   └── router.jsx              # Navigation configuration
    │
    └── screens/                    # App screens
        ├── account/                # User account screen
        ├── assortiment/            # Assorted items menu
        ├── boisson/                # Beverages menu
        ├── cart/                   # Shopping cart
        ├── checkout/               # Checkout screen
        ├── confirmOrder/           # Order confirmation
        ├── dessert/                # Desserts menu
        ├── forgotPw/               # Password recovery
        ├── history/                # Order history
        │   ├── OrderHistoryScreen.js
        │   └── OrderDetailsScreen.js
        ├── home/                   # Home screen with menu categories
        ├── logout/                 # Logout screen
        ├── menu/                   # Main menu
        ├── nouilles/               # Noodles menu
        ├── pokeBowl/               # Poke bowl menu
        ├── restaurent/             # Restaurant details
        ├── salade/                 # Salads menu
        ├── signIn/                 # Sign in screen
        ├── signUp/                 # Sign up screen
        └── soupe/                  # Soups menu
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, can use npx)
- iOS Simulator (for Mac) or Android Emulator, or Expo Go app on your phone

### Installation Steps

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd /Users/mac/Desktop/YokaDeliveryApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Configuration**

   The app uses Firebase for authentication and database. The Firebase configuration is already set up in `Database/firebase.js`. If you need to use your own Firebase project:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Realtime Database
   - Update the `firebaseConfig` object in `Database/firebase.js` with your credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       databaseURL: "YOUR_DATABASE_URL"
     };
     ```

## 🏃 Running the App

### Start the Development Server

```bash
npm start
# or
yarn start
```

This will start the Expo development server. You'll see:
- A QR code in your terminal
- Options to run on different platforms

### Running on Different Platforms

Once the development server is running, you can:

- **iOS Simulator**: Press `i` in the terminal or run `npm run ios`
- **Android Emulator**: Press `a` in the terminal or run `npm run android`
- **Web Browser**: Press `w` in the terminal or run `npm run web`
- **Physical Device**: Scan the QR code with Expo Go app (iOS) or Expo Go app (Android)

### Available Scripts

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
```

## 🧭 Navigation Structure

The app uses React Navigation with the following structure:

### Authentication Flow
- **Sign In** → Sign in with email/password
- **Sign Up** → Create new account
- **Forgot Password** → Password recovery

### Main App (After Authentication)
- **Bottom Tab Navigator** with 5 tabs:
  1. **History** - View order history
  2. **Cart** - Shopping cart with item management
  3. **Home** - Main home screen with menu categories
  4. **Account** - User account information
  5. **Logout** - Logout functionality

### Stack Screens (within Home tab)
- Home Screen (Menu Categories)
- Menu Screen (Sushi sets)
- Assortiment Screen
- Soupe Screen
- Salade Screen
- PokeBowl Screen
- Nouilles Screen
- Dessert Screen
- Boisson Screen
- Restaurant Details
- Checkout Screen
- Confirm Order Screen
- Order Details Screen

## 🎨 Theme & Styling

The app uses a centralized theme configuration located in `src/constants/theme.jsx`:

### Colors
- Primary: `#F60018` (Red)
- Secondary: `#343a40` (Dark gray)
- Title: `#072F4A` (Dark blue)
- Background: `#DDCEC5` (Light beige)
- Additional colors for UI elements

### Typography
- Heading sizes (h1-h6) ranging from 12px to 22px
- Responsive sizing based on screen dimensions

## 🔥 Firebase Features

The app integrates Firebase for:

### Authentication
- Email/password authentication
- User session persistence with AsyncStorage
- Password recovery functionality

### Realtime Database
- User data storage (`users/{userId}`)
- Order history (`orders/{userId}`)
- Functions available:
  - `fetchUserData(userId)` - Get user information
  - `updateUserData(userId, data)` - Update user profile
  - `saveOrderHistory(userId, order)` - Save completed orders
  - `fetchOrderHistory(userId)` - Retrieve past orders

## 📱 Key Features Explained

### Shopping Cart
- Add items from any menu screen
- Increment/decrement item quantities
- Remove items from cart
- Persistent cart state during session

### Order Management
- Complete checkout flow
- Order confirmation screen
- View detailed order history
- Track past order details

### Restaurant Information
- Browse restaurant details
- View ratings and reviews
- Check restaurant availability

### Onboarding
- First-time user intro slider
- Skip and navigation options
- Smooth transitions to main app

## 🗄 Data Structure

The app uses JSON files for menu data:
- `src/data/data.json` - Contains food items with categories, prices, ratings
- `src/data/resturentData.json` - Restaurant information

Example item structure:
```json
{
  "category": "menu",
  "name": "Kyoto",
  "description": "Salade de choux + 3 brochettes...",
  "money": "59 DH",
  "rating": 4,
  "review_count": 1654,
  "image_url": "...",
  "is_closed": false
}
```

## ⚠️ Known Issues & Notes

- Some package versions may show compatibility warnings but should not affect functionality
- Recommended package updates (as shown in Expo):
  - `expo@~51.0.39`
  - `react-native@0.74.5`
  - `react-native-reanimated@~3.10.1`
  - `react-native-safe-area-context@4.10.5`

## 🔧 Development Notes

### State Management
- Cart state is managed in `App.js` and passed via props
- Future: Consider migrating to Context API (CartContext already created)

### Navigation
- Uses React Navigation v6
- Nested navigators (Stack inside Tab Navigator)
- Screen props pattern for passing functions and data

### Platform Support
- iOS
- Android
- Web (limited functionality)

## 📝 License

This project is private and proprietary.

## 👨‍💻 Development

Built with React Native and Expo for cross-platform mobile development.

---

**Note**: Make sure to configure Firebase credentials before deploying to production. Keep sensitive keys secure and never commit them to version control.

