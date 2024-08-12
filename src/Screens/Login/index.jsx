import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import io from 'socket.io-client';

export default function LoginScreen() {
    const navigation = useNavigation()

    const [socket, setSocket] = useState(null);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Estabelece a conexão com o servidor Socket.io
        const newSocket = io('http://192.168.1.53:8082'); 

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor Socket.io');
            setSocket(newSocket);
        });

        newSocket.on('loginResponse', (data) => {
            setMessage(data.message);

            if (data.success) {
                // Caso o login seja bem-sucedido, você pode navegar para outra tela
                console.log('Login bem-sucedido:', data);
                // Exemplo: navegação para outra tela usando React Navigation
                navigation.navigate('Tabs', { userId: data.eleitorId });
            } else {
                console.log('Falha no login:', data.message);
            }
        });

        newSocket.on('disconnect', () => {
            console.log('Desconectado do servidor Socket.io');
        });

        // Desconecta o socket quando o componente é desmontado
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleLogin = () => {
        if (socket) {
            // Emite o evento de login com as credenciais do usuário
            socket.emit('loginEleitor', { email, senha });
        } else {
            setMessage('Não foi possível conectar ao servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    message: {
        marginTop: 20,
        color: 'red',
        fontSize: 16,
    },
});
