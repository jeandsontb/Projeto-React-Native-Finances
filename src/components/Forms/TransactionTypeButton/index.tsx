import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import S from './styled';

interface IProps extends RectButtonProps {
  type: 'up' | 'down'
  title: string;
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export default ({type, title, isActive, ...rest}: IProps) => {
  return (
    <S.ButtonChoice type={type} isActive={isActive}>
      <S.ButtonBorder {...rest}>
        <S.IconChoiceButton name={icons[type]} type={type} />
        <S.Title>
          {title}
        </S.Title>
      </S.ButtonBorder>
    </S.ButtonChoice>
  );
}