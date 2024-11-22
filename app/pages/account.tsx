import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import banks from '@/constant/banks';
import { useAccount } from '@/context/AccountContext';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/authContext';
import { Entypo } from '@expo/vector-icons';
const Account = () => {
  const [search, setSearch] = useState<string>('');
  const [listOfSelected, setList] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { setBank } = useAccount();

  const {user} = useAuth();
  // Fetch saved banks from Supabase
  const fetchSavedBanks = async () => {
    try {
      const { data, error } = await supabase.from('bank').select('*');
      if (error) throw error;

      // Map saved banks into the listOfSelected state
      const savedBanks = data.reduce((acc: Record<number, any>, bank: any) => {
        acc[bank.bank_id] = { id: bank.bank_id, name: bank.bank };
        return acc;
      }, {});
      setList(savedBanks);
    } catch (error: any ) {
      console.error('Error fetching saved banks:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedBanks(); // Fetch saved banks on component mount
  }, []);

  useEffect(() => {
    setBank(listOfSelected); // Update context when saved banks change
  }, [listOfSelected]);

  // Filtered banks based on search input and excluding saved banks
  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(search.toLowerCase()) &&
      !listOfSelected[bank.id]
  );

  // Add a new bank to Supabase and the local list
  const createList = async (id: number) => {
    try {
      const bank = banks.find((bank) => bank.id === id);
      if (!bank) return;

      // Save the selected bank to Supabase
      const { error } = await supabase.from('bank').insert([{
        user_id: user.id,
        bank_id: bank.id,
        bank: bank.name,
        bank_code: bank.code
      }]);
      if (error) throw error;

      // Update local state
      setList((prev) => ({
        ...prev,
        [id]: bank,
      }));
    } catch (error: any) {
      console.error('Error adding bank:', error.message);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
 // Confirm removal of a bank
 const confirmRemove = (id: number) => {
  Alert.alert(
    'Confirm Removal',
    'Are you sure you want to remove this bank?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeBank(id),
      },
    ]
  );
};
// Remove a bank from the selected list
const removeBank = async (id: number) => {
  try {
    const { error } = await supabase
      .from('bank')
      .delete()
      .eq('user_id', user.id)
      .eq('bank_id', id);

    if (error) throw error;

    // Update local state
    setList((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  } catch (error:any) {
    console.error('Error removing bank:', error.message);
  }
};

  return (
    <>
      {/* Search Bar */}
      <View style={styles.manage}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#999"
          value={search}
          onChangeText={(text: string) => setSearch(text)}
        />
      </View>

      <ScrollView>
        {/* Saved Banks */}
        <View style={styles.savedBanks}>
          <Text style={styles.sectionTitle}>Saved Banks</Text>
          {Object.values(listOfSelected).length > 0 ? (
            Object.values(listOfSelected).map((bank: any) => (
              <View key={bank.id} style={styles.savedBankBox}>
                <Text style={styles.text}>{bank.name}</Text>
                    <TouchableOpacity onPress={() => confirmRemove(bank.id)}>
                       <Entypo name="circle-with-cross" size={24} color="#B6BBC1" />
                    </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noResultsText}>No banks selected yet.</Text>
          )}
        </View>

        {/* Selectable Banks */}
        <Text style={styles.sectionTitle}>Available Banks</Text>
        {filteredBanks.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={styles.bankBox}
            onPress={() => createList(bank.id)}
          >
            <Text style={styles.text}>{bank.name}</Text>
          </TouchableOpacity>
        ))}

        {/* No Results Message */}
        {filteredBanks.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No more available banks to select.</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  manage: {
    height: 90,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  savedBanks: {
    marginBottom: 10,
    width: '100%',
    height: 'auto',
    backgroundColor: '#F4F4F4',
    paddingVertical: 10,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    color: '#333',
  },
  bankBox: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  savedBankBox: {
    height: 60,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  text: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#999',
  },
});
