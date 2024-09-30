import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // );
    // persist, setPersist 
  return (
    <AuthContext.Provider value={{ auth, setAuth,}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
