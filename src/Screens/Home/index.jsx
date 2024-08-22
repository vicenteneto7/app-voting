import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import { ButtonAction } from "../../components/Button";
import { HomeContainer } from "./styles";

export default function HomeScreen() {
 
  
  return (
    <HomeContainer>
      <ButtonAction title={'Ir para a votação'} />
      <ButtonAction title={'Ir para a lista de votos'} />
    </HomeContainer>
  );
}
