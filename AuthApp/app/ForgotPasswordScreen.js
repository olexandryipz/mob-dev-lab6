import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Помилка', 'Введіть email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Успіх', 'Лист надіслано.');
      router.replace('/LoginScreen');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.label}>Введіть email для скидання паролю</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Надіслати лист</Text>
      </TouchableOpacity>

      <Text style={styles.backText}>
        {' '}
        <Text style={styles.link} onPress={() => router.replace('/LoginScreen')}>
          Назад до входу
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: '100%',
    height: 100,
    marginBottom: 32,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2d4ba5',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2d4ba5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: '#2d4ba5',
    fontWeight: 'bold',
  },
});