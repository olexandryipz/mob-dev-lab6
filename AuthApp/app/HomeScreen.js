import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export default function HomeScreen() {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (loggedInUser) {
        try {
          const docRef = doc(db, 'users', loggedInUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name || '');
          }
        } catch (e) {
          console.error('Помилка завантаження імені:', e.message);
        }
      }
    };
    fetchUserData();
  }, [loggedInUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      setLoggedInUser(null);
      router.replace('/LoginScreen');
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Підтвердження',
      'Ви дійсно хочете вийти?',
      [
        { text: 'Ні', style: 'cancel' },
        { text: 'Так', onPress: handleLogout }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Вітаємо{userName ? `, ${userName}` : ', користувачу'}!
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2d4ba5' }]}
        onPress={() => router.push('/ProfileScreen')}
      >
        <Text style={styles.buttonText}>Профіль</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#e12d0f', marginTop: 10 }]}
        onPress={confirmLogout}
      >
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16 
  },
  greeting: { 
    fontSize: 20, 
    marginBottom: 20 
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
