import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignInPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Кнопка повернення назад */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/icons/back-arrow.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Вхід в акаунт</Text>

      {/* Поля введення */}
      <TextInput
        style={styles.input}
        placeholder="Електронна пошта"
        placeholderTextColor="#fff"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Пароль"
          placeholderTextColor="#fff"
          secureTextEntry
        />
        <TouchableOpacity style={styles.eyeIconContainer}>
          <Image source={require('../assets/icons/eye-icon.png')} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      {/* Кнопка "Забули пароль?" */}
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Забули пароль?</Text>
      </TouchableOpacity>

      {/* Кнопка входу */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Увійти</Text>
      </TouchableOpacity>

      {/* Декоративна лінія */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Вхід через</Text>
        <View style={styles.divider} />
      </View>

      {/* Кнопка входу через Google */}
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50, // Відступ для іконки
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  forgotPasswordText: {
    color: '#A69279',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#A69279',
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
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

export default SignInPage;
