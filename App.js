import { useState } from "react";
import { MyRoutes } from "./src/routes/routes";
import LoginScreen from "./src/Screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={MyRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
