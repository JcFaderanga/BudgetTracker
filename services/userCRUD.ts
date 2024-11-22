import { supabase } from '@/lib/supabase';

type BankDetail = {
  id: string;
  name: string;
};

type BankType = {
  bank: Record<string, BankDetail>;
  id: string;
};

export const insertData = async (bank: BankType['bank'], userId: string) => {
  try {
        const dataToInsert = Object.values(bank).map((details) => ({
            user_id: userId, 
            bank_id: details.id,
            bank: details.name, 
        }));

        const { error } = await supabase.from('bank').insert(dataToInsert);

        if (error) {
            console.log('Error inserting data:', error.message);
            return 'Error: ' + error.message;
        }
        console.log('Data inserted successfully!');
        return 'success';
  } catch (err: any) {
        console.error('Unexpected error:', err);
        return 'Error: ' + err.message;
  }
};

export const fetchData = async (userId: string)=> {
    try {
        const { error, data } = await supabase
            .from('bank')
            .select('*')
            .eq('user_id', userId)
            .order('bank_balance', { ascending: false });
            
        if (error) {
            console.log('Error fetching data:', error.message);
            return null; 
        }
        return data;
    } catch (err: any) {
        console.error('Unexpected error:', err);
        return null; 
    }
};
  