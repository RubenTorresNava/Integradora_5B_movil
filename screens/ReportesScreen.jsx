import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const ReportesScreen = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHeight = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(true);
    const [librosDisponibles, setLibrosDisponibles] = useState([]);
    const [prestamosVencidos, setPrestamosVencidos] = useState([]);
    const [visitas, setVisitas] = useState([]);
    const [motivosVisitas, setMotivosVisitas] = useState([]);

    // Función para obtener el total de libros
    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:3000/integradora/libros/count'),
            axios.get('http://localhost:3000/integradora/prestamos/prestamos-vencidos'),
            axios.get('http://localhost:3000/integradora/visitas/visitas'),
            axios.get('http://localhost:3000/integradora/visitas/motivo-visitas')
        ])
        .then(([librosResponse, prestamosResponse, visitasResponse, motivosResponse]) => {
            setLibrosDisponibles(librosResponse.data);
            setPrestamosVencidos(prestamosResponse.data);
            setVisitas(visitasResponse.data);
            setMotivosVisitas(motivosResponse.data);
            setLoading(false);
        })        
    }, []);

    if(loading){
        return(
            <View style={styles.body}>
                <ActivityIndicator size="large" color="#006400" />
            </View>
        );
    }
    const toggleMenu = () => {
      Animated.timing(menuHeight, {
        toValue: menuVisible ? 0 : 150,
        duration: 200,
        useNativeDriver: false,
      }).start();
  
      setMenuVisible(!menuVisible);
    };
  
    const toggleReportes = () => {
      navigation.navigate('Reportes');
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
        </Animated.View>
  
        {/* Body section */}
        <View style={styles.body}>
            <View>
                <View>
                    <Text>Libros Disponibles</Text>
                    <Text>{librosDisponibles.total}</Text>
                    <Text>Visitas</Text>
                    <Text>{visitas.length}</Text>
                    <Text>Motivos de Visitas</Text>
                    <Text>{motivosVisitas.length}</Text>
                    <Text>Prestamos Vencidos</Text>
                    <Text>{prestamosVencidos.length}</Text>
                </View>
            </View>        
        </View>

        {/* Footer section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleHome}>
            <Icon name="home" size={35} color="#006400" />
            <Text style={styles.iconText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleReportes}>
            <Icon name="alert" size={35} color="#006400" />
            <Text style={styles.iconText}>Reportes</Text>
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
    },
    bodyContent: {
      fontSize: 18,
      color: '#333',
    },
    reportesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 30,
    },
    reportesBox: {
      backgroundColor: 'green',
      padding: 50,
      borderRadius: 30,
      alignItems: 'center',
    },
    reportesTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    reportesCount: {
      fontSize: 30,
      color: 'white',
      marginTop: 5,
    },
    separator: {
      width: 20,
    },
    reportesOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    reportesForm: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: 300,
    },
    reportesInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
    reportesButton: {
      backgroundColor: '#4F8EF7',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    reportesButtonText: {
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
export default ReportesScreen;