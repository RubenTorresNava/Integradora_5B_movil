import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import axios from 'axios';
import { useState } from 'react';


export default function LoginScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
/*     try {
      const response = await axios.post('http://localhost:3000/login', { usuario, password });

      if (response.data.token) { */
        // Aquí puedes manejar el token de respuesta, como guardarlo en el almacenamiento local
        navigation.navigate('Home');
/*       } else {
        console.error('Error de inicio de sesión:', response.data.msg);
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    } */
  };


  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('../assets/images/background1.png')} />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require('../assets/images/light.png')}
          className="h-[225] w-[90]"
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require('../assets/images/light.png')}
          className="h-[160] w-[65] opacity-75"
        />
      </View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-40 pb-10">

        {/* title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl">
            UTD
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full">

            <TextInput
              value={usuario}
              onChangeText={setUsuario} // Actualizar el estado del usuario cuando cambia el texto
              placeholder="Email"
              placeholderTextColor={'black'}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full mb-3">

            <TextInput
              value={password}
              onChangeText={setPassword} // Actualizar el estado de la contraseña cuando cambia el texto
              placeholder="Password"
              placeholderTextColor={'black'}
              secureTextEntry
            />
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}>

            <TouchableOpacity
              style={{ backgroundColor: 'black', padding: 6, borderRadius: 20, marginBottom: 3 }}
              onPress={handleLogin}
            >
              <Text className="text-xl font-bold text-white text-center">Inicio Sesion</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center">

            <Text>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.push('Signup')}>
              <Text className="text-sky-600">Iniciar sesion</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
