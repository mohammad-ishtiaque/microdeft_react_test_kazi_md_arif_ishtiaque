import { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("userData") || null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // const saveUser = (user) => {
  //   setToken(user);
  //   localStorage.setItem("userData", user);
  // };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken, clearUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export const useAuth = () => useContext(AuthContext);
