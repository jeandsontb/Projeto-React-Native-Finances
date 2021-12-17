import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import S from './styles';

interface IProps extends TouchableOpacityProps {
  title: string;
}

export default ({ title, ...rest }: IProps) => {
  return (
    <S.Button {...rest} >
      <S.TextTitleButton>
        { title }
      </S.TextTitleButton>
    </S.Button>
  )
}