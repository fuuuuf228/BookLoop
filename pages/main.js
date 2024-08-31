// pages/main.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

const MainPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/main_page/background.png')}
      style={styles.mainContainer}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/main_page/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignInPage')}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('HomePage')}>
        <Text style={styles.skipButtonText}>skip</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 243.04,
    height: 226,
  },
  buttonsContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  signInButton: {
    width: '100%',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#C19A81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    width: '100%',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#c0a58d',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#785037',
  },
  skipButton: {
    position: 'absolute',
    top: 40, // Відступ зверху, щоб було як на прикладі
    right: 20, // Відступ справа
    paddingHorizontal: 20, // Внутрішні відступи по горизонталі
    paddingVertical: 10, // Внутрішні відступи по вертикалі
    borderRadius: 20, // Округлення кутів
    backgroundColor: '#FFFFFF', // Білий фон
    shadowColor: '#000', // Тінь
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Тінь для Android
  },
  skipButtonText: {
    fontSize: 16,
    color: '#000', // Чорний текст
  },
});

export default MainPage;
