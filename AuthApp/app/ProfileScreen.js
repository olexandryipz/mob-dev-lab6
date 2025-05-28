import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const db = getFirestore();

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setAge(data.age || '');
          setCity(data.city || '');
        }
      } catch (error) {
        Alert.alert('Помилка завантаження', error.message);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'users', user.uid), { name, age, city });
      Alert.alert('Успіх', 'Дані збережено!');
    } catch (error) {
      Alert.alert('Помилка збереження', error.message);
    }
  };

  const handleDelete = async () => {
    Alert.prompt(
      'Видалення акаунта',
      'Введіть пароль для підтвердження:',
      async (password) => {
        try {
          const credential = EmailAuthProvider.credential(user.email, password);
          await reauthenticateWithCredential(user, credential);

          await deleteDoc(doc(db, 'users', user.uid));
          await deleteUser(user);

          Alert.alert('Готово', 'Акаунт видалено');
          router.replace('/LoginScreen');
        } catch (error) {
          Alert.alert('Помилка', error.message);
        }
      },
      'secure-text'
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#2d4ba5" />
        <Text style={styles.backText}>Назад</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.title}>Профіль</Text>

        <TextInput
          style={styles.input}
          placeholder="Ім’я"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Вік"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Місто"
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2d4ba5' }]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Зберегти</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e12d0f', marginTop: 10 }]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Видалити акаунт</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  backText: {
    fontSize: 16,
    color: '#2d4ba5',
    marginLeft: 4,
    fontWeight: '500',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2d4ba5',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
