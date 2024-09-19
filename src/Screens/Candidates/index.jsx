import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import io from "socket.io-client";
import { useEleitor } from "../../hooks/auth";

export default function CandidatesScreen() {
  const { eleitorData } = useEleitor();
  const [socket, setSocket] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Para controlar o estado de envio

  useEffect(() => {
    const newSocket = io("http://192.168.1.52:8082");

    newSocket.on("connect", () => {
      console.log("Conectado ao servidor Socket.io");
      setSocket(newSocket);
      newSocket.emit("getCandidatos");
    });

    newSocket.on("candidatesResponse", (data) => {
      if (data.success) {
        setCandidates(data.candidatos);
      } else {
        setMessage(data.message);
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Desconectado do servidor Socket.io");
    });

    newSocket.on("voteResponse", (data) => {
      if (data.success) {
        setMessage("Voto registrado com sucesso!");
        setHasVoted(true);
      } else {
        setMessage(data.message);
      }
      setIsSubmitting(false); // Finaliza o estado de envio
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleVote = (candidateId) => {
    if (socket) {
      const id_eleitor = eleitorData.eleitorId;
      setIsSubmitting(true); // Inicia o estado de envio
      socket.emit("vote", ({ id_eleitor, id_candidato: candidateId }));
      console.log(`Votou no candidato ${candidateId}`);
    } else {
      setMessage("Erro: Não foi possível se conectar ao servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Candidatos</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {isSubmitting ? <Text style={styles.submitting}>Enviando voto...</Text> : null}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <View key={candidate.id_candidato} style={styles.card}>
              <Image source={require('../../assets/user.png')} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{candidate.nome}</Text>
                <Text style={styles.party}>{candidate.partido}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleVote(candidate.id_candidato)}
              >
                <Text style={styles.buttonText}>Votar</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noCandidates}>Nenhum candidato disponível.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center", // Centraliza o texto
  },
  message: {
    color: "red",
    marginBottom: 16,
  },
  submitting: {
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row", // Para alinhar a imagem e o texto lado a lado
    alignItems: "center",
  },
  textContainer: {
    flex: 1, // Ocupa o espaço restante ao lado da imagem
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  party: {
    fontSize: 14,
    color: "#788697",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#9758a6",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Para deixar a imagem circular
  },
  noCandidates: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
});
