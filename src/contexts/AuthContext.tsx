import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  name: string;
  id: string;
  email: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

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
  user: User | null;
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

      // Seta uma propridade do header comum para todas as requests que usem o httpClient
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // salva valor do token no Storage  
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
    }

    run()
  }, [token])

  const { data: user, isFetching } = useQuery({
    enabled: !!token,
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ user: User }>('/me')
      const { user } = data
      return user;
    }
  })

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
    httpClient.defaults.headers.common['Authorization'] = null
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoggedIn: !!user, // !! -> Retorna true se não for null
        isLoading: isLoadingToken || isFetching, // Mantem o usuário na Splash enquanto o token não foi verificado e as informações do usuário não foram pegas.
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}