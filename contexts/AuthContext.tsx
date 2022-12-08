import { useRouter } from "next/router";
import { createContext, type ReactNode } from "react";
import jwt from "jwt-decode";
import useLocalStorage from "../hooks/useLocalStorage";
import env from "../lib/env";

export type AuthContextValues = {
  handleLogin: (userEmail) => Promise<void>;
  handleSignUp: (apiUser) => Promise<void>;
  logout: () => void;
  apiUser?: User;
  incomingUser?: Object;
};

export const AuthContext = createContext<AuthContextValues | undefined>(
  undefined
);

export type AuthProviderProps = {
  children?: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [apiUser, setUser] = useLocalStorage<User | undefined>("apiUser");

  const handleLogin = async (userEmail) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    };
    try {
      const response = await fetch(
        `${env.API_URL}/auth/`,
        requestOptions
      );
      const data = await response.json();
      if (response.status == 400) {
        router.push("/sign-up");
      } else {
        const incomingUser = jwt<{apiUser, isBuyer, isSeller}>(data.token);
        incomingUser.apiUser.buyer = incomingUser.isBuyer;
        incomingUser.apiUser.seller = incomingUser.isSeller;
        incomingUser.apiUser.token = data.token;
        setUser(incomingUser.apiUser);
        if (!incomingUser.apiUser.isAdmin) {
          console.log("aca");
          logout();
          router.push("/not-admin");
        }
      }
    } catch {
      console.log("error while logging.")
    }
  };
  const handleSignUp = async (userToCreate) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiUser: userToCreate }),
    };
    try {
      console.log(userToCreate);
      const response = await fetch(`${env.API_URL}/users/`, requestOptions);
      const data = await response.json();
      if (response.status == 201) {
        await handleLogin(userToCreate.email);
      }
    } catch {
      console.log("error while signing-up.")
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleSignUp, logout, apiUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
