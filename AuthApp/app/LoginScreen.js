import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Успіх', 'Ви увійшли!');
      router.replace('/HomeScreen');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Помилка входу', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Увійти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Забули пароль?</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Немає акаунта?{' '}
        <Text style={styles.link} onPress={() => router.push('/RegisterScreen')}>
          Зареєструватися
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
    width: 270,             
    height: 80,             
    position: 'absolute',  
    top: 180,                
    alignSelf: 'center',    
    marginBottom: 24,   
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#2d4ba5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 12,
    color: '#2d4ba5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: '#2d4ba5',
    fontWeight: 'bold',
  },
});
