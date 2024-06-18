import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Detalhes({ handleVoltar, handleNovaObservacao, animal }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: animal.animalFoto }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>Informações</Text>
        <Text style={styles.subtitulo}>{animal.animalNome}</Text>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{animal.animalNome}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Raça:</Text>
          <Text style={styles.value}>{animal.animalRaca}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{animal.animalTipo}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Cor:</Text>
          <Text style={styles.value}>{animal.animalCor}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Sexo:</Text>
          <Text style={styles.value}>{animal.animalSexo}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Observação:</Text>
          <Text style={styles.value}>{animal.animalObservacao}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Data Desaparecimento:</Text>
          <Text style={styles.value}>{animal.animalDtDesaparecimento}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Data Encontro:</Text>
          <Text style={styles.value}>{animal.animalDtEncontro}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{animal.animalStatus}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.label}>Usuario:</Text>
          <Text style={styles.value}>{animal.usuarioId}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVoltar}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNovaObservacao}>
          <Text style={styles.buttonText}>Nova Observação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
     // Fundo escuro
      },
      subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        marginTop: -10, 
         // Cor laranja
      },
      imageContainer: {
        marginTop: 30,
        marginBottom: 20,
      },
      image: {
        width: 400, // Largura desejada para a imagem retangular
        height: 180, // Altura desejada para a imagem retangular
        borderRadius: 10, // Cantos ligeiramente arredondados
        resizeMode: 'cover',
         // Borda verde claro
        borderWidth: 3,
        marginBottom: 20, // 
      },
      infoContainer: {
        padding: 20,
        borderRadius: 8,
        width: '100%',
        // Fundo cinza escuro
      },
      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        top: -8,
        color: '#00FFFF', // Cor ciano
      },
      infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      label: {
        width: '40%',
        fontWeight: 'bold',
        color: 'black', // Cor verde claro
      },
      value: {
        flex: 1,
        color: 'black', // Cor branca
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
      },
      button: {
        backgroundColor: '#FF4500', // Cor laranja avermelhado
        borderRadius: 8,
        paddingVertical: 9,
        minWidth: 150,
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF', // Cor branca
        fontWeight: 'bold',
        fontSize: 20,
      },
    
});