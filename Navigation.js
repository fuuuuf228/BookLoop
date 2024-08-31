// Navigation.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MainPage from './pages/main'; // Переконайтесь, що шлях до файлу правильний
import SignInPage from './pages/SignInPage'; // Екран для Sign In
import SignUpPage from './pages/SignUpPage'; // Екран для Sign Up
import HomePage from './pages/HomePage'; // Додано HomePage

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Налаштування кнопки повернення
const HeaderBackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
    <Image source={require('./assets/icons/back-arrow.png')} style={styles.backIcon} />
  </TouchableOpacity>
);

// Стек навігації для авторизаційних екранів
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainPage"
      component={MainPage}
      options={{ headerShown: false }} // Приховати заголовок на MainPage
    />
    <Stack.Screen
      name="SignInPage"
      component={SignInPage}
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="SignUpPage"
      component={SignUpPage}
      options={{ headerShown: false }} 
    />
    <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Налаштування нижніх вкладок для основних екранів
const MainTabs = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="SignInPage" component={SignInPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="HomePage" component={HomePage} />  {/* Додайте HomePage до Stack Navigator */}
    </Stack.Navigator>
  </NavigationContainer>
);

// Головний компонент навігації
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Home Screen</Text>
  </View>
);

const RecsScreen = () => (
  <View style={styles.screen}>
    <Text>Recs Screen</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.screen}>
    <Text>Notifications Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

export default App;
