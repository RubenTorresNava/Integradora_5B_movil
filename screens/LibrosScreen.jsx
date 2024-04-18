import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const LibrosScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const [reportesVisible, setReportesVisible] = useState(false);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:7800/api/libro/obtenerLibros');
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };
    fetchLibros();
  }, []);

  const toggleMenu = () => {
    Animated.timing(menuHeight, {
      toValue: menuVisible ? 0 : 280,
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

  const handleAlumnos = () => {
    navigation.navigate('Alumnos');
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handlePrestamos = () => {
    navigation.navigate('Prestamos');
  };
  const handleReporte = () => {
    navigation.navigate('Reporte');
  };
 

  const handleInfoUsuario = () => {
    navigation.navigate('Usuario');
  };
  const handleTemperatura = () => {
    navigation.navigate('Temperatura');
  };
  

  const handleLibros = () => {
    // Puedes realizar acciones específicas para la sección de libros aquí
  };
  
  const handleNuevoLibro = () => {
    // Puedes implementar acciones relacionadas con la creación de un nuevo libro aquí
  };

  const handlePrestamo = () => {
    // Puedes implementar acciones relacionadas con la gestión de préstamos aquí
  };

  const renderLibroItem = ({ item }) => (
    <TouchableOpacity style={styles.libroItem} onPress={() => console.log('Libro seleccionado:', item.titulo)}>
      <Text style={styles.libroTitulo}>Titulo del libro: {item.titulo}</Text>
      <Text style={styles.libroAutor}>Autor: {item.autor}</Text>
      <Text style={styles.libroAutor}>Editorial: {item.editorial}</Text>

    </TouchableOpacity>
  );

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
        <Text style={styles.headerText}>Libros</Text>
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
          <Text style={styles.menuItemText}>Prestamos</Text>
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
      <FlatList
        style={styles.body}
        data={datos}
        renderItem={renderLibroItem}
        keyExtractor={(item) => item.titulo.toString()}
        numColumns={2} // Define el número de columnas en tu cuadrícula
      />

      {/* Reportes Overlay */}
      {reportesVisible && (
        <View style={styles.reportesOverlay}>
          <View style={styles.reportesForm}>
            <Text style={styles.reportesTitle}>Reportar Libro Perdido</Text>
            <TextInput
              style={styles.reportesInput}
              placeholder="Título del libro"
              // Agrega otros atributos según tus necesidades
            />
            {/* Agrega más campos y botones según tus necesidades */}
            <TouchableOpacity style={styles.reportesButton} onPress={toggleReportes}>
              <Text style={styles.reportesButtonText}>Reportar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
    borderBottomColor: '#DDD',
    paddingHorizontal: 30,
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
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  bodyContent: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  libroItem: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4F8EF7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
    flex: 1,
    minWidth: '45%',
  },
  libroTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F8EF7',
  },
  libroAutor: {
    fontSize: 14,
    color: '#555',
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
  reportesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default LibrosScreen;
