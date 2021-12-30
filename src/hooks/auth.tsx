import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signInGoogle(): Promise<void>; 
}

interface IAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({ } as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {

  const [user, setUser] = useState<IUser>({} as IUser);

  const signInGoogle = async () => {
    try {
      const CLIENT_ID = '723342099920-2b1o25cgutl14b24gnsulbhomc1ld8ae.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@jeandson/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
                              .startAsync({ authUrl }) as IAuthorizationResponse;
                              
      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        })
      } 

    } catch (error) {
      throw new Error(error as string);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInGoogle }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }