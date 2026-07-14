import React,{createContext, useContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData)=>{
        setuser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
    }

    const logout = ()=>{
        setuser(null)
        localStorage.removeItem("userInfo")
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}