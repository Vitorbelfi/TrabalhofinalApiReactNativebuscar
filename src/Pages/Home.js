import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Animated, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AnimaisDesc from './AnimaisDesc';
import Detalhes from './Detalhes';
import NovaObservacao from './NovaObservacao';

export default function Home() {
  const [animaisDesc, setAnimaisDesc] = useState([]);
  const [error, setError] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [adicionarObservacao, setAdicionarObservacao] = useState(false);
  const [animal, setAnimal] = useState(null);

  const animaisfiltrados = animaisDesc.filter(animal => animal.animalStatus == 1);

  const fade = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [fade])
  );

  async function getAnimaisDesc() {
    await fetch('http://10.139.75.40/api/Animais/GetAllAnimals', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setAnimaisDesc(json))
      .catch(err => setError(true));
  }

  useEffect(() => {
    getAnimaisDesc();
  }, []);

  function exibirdetalhes(item) {
    setDetalhes(true);
    setAnimal(item);
  }

  function fecharDetalhes() {
    setDetalhes(false);
    setAnimal(null);
  }

  function irParaNovaObservacao() {
    setAdicionarObservacao(true);
  }

  function voltarParaDetalhes() {
    setAdicionarObservacao(false);
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fade }}>
        {adicionarObservacao ? (
          <NovaObservacao handleVoltar={voltarParaDetalhes} animal={animal} />
        ) : detalhes ? (
          <Detalhes handleVoltar={fecharDetalhes} handleNovaObservacao={irParaNovaObservacao} animal={animal} />
        ) : animaisDesc.length > 0 ? (
          <FlatList
            data={animaisfiltrados}
            renderItem={({ item }) =>
              <View style={styles.itemContainer}>
                <AnimaisDesc animalFoto={item.animalFoto} animalNome={item.animalNome} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => exibirdetalhes(item)}>
                    <Text style={styles.buttonText}>Detalhes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            keyExtractor={(item) => item.animalId.toString()}
          />
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
      },
      itemContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        marginVertical: 10,
        padding: 30,
        alignItems: 'center',
        width: '90%',
        elevation: 5,  // Para sombra em Android
        shadowColor: '#000',  // Para sombra em iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
        width: '90%',
      },
      button: {
        backgroundColor: 'red',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      },
    
});