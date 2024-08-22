import { useState } from "react";
import { MyRoutes } from "./src/routes/routes";
import LoginScreen from "./src/Screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
///<Stack.Screen name="Login" component={LoginScreen} />


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={MyRoutes} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
