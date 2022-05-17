import React from "react";
import { TextInputProps } from "react-native";

import S from "./styles";

// type IProps = TextInputProps;
interface Props extends TextInputProps {
  active?: boolean;
}

export default ({ active = false, ...rest }: Props) => {
  return <S.Container active={active} {...rest} />;
};
