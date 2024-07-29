"use client";

import { getSessionService } from "@/services/session";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/userSchema";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<
    SetStateAction<{
      email: string;
      name: string;
      apiKey: string;
    } | null>
  >;
};

export const UserContext = createContext<UserContextType | null>(null);

type UseUserContextProps = {
  children: React.ReactNode;
};

export function UserContextProvider({ children }: UseUserContextProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext error");
  }

  return context;
}

export function useUserOnRefresh(
  setUser: Dispatch<
    SetStateAction<{
      email: string;
      name: string;
      apiKey: string;
    } | null>
  >
) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessionService().then((data) => {
      if (data.status === "success") {
        const user: User = {
          name: data.sessionData?.name!,
          email: data.sessionData?.email!,
          apiKey: data.sessionData?.apiKey!,
        };
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  return loading;
}
