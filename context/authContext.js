import React,{useState, useEffect,createContext, useContext} from "react";

const AuthContext = createContext();
 
export const AuthProvider = ({children})=>{

 const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const setAuth = authUser=>{
    setUser(authUser);
}

const setUserData = userData =>{
    setUser({...userData});
}
    return(
        <AuthContext.Provider value={{user, setAuth, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);