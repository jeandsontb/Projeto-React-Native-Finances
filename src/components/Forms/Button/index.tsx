import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import S from './styles';

interface IProps extends RectButtonProps {
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