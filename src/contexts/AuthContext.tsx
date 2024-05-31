import { ReactNode, createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';

import {
  storageAuthTokenSave,
  storageAuthTokenLoad,
  storageAuthTokenRemove,
} from '@storage/storageAuthToken';
import {
  storageUserSave,
  storageUserLoad,
  storageUserRemove,
} from '@storage/storageUser';

export type AuthContextDataProps = {
  isLoadingUserStorageData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState<boolean>(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true);
      const { data } = await api.post('/sessions', { email, password });
      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      storageUserRemove();
      storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged = await storageUserLoad();
      const token = await storageAuthTokenLoad();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoadingUserStorageData, signIn, signOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
