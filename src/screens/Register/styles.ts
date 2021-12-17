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
  Form: styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;
    justify-content: space-between;
  `,
  BoxFields: styled.View``,
  BoxTransactionsTypes: styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
  `,
}