import { ButtonText, ContainerButton, LoginButtonContainer } from './styles'

export const ButtonAction = ({ title, onPress, backgroundColor, color, width, marginTop }) => {
  return (
    <LoginButtonContainer
      onPress={onPress}
      backgroundColor={backgroundColor}
      width={width}
      marginTop={marginTop}
    >
      <ButtonText color={color}>{title}</ButtonText>
    </LoginButtonContainer>
  );
};