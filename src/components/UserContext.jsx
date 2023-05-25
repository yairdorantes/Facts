import axios from "axios";
import { createContext, useState } from "react";
import { api } from "../api";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  let [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : null;
  });

  const loginUser = (username) => {
    if (username.length > 0 && username.length < 10) {
      axios
        .post(`${api}/user/`, { username: username })
        .then((res) => {
          if (res.status === 200) {
            setUser(username);
            localStorage.setItem("user", username);
            setIsOpen(false);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextData = {
    loginUser,
    user,
    isOpen,
    logoutUser,
    setIsOpen,
    // isOpenAuth,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
