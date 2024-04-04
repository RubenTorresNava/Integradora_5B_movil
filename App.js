
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AlumnosScreen from './screens/AlumnosScreen';
import LibrosScreen from './screens/LibrosScreen';
import PrestamosScreen from './screens/PrestamosScreen';
import ReportesScreen from './screens/ReportesScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alumnos" component={AlumnosScreen} />
        <Stack.Screen name="Libros" component={LibrosScreen} />
        <Stack.Screen name="Prestamos" component={PrestamosScreen} />
        <Stack.Screen name="Reportes" component={ReportesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;