import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Insert({ animal, handleVoltar }) {

  const [observacoesId, setObservacoesId] = useState(0);  
  const [observacaoDescricao, setObservacaoDescricao] = useState('');
  const [observacaoLocal, setObservacaoLocal] = useState('');
  const [observacaoData, setObservacaoData] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  async function InsertObservacoes() {
    try {
      if (!observacaoData) {
        throw new Error('Data da Observação é obrigatória.');
      }
      const formattedData = new Date(observacaoData).toISOString();
  
      await fetch('http://10.139.75.40/api/Observacoes/CreateObservacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          observacoesId: observacoesId,
          observacaoDescricao: observacaoDescricao,
          observacaoLocal: observacaoLocal,
          observacaoData: formattedData,
          animalId: animalId,
          usuarioId: usuarioId
        })
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          // Limpar os campos após salvar com sucesso
          setObservacaoDescricao('');
          setObservacaoLocal('');
          setObservacaoData('');
          setAnimalId('');
          setUsuarioId('');
        })
        .catch(err => console.error('Erro ao enviar requisição:', err));
    } catch (error) {
      console.error('Erro ao processar data:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: animal.animalFoto }} style={styles.image} />
      </View>
      <Text style={styles.title}>Adicionar Observação</Text>
      <Text style={styles.subtitle}>{animal.animalNome}</Text>
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={observacaoDescricao}
        onChangeText={setObservacaoDescricao}
        placeholderTextColor='gray'
      />
      <TextInput
        placeholder='Local da Observação'
        style={styles.input}
        value={observacaoLocal}
        onChangeText={setObservacaoLocal}
        placeholderTextColor='gray'
      />
      <TextInput
        placeholder='Data da Observação (AAAA-MM-DD)'
        style={styles.input}
        value={observacaoData}
        onChangeText={text => setObservacaoData(text)}
        placeholderTextColor='gray'
      />
      <TextInput
        placeholder='ID do Animal'
        style={styles.input}
        value={animalId}
        onChangeText={setAnimalId}
        placeholderTextColor='gray'
        keyboardType='numeric'
      />
      <TextInput
        placeholder='ID do Usuário'
        style={styles.input}
        value={usuarioId}
        onChangeText={setUsuarioId}
        placeholderTextColor='gray'
        keyboardType='numeric'
      />
      <TouchableOpacity style={styles.button} onPress={() => InsertObservacoes()}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'black', borderColor: 'white', borderWidth: 1 }]} onPress={handleVoltar}>
        <Text style={[styles.buttonText, { color: 'white' }]}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
         // Fundo cinza escuro
        paddingHorizontal: 50,
        borderRadius: 8,
      },
      title: {
        fontSize: 20,
        top: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFD700', // Cor dourada
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
         // Cor verde claro
      },
      input: {
        width: '100%',
        height: 40,
        // Fundo cinza mais escuro
        marginBottom: 10,
        paddingHorizontal: 10,
        
        borderRadius: 5,
      
        borderWidth: 1,
      },
      button: {
        width: '100%',
        height: 40,
        backgroundColor: 'red', // Fundo verde claro
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#1a1a1a', // Texto preto
        fontSize: 16,
        fontWeight: 'bold',
      },
      image: {
        width: 400, // Largura desejada para a imagem retangular
        height: 200, // Altura desejada para a imagem retangular
        borderRadius: 10, // Cantos ligeiramente arredondados
        resizeMode: 'cover',
         // Borda verde claro
        borderWidth: 3,
        marginBottom: 20, // Adicionar margem inferior para evitar sobreposição
      },
    
});