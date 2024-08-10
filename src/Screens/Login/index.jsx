import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [socket, setSocket] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Use the correct IP address
    const newSocket = io('http://localhost:8082'); // For Android Emulator
    // const newSocket = io('http://localhost:8082'); // For iOS Simulator
    // const newSocket = io('http://<your-ip>:8082'); // For real devices

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    newSocket.on('loginResponse', (data) => {
      setMessage(data.message);

      if (data.success) {
        navigation.navigate('Tabs', {
          eleitorId: data.eleitorId,
          nome: data.nome,
          admin: data.admin,
        });
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLogin = () => {
    if (socket && socket.connected) {
      socket.emit('login', { email, senha });
    } else {
      setMessage('Unable to connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  message: {
    marginTop: 20,
    color: 'red',
  },
});
