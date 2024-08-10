import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import VotesScreen from '../Screens/Votes';

const Tab = createBottomTabNavigator();

export function MyRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Votes" component={VotesScreen} />  
    </Tab.Navigator>
  );
}