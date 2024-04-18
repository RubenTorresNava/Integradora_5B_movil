import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ReporteScreen = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHeight = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
   


    const toggleMenu = () => {
      Animated.timing(menuHeight, {
        toValue: menuVisible ? 0 : 280,
        duration: 200,
        useNativeDriver: false,
      }).start();
  
      setMenuVisible(!menuVisible);
    };
  
    const handleReporte = () => {
      navigation.navigate('Reporte');
    };
  
    const handleSignOut = () => {
      navigation.navigate('Login');
    };
  
    const handleLibros = () => {
      navigation.navigate('Libros');
    };
  
    const handleAlumnos = () => {
      navigation.navigate('Alumnos');
    };
  
    const handlePrestamos = () => {
      navigation.navigate('Prestamos');
    };

    const handleHome = () => {
        navigation.navigate('Home');
    };
    const handleTemperatura = () => {
      navigation.navigate('Temperatura');
  };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    
    const handleInfoUsuario = () => {
      navigation.navigate('Usuario');
    };
    

    return (
      <View style={styles.container}>
        {/* Header section */}
        <View style={styles.header}>
           {/* Agrega el logo en la esquina superior derecha */}
           <Image
            source={require('../assets/images/utd.png')}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Icon name="menu" size={30} color="#006400" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Biblioteca</Text>
        </View>
  
        {/* Animated Dropdown Menu */}
        <Animated.View style={[styles.dropdownMenu, { height: menuHeight }]}>
          <TouchableOpacity style={styles.menuItem} onPress={handleAlumnos}>
            <Icon name="account-circle" size={22} color="#333" />
            <Text style={styles.menuItemText}>Alumnos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLibros}>
            <Icon name="book" size={22} color="#333" />
            <Text style={styles.menuItemText}>Libros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handlePrestamos}>
            <Icon name="note-outline" size={22} color="#333" />
            <Text style={styles.menuItemText}>Prestamos </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleReporte}>
          <Icon name="alert" size={22} color="#333" />
          <Text style={styles.menuItemText}>Reportes Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleTemperatura}>
          <Icon name="thermometer" size={22} color="#333" />
          <Text style={styles.menuItemText}>Temperatura</Text>
        </TouchableOpacity>
        </Animated.View>
  
        {/* Body section */}
        <View style={styles.body}>
           
                  
        </View>

        {/* Footer section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleHome}>
            <Icon name="home" size={35} color="#006400" />
            <Text style={styles.iconText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleInfoUsuario}>
          <Icon name="account-circle" size={35} color="#006400" />
          <Text style={styles.iconText}>Info Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSignOut}>
            <Icon name="logout" size={35} color="#006400" />
            <Text style={styles.iconText}>Cerrar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    header: {
      height: 100,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 3,
      borderBottomColor: '#DDD',
      paddingTop: 20,
      flexDirection: 'row', // Para alinear el logo y el texto en la misma fil
       // Estilos de sombra para iOS
    shadowColor: 'rgba( 0, 800, 0, 1 )',
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 4,
    // Estilos de sombra para Android
    elevation: 30,
    },
    logo: {
      width: 70, 
      height: 60, 
      position: 'absolute',
      top: 35,
      right: 10,
    },
    menuButton: {
      position: 'absolute',
      top: 56,
      left: 10,
      zIndex: 1,
    },
    dropdownMenu: {
      position: 'absolute',
      top: 100,
      left: 0,
      right: 0,
      backgroundColor: '#FFF',
      zIndex: 2,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 4,
      borderBottomColor: '#006400',
      paddingHorizontal: 20,
    },
    menuItemText: {
      fontSize: 15,
      color: '#333',
      paddingLeft: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#006400',
      top: 10,
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    profileInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#32cd32',
      borderRadius: 50,
      height: 200,
    },
    profileInfo: {
      marginLeft: 50,
      
    },
    profileInfoText: {
      fontSize: 18,
      color: 'black',
      marginBottom: 10,
    },
    changePasswordButton: {
      backgroundColor: '#006400',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    changePasswordButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: 'red',
    },
    confirmButton: {
      backgroundColor: '#006400',
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    footer: {
      height: 90,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: 'white',
      shadowColor: 'rgba( 0, 500, 0, 1 )',
      shadowOffset: {
      width: 60,
      height: 60,
    },
      shadowOpacity: 10,
      shadowRadius: 10,
      // Estilos de sombra para Android
       elevation: 10,
    },
    
    iconButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: 13,
      color: '#006400',
      paddingTop: 5,
    },
  });

export default ReporteScreen;