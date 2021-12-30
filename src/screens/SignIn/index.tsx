import React from "react";
import { Alert } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import S from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const { signInGoogle } = useAuth();

  const handleSignInGoogle = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta google');
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

          <SignInSocialButton 
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </S.BoxFooterWrapper>
      </S.BoxFooter>
    </S.Container>
  )
}

export default SignIn;