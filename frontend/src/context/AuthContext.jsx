import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState('normal');

  // ⬇️ This function will be used during login
  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const updatePlan = (plan) => {
    setUserPlan(plan);
    localStorage.setItem('userPlan', plan);
  }

  // ⬇️ Auto login on refresh if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
     const storedPlan = localStorage.getItem("userPlan");
    if (token) {
      // You should decode or fetch user here
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    }
    if(storedPlan){
      setUserPlan(storedPlan)
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, login, updatePlan }}
    >
      {children}
    </AuthContext.Provider>
  );
};
