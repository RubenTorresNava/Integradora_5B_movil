import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const AlumnosScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const [reportesVisible, setReportesVisible] = useState(false);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/integradora/alumnos');
        console.log(response.data);

        setDatos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const toggleMenu = () => {
    Animated.timing(menuHeight, {
      toValue: menuVisible ? 0 : 150,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setMenuVisible(!menuVisible);
  };

  const toggleReportes = () => {
    setReportesVisible(!reportesVisible);
  };

  const handleSignOut = () => {
    navigation.navigate('Login');
  };

  const handleLibros = () => {
    navigation.navigate('Libros');
  };

  const handleAlumnos = () => {
    // Puedes realizar acciones específicas para la sección de alumnos aquí
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handlePrestamos = () => {
    navigation.navigate('Prestamos');
  };

  const renderAlumnoItem = ({ item }) => (
    <TouchableOpacity style={styles.libroItem} onPress={() => console.log('Libro seleccionado:', prestamo.idprestamo)}>
      <Text style={styles.noCtrl}>NÚMERO DE CONTROL: {item.noCtrl}</Text>
      <Text style={styles.nombre}>NOMBRE: {item.nombre}</Text>
      <Text style={styles.apellidoP}>APELLIDO PATERNO: {item.apellidoP}</Text>
      <Text style={styles.apellidoM}>APELLIDO MATERNO: {item.apellidoM}</Text>
      <Text style={styles.carrera}>CARRERA: {item.carrera}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/utd.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#006400" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Alumnos</Text>
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
      </Animated.View>

      {/* Body section */}
      <View style={styles.body}>
        <Text style={styles.bodyContent}>Alumnos</Text>
        <FlatList
          data={datos}
          renderItem={renderAlumnoItem}
          keyExtractor={(item) => item.noCtrl.toString()}
          numColumns={2} // Define el número de columnas en tu cuadrícula
        />
      </View>

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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4F8EF7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
    minWidth: '45%', // Ajusta el ancho mínimo para adaptarse a la cuadrícula
  },
  noCtrl: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F8EF7',
  },
  nombre: {
    fontSize: 14,
    color: '#555',
  },
  apellidoP: {
    fontSize: 14,
    color: '#555',
  },
  apellidoM: {
    fontSize: 14,
    color: '#555',
  },
  carrera: {
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

export default AlumnosScreen;
