import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Кнопка повернення назад */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/icons/back-arrow.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Ласкаво просимо!</Text>

      {/* Поля введення */}
      <TextInput style={styles.input} placeholder="Повне ім'я" placeholderTextColor="#fff" />
      <TextInput style={styles.input} placeholder="Прізвище" placeholderTextColor="#fff" />
      <TextInput style={styles.input} placeholder="Електронна пошта" placeholderTextColor="#fff" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Номер телефону" placeholderTextColor="#fff" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Пароль" placeholderTextColor="#fff" secureTextEntry />

      {/* Кнопка реєстрації */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Зареєструватись</Text>
      </TouchableOpacity>

      {/* Декоративна лінія */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Реєстрація через</Text>
        <View style={styles.divider} />
      </View>

      {/* Кнопка реєстрації через Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../assets/icons/google-icon.png')} style={styles.googleIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F7F5F1',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A69279',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#3A2E2A',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#A69279',
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#A69279',
  },
  googleButton: {
    backgroundColor: '#3A2E2A',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});

export default SignUpPage;
