import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedInUser } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoggedInUser(userCredential.user);
      Alert.alert('Успіх', 'Реєстрація пройшла успішно!');
    } catch (error) {
      console.error(error);
      Alert.alert('Помилка реєстрації', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Зареєструватися</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Вже є акаунт?{' '}
        <Text style={styles.link} onPress={() => router.push('/LoginScreen')}>
          Увійти
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
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#2d4ba5',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: '#2d4ba5',
    fontWeight: 'bold',
  },
});
