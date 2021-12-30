import React from 'react';
import { SvgProps } from 'react-native-svg';
import { RectButtonProps } from 'react-native-gesture-handler';

import S from './styles';

interface IButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({title, svg: Svg, ...rest}: IButtonProps) => {
  return (
    <S.ButtonSocial {...rest}>
      <S.BoxImageContainer>
        <Svg />
      </S.BoxImageContainer>

      <S.TextTitleButton>{title}</S.TextTitleButton>
    </S.ButtonSocial>
  )
}

export { SignInSocialButton };
