import { createContext, ReactNode, useContext } from 'react';

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
}

const AuthContext = createContext({ } as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {

  const user = {
    id: '222ui3o4u234',
    name: 'Jeandson Tenorio',
    email: 'jeandsontb@gmail.com'
  }

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }