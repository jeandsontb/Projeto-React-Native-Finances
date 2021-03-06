import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
// import * as AppleAuthentication from "expo-apple-authentication";

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
  // signInApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface IAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const userStorageKey = "@gofinances:user";

  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    const loadUserStorageData = async () => {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = (await JSON.parse(userStorage)) as IUser;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    };

    loadUserStorageData();
  }, []);

  const signInGoogle = async () => {
    try {
      const CLIENT_ID = process.env.ID_CLIENT_GOOGLE;
      const REDIRECT_URI = process.env.REDIRECT_URI_GOOGLE;
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  // const signInApple = async () => {
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //     });

  //     if (credential) {
  //       const name = credential.fullName!.givenName!;
  //       const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

  //       const userLogged = {
  //         id: String(credential.user),
  //         email: credential.email!,
  //         name,
  //         photo,
  //       };
  //       setUser(userLogged);
  //       await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
  //     }
  //   } catch (e) {
  //     throw new Error(e as string);
  //   }
  // };

  const signOut = async () => {
    setUser({} as IUser);
    await AsyncStorage.removeItem(userStorageKey);
  };

  return (
    <AuthContext.Provider
      value={{ user, signInGoogle, signOut, userStorageLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
