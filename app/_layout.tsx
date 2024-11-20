import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/authContext';
import { getUserData } from '../services/userServices';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../lib/supabase'; // Make sure supabase is correctly imported
import { Stack, SplashScreen, useRouter } from "expo-router";
SplashScreen.preventAutoHideAsync();

type User = {
  id: string;
  email: string;
};

type UserData = {
  name: string;
  age: number;
};

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
};

function AuthLayout() {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

    useEffect(() => {
      supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
          router.replace('../(tabs)/wallet');
          
      } else {
          router.replace('/');
        console.log('INVALID SESSION');
        setAuth(null); 
      }
    });
  }, []);

  const updateUserData = async (user: any) => {

    let res = await getUserData(user?.id);
    console.log('APP/_LAYOUT :: get user data:',res);
    if(res.success) setUserData(res.data);
  };


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pages" />
    </Stack>
  );
}

export default RootLayout;
