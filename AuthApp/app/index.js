import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Index() {
  const { loggedInUser } = useAuth();

  if (loggedInUser == null) {
    return <Redirect href="/LoginScreen" />;
  }

  return <Redirect href="/HomeScreen" />;
}
