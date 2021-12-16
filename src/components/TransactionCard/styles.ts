import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';



export default {
  Container: styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
  `,
  TextTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `,
  TextAmount: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    margin-top: 2px;
  `, 
  BoxFooter: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
  `,
  BoxCategory: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Icon: styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
  `,
  TextCategoryName: styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    margin-left: 17px;
  `,
  TextDate: styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
  `,
}