import React from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import S from './styles';

interface IButtonProps extends TouchableWithoutFeedbackProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({title, svg: Svg, ...rest}: IButtonProps) => {
  return (
    <TouchableWithoutFeedback {...rest}>
      <S.ButtonSocial>
        <S.BoxImageContainer>
          <Svg />
        </S.BoxImageContainer>

        <S.TextTitleButton>{title}</S.TextTitleButton>
      </S.ButtonSocial>
    </TouchableWithoutFeedback>
  )
}

export { SignInSocialButton };
