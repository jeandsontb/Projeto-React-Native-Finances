import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import S from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const { signInGoogle, signInApple } = useAuth();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignInGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Opps!','Não foi possível conectar a conta google');
      setIsLoading(false);
    } 
  }

  const handleSignInApple = async () => {
    try {
      setIsLoading(true);
      return await signInApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Opps!','Não foi possível conectar a conta apple');
      setIsLoading(false);
    } 
  }

  return (
    <S.Container>
      <S.BoxHeader>
        <S.BoxTitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <S.TextTitle>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples 
          </S.TextTitle>
        </S.BoxTitleWrapper>

        <S.TextSignInTitle>
          Faça o seu login com {'\n'}
          uma das contas abaixo
        </S.TextSignInTitle>
      </S.BoxHeader>

      <S.BoxFooter>
        <S.BoxFooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInGoogle}
          />

          {Platform.OS === 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInApple}
            />
          }
        </S.BoxFooterWrapper>

        {isLoading && <ActivityIndicator 
                        color={theme.colors.shape} 
                        style={{marginTop: 18}}
                      /> 
        }

      </S.BoxFooter>
    </S.Container>
  )
}

export default SignIn;