import { useNavigation } from "@react-navigation/native";
import { ButtonAction } from "../../components/Button";
import { Container1, Container2, HomeContainer, P } from "./styles";
import { useEleitor } from "../../hooks/auth";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const { eleitorData, logout } = useEleitor();

  const handleNavigate = () => {
    console.log("Navigation object: ", navigation);
    navigation.navigate("VotingScreen");
    console.log("Navigating to votation");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <HomeContainer>
      <Container1>
        <P>Bem-vindo, {eleitorData.nome} </P>
      </Container1>
      <Container2>
        <ButtonAction
          title="Encerrar sessão"
          onPress={handleLogout}
          width={150}
        />
      </Container2>
    </HomeContainer>
  );
}
