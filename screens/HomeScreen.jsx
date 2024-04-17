import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const [numReportesLibros, setNumReportesLibros] = useState(50);
  const [numReportesAlumnos, setNumReportesAlumnos] = useState(20);
  const [countLibros, setCountLibros] = useState(0);
  const [countAlumnos, setCountAlumnos] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [tituloLibro, setTituloLibro] = useState('');

  // Función para obtener el total de libros
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/integradora/libros/count');
        setCountLibros(response.data.total);
      } catch (error) {
        console.error("Error al obtener el total de libros:", error);
      }
    };

    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/integradora/alumnos/count');
        setCountAlumnos(response.data.total);
      } catch (error) {
        console.error("Error al obtener el total de alumnos:", error);
      }
    }
    fetchAlumnos();
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
    setModalVisible(!modalVisible);
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
  const handleReporte = () => {
    navigation.navigate('Reporte');
  };
  const handleTemperatura = () => {
    navigation.navigate('Temperatura');
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
          <Text style={styles.menuItemText}>Prestamos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleReporte}>
          <Icon name="alert" size={22} color="#333" />
          <Text style={styles.menuItemText}>Reportes Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleTemperatura} >
          <Icon name="thermometer" size={22} color="#333" />
          <Text style={styles.menuItemText}>Temperatura</Text>
        </TouchableOpacity>
      </Animated.View>


      {/* Body section */}
      <View style={styles.body}>
        <Text style={styles.bodyContent}></Text>
        <View style={styles.reportesContainer}>
          <View style={styles.reportesBox}>
            <Text style={styles.reportesTitle}>Libros</Text>
            <Text style={styles.reportesCount}>
              <Icon name="book" size={40} color="white" /> {(countLibros || 0)}
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.reportesBox}>
            <Text style={styles.reportesTitle}>Alumnos</Text>
            <Text style={styles.reportesCount}>
              <Icon name="account-circle" size={40} color="white" /> {(countAlumnos || 0)}
            </Text>
          </View>
        </View>

        
        <View style={styles.visitasContainer}>
          <View style={styles.visitasBox}>
            <Text style={styles.visitasTitle}>Visitas</Text>
            <Text style={styles.visitasCount}>{numReportesAlumnos}</Text>
            <Icon name="eye" size={40} color="white" />
          </View>
        </View>
      </View>

      {/* Reportes Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Realizar reporte</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Asunto"
              value={tituloLibro}
              onChangeText={setTituloLibro}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={toggleReportes}
            >
              <Text style={styles.modalButtonText}>Reportar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: 'red', marginTop: 10 }]}
              onPress={() => setModalVisible(false)} // Evento para cerrar el modal
            >
               <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="home" size={35} color="#006400" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggleReportes}>
          <Icon name="alert" size={35} color="#006400" />
          <Text style={styles.iconText}>Reportes</Text>
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
    flexDirection: 'row', 
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
    height: 250, // Ajusta esta altura según sea necesario para que todas las opciones sean visibles
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
    padding: 30,
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
  visitasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  visitasBox: {
    backgroundColor: '#006400', 
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  visitasTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  visitasCount: {
    fontSize: 30,
    color: 'white',
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 200,
  },
  modalButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    height: 90,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'white',
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

export default HomeScreen;
