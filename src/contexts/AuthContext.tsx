import { useMutation } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage'

type SignInParams = {
  email: string;
  password: string;
}

type SignUpParams = {
  goal: string;
  gender: string;
  birthDate: string;
  activityLevel: number;
  height: number;
  weight: number
  account: {
    name: string;
    email: string;
    password: string;
  };
}

interface IAuthContextValue {
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn(params: SignInParams): Promise<void>;
  signUp(params: SignUpParams): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

const TOKEN_STORAGE_KEY = 'user::token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  // Verifica se existe um token salvo no Storage e carrega ele
  useEffect(() => {
    async function load() {
      const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
      setToken(data);
      setIsLoadingToken(false)
    }

    load()
  }, [])

  // Lida com a persistência do token
  useEffect(() => {
    async function run() { // está sendo usado o async para executar o AsyncStorage
      // Se o token existir, adiciona ele no storage
      if (!token) {
        return;
      }

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
    }

    run()
  }, [token])

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post('/signin', params);
      setToken(data.accessToken)
    },
  });
  
  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      const { data } = await httpClient.post('/signup', params);
      setToken(data.accessToken)
    },
  });

  const signOut = useCallback(async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // !! -> Retorna true se não for null
        isLoading: isLoadingToken, // Mantem o usuário na Splash enquanto o token não foi verificado.
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}