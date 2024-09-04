import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions, Image, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icons from Expo
import { createClient } from '@supabase/supabase-js'; // Supabase
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for Supabase
import { useNavigation } from '@react-navigation/native'; // Імпортувати хук для навігації

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Supabase Initialization
const supabaseUrl = 'https://afqwgphwdfkrjohuxngq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcXdncGh3ZGZrcmpvaHV4bmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMTM4MzYsImV4cCI6MjA0MDY4OTgzNn0.pAeNMvpheuZtiUV5QOuHdl7gmhtVr3ASizPo-QPjnVM';
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return title;
  };

// AnnouncementCard Component
const AnnouncementCard = ({ name, author, genre, geolocation, imageUrl, type, price }) => { // Accept price as a prop
  const [isSaved, setIsSaved] = useState(false); // Доданий стан для кнопки збереження

  const handleSavePress = () => {
    setIsSaved(!isSaved);
  };
    // Логіка для вибору іконки залежно від типу
  const typeIcon = type === 'Обмін' ? require('../assets/icons/Change.png') : require('../assets/icons/buy.png');

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{truncateTitle(name)}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.genre}>Жанр: {genre}</Text>

        {/* Доданий значок та геолокація */}
        <View style={styles.geolocationContainer}>
          <Image source={require('../assets/icons/Location.png')} style={styles.geolocationIcon} />
          <Text style={styles.geolocationText}>{geolocation}</Text>
        </View>

        {/* Display price if available */}
        {price && <Text style={styles.price}>{price}</Text>}
      </View>

      {/* Change/Buy Icon - Неклікабельна */}
      <View style={styles.iconButton}>
        <Image source={typeIcon} style={styles.iconImage} />
      </View>

      {/* Save Icon */}
      <TouchableOpacity style={styles.bookmarkButton} onPress={handleSavePress}>
        <Image source={isSaved ? require('../assets/icons/SavePress.png') : require('../assets/icons/Save.png')} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );
};

// HomeScreen Component
const HomeScreen = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;
    const navigation = useNavigation(); // Використання хука для навігації

// Перехід на AdvertPage
const goToAdvertPage = () => {
    navigation.navigate('AdvertPage');
  };

