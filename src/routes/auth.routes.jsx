import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../Screens/Login";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={LoginScreen} />
    </Navigator>
  );
}
