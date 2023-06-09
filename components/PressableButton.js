import styled from "styled-components/native";

// Creation Medium Bttn
const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => marginBottom || "100px"};
  background-color: #652CB3;
  width: 182px;
  height: 68px;
  border-radius: 20px;
  shadow-color: #000000;
  shadow-offset: 6px 6px;
  shadow-opacity:  0.25;
  shadow-radius: 12px;
  elevation: 12;
`;

const ButtonText = styled.Text`
  color: white;
  font-family: 'Greycliff-Bold';
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
`;

const PressableButton = ({ onPress, title, marginBottom }) => (
    <ButtonContainer onPress={onPress} marginBottom={marginBottom}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );


// Creation large buttons
const BigButtonContainer = styled(ButtonContainer)`
margin-bottom: 0px;
background-color: ${({ purple }) => (purple ? "#652CB3" : "#2D0861")};
width: 320px;
`;

const BigPressableButton = ({ onPress, title, purple }) => (
  <BigButtonContainer onPress={onPress} purple={purple}>
    <ButtonText>{title}</ButtonText>
  </BigButtonContainer>
);


export default PressableButton;
export { PressableButton, BigPressableButton };
