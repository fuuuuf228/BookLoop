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

// Основні вкладки
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: '#95897D' },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#d1d1d1',
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Recs') {
          iconName = 'book-outline';
        } else if (route.name === 'Chat') {
          iconName = 'chatbubble-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Recs" component={RecsScreen} />
    <Tab.Screen name="Chat" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
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
