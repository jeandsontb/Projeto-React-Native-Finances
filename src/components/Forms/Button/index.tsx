import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import S from './styles';

interface IProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default ({ title, onPress, ...rest }: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <S.Button {...rest} >
        <S.TextTitleButton>
          { title }
        </S.TextTitleButton>
      </S.Button>
    </TouchableWithoutFeedback>
  )
}