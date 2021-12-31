import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from '../routes/auth.routes';
import { AppRoutes } from '../routes/app.routes';
import { useAuth } from '../hooks/auth';

const Routes = () => {

  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}

export default Routes;