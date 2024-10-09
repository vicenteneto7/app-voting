import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import io from "socket.io-client";
import styles, {
  ErrorMessage,
  InputContainer,
  InputForm,
  InputLabel,
  LoginContainer,
  TecladoView,
} from "./styles";
import { ButtonAction } from "../../components/Button";
import { useEleitor } from "../../hooks/auth";
import Toast from "react-native-toast-message"; // Importe o Toast

export default function LoginScreen() {
  const { putEleitorData } = useEleitor(); // Pega a função para salvar o eleitor
  const theme = useTheme();
  const navigation = useNavigation();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const newSocket = io("http://192.168.1.53:8082");

    newSocket.on("connect", () => {
      console.log("Conectado ao servidor Socket.io");
      setSocket(newSocket);
    });

    newSocket.on("loginResponse", (data) => {
      setMessage(data.message);

      if (data.success) {
        console.log("Login bem-sucedido:", data);
        putEleitorData(data);

        // Exibe o Toast de sucesso
        Toast.show({
          type: "success",
          text1: "Login bem-sucedido!",
          text2: "Você foi autenticado com sucesso.",
          visibilityTime: 4000, // Tempo de exibição
        });
        // Navega para outra tela após o login bem-sucedido, se necessário
        // navigation.navigate('SomeScreen');
      } else {
        console.log("Falha no login:", data.message);

        // Exibe o Toast de erro
        Toast.show({
          type: "error",
          text1: "Falha no login",
          text2: data.message || "Não foi possível realizar o login.",
          position: "top", // 'top' ou 'bottom'
          visibilityTime: 4000, // Tempo de exibição
        });
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Desconectado do servidor Socket.io");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLogin = (data) => {
    if (socket) {
      socket.emit("loginEleitor", data);
    } else {
      setMessage("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <LoginContainer>
      <TecladoView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <InputContainer>
            <InputLabel>E-mail</InputLabel>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email é obrigatório" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputForm
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={"#C4C4CC"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputContainer>
        </ScrollView>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <InputContainer>
            <InputLabel>Senha</InputLabel>
            <Controller
              control={control}
              name="senha"
              rules={{ required: "Senha é obrigatória" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputForm
                  placeholder="Digite sua senha"
                  placeholderTextColor={"#C4C4CC"}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.senha && (
              <ErrorMessage>{errors.senha.message}</ErrorMessage>
            )}
          </InputContainer>
        </ScrollView>

        <ButtonAction title="Login" onPress={handleSubmit(handleLogin)} />

        <ScrollView>
          <Text>Não possui conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Clique aqui</Text>
          </TouchableOpacity>
        </ScrollView>
        <Toast />
      </TecladoView>
    </LoginContainer>
  );
}
