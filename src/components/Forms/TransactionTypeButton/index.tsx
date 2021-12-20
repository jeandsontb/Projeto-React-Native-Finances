import React from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';

import S from './styled';

interface IProps extends TouchableWithoutFeedbackProps {
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
      <TouchableWithoutFeedback {...rest} >
        <S.ButtonBorder>
          <S.IconChoiceButton name={icons[type]} type={type} />
          <S.Title>
            {title}
          </S.Title>
        </S.ButtonBorder>
      </TouchableWithoutFeedback>
    </S.ButtonChoice>
  );
}