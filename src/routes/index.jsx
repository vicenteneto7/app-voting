import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes, StackNavigator } from './app.routes';
import { useEleitor } from '../hooks/auth'; // Importar o seu EleitorContext
//      {eleitorData.eleitorId ? <AppRoutes /> : <AuthRoutes />}  


export function Routes() {
  const { eleitorData } = useEleitor();  // Verifica se o eleitor está logado

  return (
    <NavigationContainer>
      <AppRoutes /> 
    </NavigationContainer>
  );
}
