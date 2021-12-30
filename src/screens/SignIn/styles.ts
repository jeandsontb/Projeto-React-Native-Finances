import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export default {
  Container: styled.View`
    flex: 1;
  `,
  BoxHeader: styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
  `,
  BoxTitleWrapper: styled.View`
    align-items: center;
  `,
  TextTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 45px;
  `,
  TextSignInTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 67px;
  `,
  BoxFooter: styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({theme}) => theme.colors.secondary};
  `,
}