import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AlumnosScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const [reportesVisible, setReportesVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Alumnos</Text>
      </View>

      {/* Animated Dropdown Menu */}
      <Animated.View style={[styles.dropdownMenu, { height: menuHeight }]}>
        <TouchableOpacity style={styles.menuItem} onPress={handleAlumnos}>
          <Icon name="account-circle" size={20} color="#333" />
          <Text style={styles.menuItemText}>Alumnos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLibros}>
          <Icon name="book" size={20} color="#333" />
          <Text style={styles.menuItemText}>Libros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handlePrestamos}>
          <Icon name="note-outline" size={20} color="#333" />
          <Text style={styles.menuItemText}>Prestamos</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Body section */}
      <View style={styles.body}>
        <Text style={styles.bodyContent}>Alumnos con prestamos</Text>
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
          <Icon name="home" size={35} color="#4F8EF7" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggleReportes}>
          <Icon name="alert" size={35} color="#4F8EF7" />
          <Text style={styles.iconText}>Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSignOut}>
          <Icon name="logout" size={35} color="#4F8EF7" />
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
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#DDD',
    paddingTop: 20,
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
    color: '#FFFFFF',
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
    backgroundColor: '#006400',
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
    fontSize: 12,
    color: 'white',
    paddingTop: 5,
  },
});

export default AlumnosScreen;
