import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null initially
  const [loading, setLoading] = useState(true);

  // Check login status on first load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/login", {
          withCredentials: true,
        }); // Use your route
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // Not logged in
      } finally {
        setLoading(false); // Done checking
      }
    };

    checkLoginStatus();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
