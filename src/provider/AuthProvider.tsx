"use client";
import { Role } from "@/types/User";
import routes from "@/web/routes";
import { useRouter } from "next/navigation";
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
  role: Role | undefined;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setEmail: (value: string) => void;
  setRole: (value: Role | undefined) => void;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  email: "",
  role: undefined,
  logout: () => {},
  setIsLoggedIn: () => {},
  setEmail: () => {},
  setRole: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
  value: { isLoggedIn: boolean; email: string; role: Role | undefined };
}

export function AuthProvider({ children, value }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(value.isLoggedIn);
  const [email, setEmail] = useState(value.email);
  const [role, setRole] = useState<Role | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(value.isLoggedIn);
    setEmail(value.email);
    setRole(value.role);
  }, [value.isLoggedIn, value.email, value.role]);

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";

    setIsLoggedIn(false);
    setEmail("");
    setRole(undefined);

    router.push(routes.home);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        role,
        logout,
        setIsLoggedIn,
        setEmail,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
