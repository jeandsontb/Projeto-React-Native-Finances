import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export default {
  Container: styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
  `,
  BoxHeader: styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `,
  TextTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: 18px;
  `,
}