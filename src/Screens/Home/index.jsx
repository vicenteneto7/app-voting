import { useNavigation } from "@react-navigation/native";
import { ButtonAction } from "../../components/Button";
import { HomeContainer, P } from "./styles";
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
    logout()
  }

  return (
    <HomeContainer>
      <P>Bem-vindo, {eleitorData.nome} </P>
      <TouchableOpacity onPress={handleLogout}>
        <P>Sair</P>
      </TouchableOpacity>
    </HomeContainer>
  );
}
