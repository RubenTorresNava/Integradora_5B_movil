import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.timing(menuHeight, {
      toValue: menuVisible ? 0 : 150, 
      duration: 200,
      useNativeDriver: false, 
    }).start();

    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggleMenu}
        >
          <Icon name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Biblioteca</Text>
      </View>

      {/* Animated Dropdown Menu */}
      <Animated.View style={[styles.dropdownMenu, { height: menuHeight }]}>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /*  */ }}>
          <Icon name="account-circle" size={20} color="#333" />
          <Text style={styles.menuItemText}>Alumnos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /*  */ }}>
          <Icon name="book" size={20} color="#333" />
          <Text style={styles.menuItemText}>Libros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /*  */ }}>
          <Icon name="exit-to-app" size={20} color="#333" />
          <Text style={styles.menuItemText}>Salir</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Body section */}
      <View style={styles.body}>
        <Text style={styles.bodyContent}>Bienvenidos!</Text>
      </View>

      {/* Footer section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="home" size={30} color="#4F8EF7" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="magnify" size={30} color="#4F8EF7" />
          <Text style={styles.iconText}>Busqueda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="account" size={30} color="#4F8EF7" />
          <Text style={styles.iconText}>Perfil</Text>
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
    backgroundColor: 'green',
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
  footer: {
    height: 90,
    backgroundColor: 'green',
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

export default HomeScreen;
