import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import S from './styled';

interface IProps extends TouchableOpacityProps {
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
    <S.ButtonChoice {...rest} type={type} isActive={isActive}>
      <S.IconChoiceButton name={icons[type]} type={type} />
      <S.Title>
        {title}
      </S.Title>
    </S.ButtonChoice>
  );
}