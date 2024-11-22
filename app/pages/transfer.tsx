import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import ThemeContainer from '@/components/ui/ThemeContainer'
import DropDown from '@/components/dropDown'
import { useAuth } from '@/context/authContext';
import { fetchData } from '@/services/userCRUD';
import { supabase } from '@/lib/supabase';
import Feather from '@expo/vector-icons/Feather';
import Currency from '@/components/currency';
import CustomButton from '@/components/CustomButton';

interface BankType {
  bank_balance: number;
  bank: string;
  bank_code: string;
  bank_id: number;
  created_at: string;
  user_id: string;
}

const Transfer:React.FC<BankType> = () => {
  const [amount, setAmount] = useState<string>(''); 
  const [bankList, setBankList] = useState<{ [key: string]: BankType }>({}); 
  const [selectedBank, setSelectedBank] = useState<string>(''); 

  const[selectFrom, setSelectFrom] = useState<string>('');
  const[selectTo, setSelectTo] = useState<string>('');

  const[selectBalanceFrom, setBalanceSelectFrom] = useState<string | any>('');
  const[selectBalanceTo, setBalanceSelectTo] = useState<string | any>('');
  const { user } = useAuth();

  console.log("selectForm", selectFrom, '&&', selectBalanceFrom);
  console.log("selectTo", selectTo,'&&', selectBalanceTo );
  //console.log("result of the bank list", bankList);


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
 
  const setValAmount = async () => {
    const queryFrom = supabase.from("bank").select("bank_balance, bank_code");
    const queryTo = supabase.from("bank").select("bank_balance, bank_code");
  
    const { data: FromBal, error: FromErr } = await queryFrom.eq("bank_id", selectFrom).single();
    const { data: ToBal, error: ToErr } = await queryTo.eq("bank_id", selectTo).single();
  
    if (FromErr || ToErr) {
      console.log("ERROR__FROM:", FromErr?.message, "ERROR__TO:", ToErr?.message);
    }
    setBalanceSelectFrom(FromBal || { bank_balance: 0, bank_code: "" });
    setBalanceSelectTo(ToBal || { bank_balance: 0, bank_code: "" });
  
    // Debugging
    console.log("FromBal:", FromBal, "ToBal:", ToBal);
  };
  
  useEffect(() => {
    setValAmount();
  }, [selectFrom, selectTo]);

 
  const setBalanceToMax =()=>{
    //sytax to set the amout on the text field to the bank_balance on selectBalanceFrom
  }

  const tranferOnPress=async ()=>{
    if(parseFloat(selectBalanceFrom.bank_balance) < parseFloat(amount)){
      console.log('transfer amount cant be greaterthan selected bank balance')
      return;
    }
    //Calculate amount after deduction 
    //formula: currentBalanceOfSelectedBank(FromBalance) - amountThatWillTransfer(amount) = balanceLeftFromSelectedBank
    const balanceLeftFromSelectedBank = parseFloat(selectBalanceFrom.bank_balance) - parseFloat(amount);
    //Calculate the total balance when transfered
    //formula: currentBlanceOfSelectedToTranfer(ToBalance) + amountThatWillTransfer(amount) = amountThatWillBeTransfered
    const totalBalanceWhenAmountTranfer = parseFloat(selectBalanceTo.bank_balance) + parseFloat(amount);

      await supabase
        .from("bank")
        .update({"bank_balance":balanceLeftFromSelectedBank})
        .eq('bank_id', selectFrom); 

        await supabase
        .from("bank")
        .update({"bank_balance":totalBalanceWhenAmountTranfer})
        .eq('bank_id', selectTo); 

  }
  return (
    <ThemeContainer>
      <View style={styles.dropDown}>
          <DropDown
            title="From"
            placeholder={ "Cash"}
            list={bankListItems}
            onValueChange={(value: string ) => setSelectFrom(value)} 
          />
          <View style={styles.iconView}> 
      
          </View>
          <DropDown
          title="To"
          placeholder={"Select"}
          list={bankListItems}
          onValueChange={(value: string) => setSelectTo(value)} 
        />
          <View style={styles.amountHolder}>
              <View style={{width: '30%'}}>
                  <Text style={styles.textTitle}>{selectBalanceFrom.bank_code ? selectBalanceFrom.bank_code : '--'}</Text>
                    <Currency style={{tintColor: '#000000', marginRight: 0}}>
                        <Text style={styles.textAmount}>{selectBalanceFrom? selectBalanceFrom.bank_balance : 0}</Text>
                    </Currency>
              </View>
              <View style={styles.icon}>
                  <Feather name="arrow-right" size={24} color="black" />
              </View>
              <View style={{width: '30%'}}>
                  <Text style={styles.textTitle}>{selectBalanceFrom.bank_code ? selectBalanceTo.bank_code :'--'}</Text>
                    <Currency style={{tintColor: '#000000', marginRight: 0}}>
                        <Text style={styles.textAmount}>{selectBalanceTo? selectBalanceTo.bank_balance : 0}</Text>
                    </Currency>
              </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>Tranfer Amount</Text>
            </View>
            <View style={{display: 'flex', flexDirection:'row'}}>
              <View style={styles.inputRow}>
                <Currency style={styles.currencyIcon} />
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder={ '0'}
                  value={ amount}
                  onChangeText={setAmount}
                />
              </View>
              <TouchableOpacity onPress={setBalanceToMax}>
                <Text style={{fontSize: 16, fontWeight: 600}}>Max</Text>
              </TouchableOpacity>
            </View> 
          </View>
          <CustomButton title='Transfer' onPress={tranferOnPress}/>
      </View>
    </ThemeContainer>
  )
}

export default Transfer

const styles = StyleSheet.create({
  dropDown:{
    width: '100%',
    height: 200,
    marginVertical: 20
  },
  iconView:{
    height: 10,
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon:{
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
 amountHolder:{
  marginTop: 25,
  marginBottom: 5,
  paddingVertical: 5,
  paddingHorizontal: 15,
  backgroundColor: '#ffffff',
  width: '100%',
  height: 80,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 20,
 },
 textTitle:{
  color:'#595959', 
 },
 textAmount:{
  fontSize: 16,
  fontWeight:700,
  },
  inputContainer: {
    width: '100%',
    height: 110,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 5,
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
    width: '70%',
    height: 50,
    borderColor: '#ECECEC',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
})