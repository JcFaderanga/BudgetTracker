import {supabase} from '@/lib/supabase'

type userProps={
    email: string;
    password: string;
}

export const getUserData = async (userId: any) => {
    
    try {
        const { data, error } = await supabase
            .from('user')
            .select()
            .eq('user_id', userId)
            .single();
        if (error) {
            return { success: false, msg: error.message };
        }
        return { success: true, data };  
        
    } catch (e: any) {
        return { success: false, msg: e.error }; 
    }
    
}
// user login
export async function signInWithEmail(user: userProps) {
    const { error } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: user.password,
    });
    if (error) {
        console.error("Error signing in:", error.message);
      }
}

// user register
export async function signUpWithEmail(user: userProps) {
    const {data: { session }, error} = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
    })
    if (error) {
        console.error("Error signing in:", error.message);
      }
      console.log(session)
  }
