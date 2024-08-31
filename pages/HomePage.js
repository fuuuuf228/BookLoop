// pages/HomePage.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Екрани для вкладок
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

// Налаштування нижніх вкладок для основних екранів
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#95897D' },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#d1d1d1',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Recs" component={RecsScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Головна сторінка HomePage з вкладками і кнопкою пропуску
const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/main_page/background.png')}
        style={styles.background}
      >
        {/* Кнопка "Пропуск" */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.skipButtonText}>пропуск</Text>
        </TouchableOpacity>
        {/* Вкладки */}
        <MainTabs />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HomePage;
