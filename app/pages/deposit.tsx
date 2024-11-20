import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ThemeContainer from '@/components/ui/ThemeContainer';
import Currency from '@/components/currency';
import CustomButton from '@/components/CustomButton';
import { supabase } from '@/lib/supabase';
import DropDown from '@/components/dropDown';
import { useAccount } from '@/context/AccountContext';
import { fetchData } from '@/services/userCRUD';
import { useAuth } from '@/context/authContext';
import banks from '@/constant/banks';

interface BankType {
  bank_balance: number;
  bank: string;
  bank_code: string;
  bank_id: number;
  created_at: string;
  user_id: string;
}

const Deposit = () => {
  const [amount, setAmount] = useState<string>(''); 
  const [bankList, setBankList] = useState<{ [key: string]: BankType }>({}); // Convert to object
  const [selectedBank, setSelectedBank] = useState<string>(''); 
  const { user } = useAuth();

  console.log("result of the bank list", bankList);

  useEffect(() => {
    if (user?.id) {
      fetchBank(user.id);
    }
  }, [user]);

  //update balance 
  const handleDeposite = async () => {
    // Fetch current balance from the selected bank
    const { data: balance } = await supabase
      .from('bank')
      .select('bank_balance')
      .eq('bank_id', selectedBank);
          const currentBalance = balance
              ?.reduce((acc, current) => acc + current.bank_balance, 0) || 0;

    const addedBalance = currentBalance + parseFloat(amount);
  
    const { error } = await supabase
      .from('bank')
      .update({ 'user_id': user.id, 'bank_balance': addedBalance })
      .eq('bank_id', selectedBank);
  
    if (error) console.log(error.message);

    // Reset the input fields
    setAmount('');
    setSelectedBank('');
  };
  

  const fetchBank = async (userId: string) => {
    const fetchedBank = await fetchData(userId); 

    // Convert fetched bank list to object based on bank_id or bank_code
    if(fetchedBank){
      const bankObject = fetchedBank.reduce((acc: { [key: string]: BankType }, bank: BankType) => {
        acc[bank.bank_id] = bank; 
        return acc;
      }, {});  
    setBankList(bankObject);
    }
  };
  const bankListItems = Object.keys(bankList).map(key => ({
    label: bankList[key].bank_code, 
    value: key, 
  }));

  
  return (
    <ThemeContainer>
      <View style={{ width: '100%', height: 110, backgroundColor: 'white', borderRadius: 20, marginVertical: 20 }}>
        <View style={{ height: '35%', display: 'flex', justifyContent: 'center', paddingHorizontal: 10 }}>
          <Text style={{ color: '#333333' }}>Deposit Amount</Text>
        </View>
        <View style={{ height: '45%', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
          <Currency style={{ tintColor: '#333333' }} />
          <TextInput
            style={{
              borderBottomWidth: 1,
              width: '85%',
              borderColor: '#ECECEC',
              fontSize: 22,
              fontWeight: 'bold',
              color: '#333333',
            }}
            keyboardType="numeric"
            placeholder="0"
            value={amount}
            onChangeText={(val: string) => setAmount(val)}
          />
        </View>
      </View>

      <DropDown
        title="Select Bank"
        placeholder="Cash"
        list={bankListItems}
        onValueChange={(value: string) => setSelectedBank(value)} 
      />
      
      <CustomButton title="Save" onPress={handleDeposite} />
    </ThemeContainer>
  );
};

export default Deposit;

const styles = StyleSheet.create({});
