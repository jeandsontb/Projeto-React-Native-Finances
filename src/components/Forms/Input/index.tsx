import React from 'react';
import { TextInputProps } from 'react-native';

import S from './styles'

type IProps = TextInputProps;

export default ({...rest}: IProps) => {
  return (
    <S.Container {...rest} />
  )
}