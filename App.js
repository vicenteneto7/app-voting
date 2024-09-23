import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";

import { Routes } from "./src/routes";
import { EleitorProvider } from "./src/hooks/auth";
import Toast from "react-native-toast-message";

//<Stack.Screen name="Login" component={LoginScreen} />

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <EleitorProvider>
        <Routes />
        <Toast />
      </EleitorProvider>
    </ThemeProvider>
  );
}