// Update fetchAnnouncements function
useEffect(() => {
  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcement')
      .select(`
        geolocation,
        type,
        price,
        book:book_id (
          name,
          author,
          genre,
          photo
        )
      `);


    if (error) {
      console.error('Error fetching announcements:', error);
    } else {
      // Обробка даних для створення нового масиву з інформацією про книгу
      const announcementsWithBookData = data.map(item => ({
        name: item.book?.name || 'Невідомо',
        author: item.book?.author || 'Невідомо',
        genre: item.book?.genre || 'Невідомо',
        photo: item.book?.photo || 'Немає фото',
        geolocation: item.geolocation || 'Немає даних',
        type: item.type || 'Продаж', // Додаємо type, за замовчуванням 'Продаж'
        price: item.price > 0 ? `${item.price}₴` : null, // Включаємо ціну, якщо вона більше 0
      }));

      setAnnouncements(announcementsWithBookData);
    }
  };

  fetchAnnouncements();
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

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Sliding Menu */}
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

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Image source={require('../assets/icons/Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук книжок..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      {/* Announcements List */}
<FlatList
  data={filteredAnnouncements}
  keyExtractor={(item) => item.name}
  renderItem={({ item }) => {
    return (
      <AnnouncementCard
        name={item.name}
        author={item.author}
        genre={item.genre}
        geolocation={item.geolocation}
        imageUrl={item.photo}
        type={item.type} // Передаємо тип оголошення
        price={item.price} // Pass price to AnnouncementCard
      />
    );
  }}
/>

      {/* Button to Open Menu */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Image source={require('../assets/icons/Burger.png')} style={styles.menuIcon} />
      </TouchableOpacity>


      {/* Button to AdvertPage */}
      <TouchableOpacity onPress={goToAdvertPage} style={styles.advertButton}>
        <Image source={require('../assets/icons/Add.png')} style={styles.advertIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Other Tabs
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

const App = () => {
  return (
    <MainTabs />
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'row',
      borderRadius: 16,
      padding: 10,
      marginBottom: 20,
      marginHorizontal: 16,
      alignItems: 'center',
      borderColor: '#C0B0A5',  
      borderWidth: 1,
      elevation: 1,            // Тінь для Android
      shadowColor: '#000',     // Колір тіні для iOS
      shadowOffset: { width: 0, height: 1 }, // Зсув тіні для iOS
      shadowOpacity: 0.1,      // Прозорість тіні для iOS
      shadowRadius: 2,         // Радіус тіні для iOS
      position: 'relative',    // Позиціонування для внутрішніх елементів
    },
    bookmarkButton: {
      position: 'absolute',
      top: 10,
      right: 20,
      padding: 5,
    },
    iconButton: {
      position: 'absolute',
      top: 10,
      right: 60,
      padding: 5,
    },
    changeButton: {
      position: 'absolute',
      top: 10,
      right: 60,
      padding: 5,
    }, // Доданий стиль для кнопки обміну
    iconImage: {
      width: 25,
      height: 25,
    },
    image: {
      width: 50,
      height: 75,
      borderRadius: 4,
      marginRight: 10,
    },
    details: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      flexShrink: 1,          // Запобігає розтягуванню елемента
    },
    author: {
      fontSize: 14,
      color: '#555',
    },
    genre: {
      fontSize: 12, // Розмір шрифту
      color: '#34302C', 
      backgroundColor: '#C5B6A7', // Коричневий фон
      paddingVertical: 4, // Вертикальні відступи
      paddingHorizontal: 6, // Зменшені горизонтальні відступи
      borderRadius: 13, // Заокруглення кутів
      borderColor: '#DEDAD7', 
      borderWidth: 1,  
      marginTop: 4, // Верхній відступ
      alignSelf: 'flex-start', // Фон адаптується до ширини тексту
      overflow: "hidden",
    },  
    price: {
      position: 'absolute',  // Фіксоване положення
      bottom: 0,            // Розміщення внизу картки
      right: 10,             // Розміщення справа
      fontSize: 16,          // Розмір шрифту
      color: '#494948',      // Колір тексту
    },
    geolocationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    geolocationIcon: {
      width: 16,
      height: 19,
      marginRight: 4,
    },
    geolocationText: {
      fontSize: 16,


      color: '#494948',
    },
    menuIcon: {
      width: 16,   // Ширина зображення
      height: 12,  // Висота зображення
    },  
    menuButton: {
      position: 'absolute',
      left: 20,
      marginTop: 42,
      padding: 10,
    },
    menuContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width * 0.7,
      height: '100%',
      backgroundColor: '#95897D',
      zIndex: 2,
      paddingTop: 40,
      paddingHorizontal: 20,
    },
    menuHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    menuTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    closeMenuButton: {
      padding: 5,
    },
    menuItems: {
      marginTop: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    menuItemText: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 10,
    },
    icon: {
      width: 30,
    },
    searchContainer: {
      flexDirection: 'row',  // Розташування елементів в ряд
      alignItems: 'center',  // Вирівнювання елементів по центру вертикально
      marginHorizontal: 20,  // Відступи зліва і справа
      marginTop: 84,  // Відступ зверху
      marginBottom: 10,
      borderRadius: 20,  // Округлені краї
      paddingHorizontal: 10,  // Відступи всередині контейнера
      borderWidth: 1,  // Обведення для контейнера
      borderColor: '#C5B6A7',  // Колір обведення
      height: 40,  // Висота контейнера
      alignSelf: 'center',  // Вирівнювання по центру
    },
    searchInput: {
      flex: 1,  // Розтягуємо поле для пошуку на весь простір, що залишився
      height: 31,  // Висота поля для введення
      borderColor: '#F0F0F0',  // Робимо обведення того ж кольору, що і фон контейнера
      borderWidth: 0,  // Прибираємо обведення
      borderRadius: 16,  // Округлені краї
      paddingHorizontal: 10,  // Внутрішній відступ
      backgroundColor: '#F0F0F0',  // Робимо фон поля для пошуку прозорим, щоб було видно фон контейнера
    },
    searchIcon: {
      width: 20,  // Розмір іконки
      height: 20,  // Розмір іконки
    },  
    advertButton: {
      position: 'absolute',
      marginTop: 34,
      right: 20,
      borderRadius: 20,
    },
    advertIcon: {
      width: 40,
      height: 40,
    },
  });
  
  export default App;