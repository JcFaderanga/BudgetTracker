import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Stack } from 'expo-router';
import { useAccount, AccountProvider } from '@/context/AccountContext';
import {insertData} from '@/services/userCRUD'
import { useAuth } from '@/context/authContext';
interface Bank {
  id: number;
  name: string;
  code: string;
}

const _layout: React.FC = () => {
  const { bank } = useAccount(); // Access context
  const { user} = useAuth();
  const onPressSave = async () => {
    if (bank) {
      let res = await insertData(bank, user.id)
      //console.log(res)
    } else {
      console.log('No bank selected');
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="account"
        options={{
          title: 'Manage Account',
          headerTintColor: '#333333',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={onPressSave}>
              <AntDesign name="check" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="deposit"
        options={{
          title: 'Deposit',
          headerTintColor: '#333333',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: 'Transaction History',
          headerTintColor: '#333333',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          headerTintColor: '#333333',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
};

const LayoutWithProvider = () => (
  <AccountProvider>
    <_layout />
  </AccountProvider>
);

export default LayoutWithProvider;

const styles = StyleSheet.create({});
