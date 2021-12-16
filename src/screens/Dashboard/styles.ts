import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default {
  Container: styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
  `,
  BoxHeader: styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `,
  BoxComponent: styled.View`
    width: 100%;
    padding: 0 24px;
  `,
  BoxUserInfo: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Photo: styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
  `,
  BoxUser: styled.View`
    margin-left: 17px;
  `,
  TextGreeting: styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
  `,
  TextTitleName: styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
  `
}