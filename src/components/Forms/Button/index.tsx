import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import S from './styles';

interface IProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default ({ title, onPress, ...rest }: IProps) => {
  return (
    <S.Button onPress={onPress} {...rest} >
      <S.TextTitleButton>
        { title }
      </S.TextTitleButton>
    </S.Button>
  )
}