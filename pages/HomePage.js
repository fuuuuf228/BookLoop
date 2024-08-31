import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Використання іконок з Expo

const { width } = Dimensions.get('window'); // Визначення ширини екрану

const books = [
  { id: '1', title: '9 листопада', genre: 'Роман', location: 'Львів', price: 250 },
  { id: '2', title: 'Запасний', genre: 'Біографія', location: 'Черкаси', price: 250 },
  { id: '3', title: 'День, що навчив жити', genre: 'Психологія', location: 'Вінниця', price: 420 },
  { id: '4', title: 'Жага', genre: 'Фентезі', location: 'Львів', price: 250 },
  { id: '5', title: 'Опір', genre: 'Фентезі', location: 'Кропивницький', price: 190 },
  { id: '6', title: 'Сила інтровертів', genre: 'Психологія', location: 'Черкаси', price: 200 },
];

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current; // Початкове положення меню поза екраном

  const toggleMenu = () => {
    if (!menuVisible) {
      // Відкрити меню
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Закрити меню
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
      {/* Меню */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity onPress={toggleMenu} style={styles.closeMenuButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.menuItems}>
          <Text style={styles.menuItem}>Трекер читання</Text>
          <Text style={styles.menuItem}>Збережені</Text>
          <Text style={styles.menuItem}>Допомога</Text>
          <Text style={styles.menuItem}>Налаштування</Text>
          <Text style={styles.menuItem}>Вихід</Text>
        </View>
      </Animated.View>

      {/* Список книжок */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.genre}>Жанр: {item.genre}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.price}>{item.price}₴</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  bookItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genre: {
    fontSize: 14,
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  price: {
    fontSize: 14,
    color: '#333',
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
    backgroundColor: '#D3B299',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeMenuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  menuItems: {
    marginTop: 40,
  },
  menuItem: {
    paddingVertical: 15,
    fontSize: 18,
    color: '#333',
  },
});

export default HomePage;
