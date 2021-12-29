import styled from "styled-components/native"
import { RFValue } from 'react-native-responsive-fontsize';

interface IContainerProps {
  color: string;
}

export default {
  Container: styled.View<IContainerProps>`
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    padding: 13px 24px;
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${({color}) => color};
    margin-bottom: 8px;
  `,
  TextTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
  `,
  TextAmout: styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
  `,
}