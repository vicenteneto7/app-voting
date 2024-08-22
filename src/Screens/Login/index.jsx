import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import io from "socket.io-client";
import styles, { InputForm, InputLabel, LoginContainer, TecladoView } from "./styles"; // 
import { ButtonAction } from "../../components/Button";

export default function LoginScreen() {
  const theme = useTheme()
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
        navigation.navigate("Tabs", { userId: data.eleitorId });
      } else {
        console.log("Falha no login:", data.message);
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
      <ScrollView>
      <InputLabel>E-mail</InputLabel>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email é obrigatório" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputForm
            placeholder="Digite seu e-mail"
            placeholderTextColor={'#C4C4CC'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      </ScrollView>
      <ScrollView>
      <InputLabel>Senha</InputLabel>
      <Controller
        control={control}
        name="senha"
        rules={{ required: "Senha é obrigatória" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputForm
            placeholder="Digite sua senha"
            placeholderTextColor={'#C4C4CC'}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.senha && <Text>{errors.senha.message}</Text>}
      </ScrollView>

      <ButtonAction
      title="Login" 
      onPress={handleSubmit(handleLogin)} />
      

      {message ? <Text>{message}</Text> : null}

      <ScrollView>
        <Text>Não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Clique aqui</Text>
        </TouchableOpacity>
      </ScrollView>
      </TecladoView>
    </LoginContainer>
  );
}
