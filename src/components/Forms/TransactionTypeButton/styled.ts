import styled, {css} from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";

interface ITypesIconsProps {
  type: 'up' | 'down';
}

interface ITypesButtonChoiceProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export default {
  ButtonChoice: styled.View<ITypesButtonChoiceProps>`
    width: 48%;
    
    border: 1.5px solid ${({theme}) => theme.colors.text};
    border-radius: 5px;    
    
    ${({isActive, type}) => isActive && type === 'up' && css`
      background-color: ${({theme}) => theme.colors.success_light};
      border: none !important;
    `}

    ${({isActive, type}) => isActive && type === 'down' && css`
      background-color: ${({theme}) => theme.colors.attention_light};
      border: none !important;
    `}
  `,
  ButtonBorder: styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;
  `,
  IconChoiceButton: styled(Feather)<ITypesIconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({theme, type}) => 
    type === 'up' ? theme.colors.success : theme.colors.attention};
  `,
  Title: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `,
}