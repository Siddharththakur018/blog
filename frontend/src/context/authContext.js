// context/authContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ⬇️ Used for displaying user role (plan) everywhere
  const [userPlan, setUserPlan] = useState('normal');

  // ✅ Called after login
  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Set plan from userData.role (if available)
    if (userData?.role) {
      setUserPlan(userData.role);
      localStorage.setItem("userPlan", userData.role);
    }
  };

  // ✅ Called after successful payment
  const updatePlan = (newPlan) => {
    setUserPlan(newPlan);
    localStorage.setItem("userPlan", newPlan);

    // Also update user.role (in state + localStorage)
    const updatedUser = { ...user, role: newPlan };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // ✅ Auto login & restore plan on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedPlan = localStorage.getItem("userPlan");

    if (token && storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }

    if (storedPlan) {
      setUserPlan(storedPlan);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        updatePlan,
        currentUser: { ...user, role: userPlan }, // 🟢 Add currentUser with plan role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
