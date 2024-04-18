import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Paho from 'paho-mqtt';

const client = new Paho.Client("broker.hivemq.com", 8000, "cliente-iot");

const TemperaturaScreen = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);

  useEffect(() => {
    const onMessage = (message) => {
      if (message.destinationName === "ruben/temperatura") {
        const newTemperatura = parseFloat(message.payloadString);
        console.log("Nuevo valor de temperatura:", newTemperatura);
        setTemperatura(newTemperatura);
      } else if (message.destinationName === "ruben/humedad") {
        const newHumedad = parseFloat(message.payloadString);
        console.log("Nuevo valor de humedad:", newHumedad);
        setHumedad(newHumedad);
      }
    };

    client.connect({
      onSuccess: () => {
        console.log("Conectado al broker MQTT");
        client.subscribe("ruben/temperatura");
        client.subscribe("ruben/humedad");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Error al conectar al broker MQTT");
      }
    });

    return () => client.disconnect();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperatura y Humedad</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={[
            {
              name: 'Temperatura',
              population: temperatura,
              color: '#3875e8',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Humedad',
              population: humedad,
              color: '#ff0000',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
          ]}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
            strokeWidth: 2,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />

      </View>
      {temperatura !== null && humedad !== null && (
        <>
          <Text style={styles.text}>Temperatura: {temperatura.toFixed(2)}°C</Text>
          <Text style={styles.text}>Humedad: {humedad.toFixed(2)}%</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TemperaturaScreen;
