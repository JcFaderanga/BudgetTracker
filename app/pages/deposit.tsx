import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ThemeContainer from '@/components/ui/ThemeContainer';
import Currency from '@/components/currency';
import CustomButton from '@/components/CustomButton';
import { supabase } from '@/lib/supabase';
import DropDown from '@/components/dropDown';
import { useAuth } from '@/context/authContext';
import { fetchData } from '@/services/userCRUD';

interface BankType {
  bank_balance: number;
  bank: string;
  bank_code: string;
  bank_id: number;
  created_at: string;
  user_id: string;
  cash: number;
}

const Deposit = () => {
  const [amount, setAmount] = useState<string>(''); 
  const [bankList, setBankList] = useState<{ [key: string]: BankType }>({});
  const [selectedBank, setSelectedBank] = useState<string | null>(null); 
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchBank(user.id);
    }
  }, [user]);

  const handleDeposite = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      console.log('Invalid deposit amount');
      return;
    }

    if (!selectedBank || !bankList[selectedBank]) {
      console.log('No bank selected');
      return;
    }

    try {
      const currentBalance = bankList[selectedBank].bank_balance;
      const addedBalance = currentBalance + parseFloat(amount);

      const { error } = await supabase
        .from('bank')
        .update({ bank_balance: addedBalance })
        .eq('bank_id', selectedBank);

      if (error) throw error;

      // Reset fields after successful update
      setAmount('');
      setSelectedBank('');
      console.log('Deposit successful!');
    } catch (error:any) {
      console.error('Error depositing:', error.message);
    }
  };

  const fetchBank = async (userId: string) => {
    try {
      const fetchedBank = await fetchData(userId);

      if (fetchedBank) {
        const bankObject = fetchedBank.reduce((acc: { [key: string]: BankType }, bank: BankType) => {
          acc[bank.bank_id] = bank;
          return acc;
        }, {});

        setBankList(bankObject);
      }
    } catch (error:any) {
      console.error('Error fetching bank data:', error.message);
    }
  };

  const bankListItems = Object.keys(bankList).map(key => ({
    label: bankList[key].bank_code,
    value: key,
  }));

  return (
    <ThemeContainer>
      <View style={styles.inputContainer}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>Deposit Amount</Text>
        </View>
        <View style={styles.inputRow}>
          <Currency style={styles.currencyIcon} />
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="0"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
      </View>

      <DropDown
        title="Select Bank"
        placeholder="Cash"
        list={bankListItems}
        onValueChange={setSelectedBank}
      />

      <CustomButton title="Save" onPress={handleDeposite} />
    </ThemeContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 110,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 20,
  },
  inputHeader: {
    height: '35%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: '#333333',
  },
  inputRow: {
    height: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  currencyIcon: {
    tintColor: '#333333',
  },
  textInput: {
    borderBottomWidth: 1,
    width: '85%',
    borderColor: '#ECECEC',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Deposit;
