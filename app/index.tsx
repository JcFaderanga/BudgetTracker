import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ThemeContainer from '@/components/ui/ThemeContainer';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signInWithEmail, signUpWithEmail, getUserData } from '@/services/userServices';
type userProp = {
  email: string;
  password: string; 
};

const Index = () => {
  const [user, setUser] = useState<userProp>({
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof userProp, value: string) => {
    setUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLogin = async() => {
    await signInWithEmail(user);
  };

  const handleRegister = async() => { 
     await signUpWithEmail(user);
  };

  return (
    <ThemeContainer>
      <View style={styles.content}>
        <Text style={styles.textStyle}>Budget Tracker</Text>

        {/* Pass in the appropriate handlers to the CustomInput components */}
        <CustomInput
          onChangeText={(val: string) => handleInputChange('email', val)}
          placeholder="Enter your email"
        />
        <CustomInput
          onChangeText={(val: string) => handleInputChange('password', val)}
          placeholder="Enter your password"
        />

        {/* Buttons for Login and Register */}
        <CustomButton onPress={handleLogin} title="Login" />
        <CustomButton onPress={handleRegister} title="Register" />
      </View>
    </ThemeContainer>
  );
};

export default Index;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 20,
  },
});
