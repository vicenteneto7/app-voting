import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";

export default function CandidatesScreen() {
  const [socket, setSocket] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const newSocket = io("http://192.168.1.52:8082");
  
    newSocket.on("connect", () => {
      console.log("Conectado ao servidor Socket.io");
      setSocket(newSocket);
      newSocket.emit("getCandidatos"); // Solicitar candidatos ao conectar
    });
  
    newSocket.on("candidatesResponse", (data) => {
      console.log("Dados recebidos do servidor:", data); // Log para verificar os dados recebidos
      if (data.success) {
        setCandidates(data.candidatos);
      } else {
        setMessage(data.message);
      }
    });
  
    newSocket.on("disconnect", () => {
      console.log("Desconectado do servidor Socket.io");
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  return (
    <ScrollView>
      <Text>Candidatos</Text>
      {message ? <Text>{message}</Text> : null}
        <View>
          {candidates.map((candidate) => (
            <View key={candidate.id_candidato}>
              <Text>{candidate.nome}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Vote", { candidateId: candidate.id })
                }
              >
                <Text>Votar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
    </ScrollView>
  );
}
