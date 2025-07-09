"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setEmail: (value: string) => void;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  email: "",
  logout: () => {},
  setIsLoggedIn: () => {},
  setEmail: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
  value: { isLoggedIn: boolean; email: string };
}

export function AuthProvider({ children, value }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(value.isLoggedIn);
  const [email, setEmail] = useState(value.email);

  useEffect(() => {
    setIsLoggedIn(value.isLoggedIn);
    setEmail(value.email);
  }, [value.isLoggedIn, value.email]);

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";

    setIsLoggedIn(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, email, logout, setIsLoggedIn, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
