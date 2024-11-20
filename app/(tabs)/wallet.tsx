import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Accounts from '@/components/walletChilds/accounts';
import AccountBalance from '@/components/walletChilds/accountBalance';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import WalletButton from '@/components/walletChilds/buttons/walletButton';
import { icons } from '@/constant';
import { fetchData } from '@/services/userCRUD';
import { useAuth } from '@/context/authContext';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface BankType {
  bank_code: string;
  bank_balance: number;
  cash: number;
}

interface FetchDataResponse {
  bank_code: string;
  bank_balance: number;
  cash: number;
}

const Wallet = () => {
  const [banks, setBanks] = useState<BankType[] | null>(null);
  const [availableBalance, setAvailableBalance] = useState<number | Float>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { user } = useAuth();
  const router = useRouter();

  // Fetch the bank data once the user is available
  const fetchBank = async (): Promise<void> => {
    if (user?.id) {
      try {
        const fetchedBank = await fetchData(user.id);
        setBanks(fetchedBank);
      } catch (error) {
        console.error('Error fetching bank data:', error);
        // Handle errors appropriately
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchBank();
    }
  }, [user]);

  // Calculate total balance whenever the bank data changes
  useEffect(() => {
    if (banks && banks.length > 0) {
      const totalAmount = banks.reduce((sum: number, record: { bank_balance: number }) => sum + record.bank_balance, 0);
      setAvailableBalance(totalAmount); // Update total balance state
    }
  }, [banks]);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    if (user?.id) {
      await fetchBank();
    }
    setRefreshing(false);
  };

  const getProgressValue = (bank_balance: number): number => {
    if (bank_balance === 0) return 0;
    return  bank_balance /availableBalance ;
  };

  if (banks === null) {
    return <ActivityIndicator size="large" color="#00BA4F" />;
  }

  return (
    <SafeAreaView>
      <ScrollView
        style={{ width: '100%', height: '100%', backgroundColor: '#F8F8F8' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <AccountBalance balance={availableBalance}>
          <WalletButton icon={icons.deposit} title="Deposit" onPress={() => router.push('../pages/deposit')} />
          <WalletButton icon={icons.transfer} title="Transfer" onPress={() => router.push('../pages/transfer')} />
          <WalletButton icon={icons.account} title="Accounts" onPress={() => router.push('../pages/account')} />
          <WalletButton icon={icons.history} title="History" onPress={() => router.push('../pages/history')} />
        </AccountBalance>

        <View style={{ width: '100%' }}>
          <View style={{ height: 35, justifyContent: 'center', paddingLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#BCBCBC' }}>Cash on Hand</Text>
          </View>
          <Accounts
            title="Cash"
            amount={banks ? banks[0]?.cash : 0} // Default to 0 if no banks are available
            progress={0}
            color="#00BA4F"
            unfilledColor="#CCF1DC"
            test={0}
          />

          <View style={{ height: 35, justifyContent: 'center', paddingLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#BCBCBC' }}>Cash on Bank</Text>
          </View>

          {banks && banks.length > 0 ? (
            banks.map((bank: BankType, index: number) => {
              const progressValue = getProgressValue(bank.bank_balance);
              return (
                <Accounts
                  key={index}
                  title={bank.bank_code}
                  amount={bank.bank_balance}
                  progress={progressValue}
                  color="#00BA4F"
                  unfilledColor="#CCF1DC"
                  test={progressValue}
                />
              );
            })
          ) : (
            <View style={{ padding: 10 }}>
              <Text style={{ color: '#BCBCBC' }}>No banks available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
