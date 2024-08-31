import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions, Image, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Іконки з Expo
import { createClient } from '@supabase/supabase-js'; // Supabase

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Ініціалізація Supabase
const supabaseUrl = 'https://afqwgphwdfkrjohuxngq.supabase.co'; // Заміни на свій Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcXdncGh3ZGZrcmpvaHV4bmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMTM4MzYsImV4cCI6MjA0MDY4OTgzNn0.pAeNMvpheuZtiUV5QOuHdl7gmhtVr3ASizPo-QPjnVM'; // Заміни на свій Supabase ключ
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

  // Завантаження даних з Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('book').select('name, author, genre, photo');

      if (error) {
        console.log('Error fetching books:', error);
      } else {
        setBooks(data);
      }
    };

    fetchBooks();
  }, []);

  const toggleMenu = () => {
    if (!menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Випадне меню */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Меню</Text>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeMenuButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.menuItems}>
          <View style={styles.menuItem}>
            <Ionicons name="time-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.menuItemText}>Трекер читання</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="bookmark-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.menuItemText}>Збережені</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.menuItemText}>Допомога</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.menuItemText}>Налаштування</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.menuItemText}>Вихід</Text>
          </View>
        </View>
      </Animated.View>

      {/* Список книжок */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.photo }} style={styles.bookImage} />
            <View style={styles.bookDetails}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.genre}>Жанр: {item.genre}</Text>
            </View>
          </View>
        )}
      />

      {/* Кнопка для відкриття меню */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// Інші вкладки
const RecsScreen = () => (
  <View style={styles.screen}>
    <Text>Recs Screen</Text>
  </View>
);

const ChatScreen = () => (
  <View style={styles.screen}>
    <Text>Chat Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

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
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/main_page/background.png')}
        style={styles.background}
      >
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.skipButtonText}>Пропуск</Text>
        </TouchableOpacity>
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
  bookItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#333',
  },
  genre: {
    fontSize: 14,
    color: '#555',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    backgroundColor: '#8B7D6B',
    borderRadius: 5,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.7,
    height: '100%',
    backgroundColor: '#A4826D',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeMenuButton: {
    backgroundColor: '#8B7D6B',
    padding: 5,
    borderRadius: 5,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default HomeScreen;
