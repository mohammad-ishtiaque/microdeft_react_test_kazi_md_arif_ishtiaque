import { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export const useAuth = () => useContext(AuthContext);
