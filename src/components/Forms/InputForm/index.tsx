import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import Input from '../Input';
import S from './styles';

interface IProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export default ({control, name, error, ...rest}: IProps) => {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />

      {error && <S.TextError>{error}</S.TextError>}
    </S.Container>
  )
}