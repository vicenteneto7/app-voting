import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../Screens/Home';
import VotesScreen from '../Screens/Votes';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export function MyRoutes() {
  const theme = useTheme()

  return (
    <Tab.Navigator
    screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: theme.purple,
      tabBarLabelPosition: 'beside-icon',
      tabBarStyle: {
        height: 57,
        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
      }
    }}
    >
      <Tab.Screen name="Home"
       component={HomeScreen} 
       options={{
        tabBarIcon: (({ size, color }) => 
          <MaterialIcons
            name="home"
            size={size}
            color={color}
          />
        )
       }}
       />
      <Tab.Screen 
      name="Meus votos" 
      component={VotesScreen}
      options={{
        tabBarIcon: (({ size, color }) => 
          <MaterialIcons
            name="list-alt"
            size={size}
            color={color}
          />
        )
       }} 
      />  
    </Tab.Navigator>
  );
}