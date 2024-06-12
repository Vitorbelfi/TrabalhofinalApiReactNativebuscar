import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
    const [clientes, setClientes ] = useState([]);
    const [error, setError ] = useState(false);
    const [busca, setBusca] = useState(false);
    const [filtro, setFiltro ] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [clientId, setClientId ] = useState("");
    const [clientNome, setNome] = useState('');
    const [clientEmail, setEmail] = useState('');
    const [clientGenere, setGenere] = useState('');
    const [animalCor, setanimalCor ] = useState('');

    async function getClientes() {
        await fetch('http://10.139.75.40/api/Animais/GetAllAnimals', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => setClientes(json))
        .catch(err => setError(true));
    }

    async function getCliente(id) {
        await fetch('http://10.139.75.40/api/Animais/GetAnimalId/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => {
            setClientId(json.clientId);
            setNome(json.clientName);
            setEmail(json.clientEmail);
            setGenere(json.clientGenere);
            setanimalCor(json.animalCor);
        });
    }

    async function editClient() {
        await fetch('http://10.139.75.40/api/Client/UpdateClient/' + clientId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                clientId: clientId,
                clientName: clientNome,
                clientEmail: clientEmail,
                clientGenere: clientGenere,
                animalCor: animalCor
            })
        })
        .then((response) => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
        getClientes();
        setEdicao(false);
    }

    
   
    useEffect(() => {
        getClientes();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getClientes();
        }, [])
    );

    return (
        <View style={styles.container}>
         
               
                
                <View style={styles.editar}>
                    
                   



                    <FlatList
        style={styles.flat}
        data={clientes}
        keyExtractor={(item) => item.animalId}
        renderItem={({ item }) => (
            <View style={styles.clientContainer}>
               
                <Text style={styles.clientName}>
                    Nome: <Text style={styles.clientData}>{item.animalNome}</Text>
                </Text>
                <Text style={styles.clientName}>
                    Tipo: <Text style={styles.clientData}>{item.animalTipo}</Text>
                </Text>
                <Text style={styles.clientName}>
                    Cor: <Text style={styles.clientData}>{item.animalCor}</Text>
                </Text>
                <Text style={styles.clientName}>
                    Sexo: <Text style={styles.clientData}>{item.animalSexo}</Text>
                </Text>
                <Text style={styles.clientName}>
                    Data desaparecimento: <Text style={styles.clientData}>{item.animalDtDesaparecimento}</Text>
                </Text>
                <Text style={styles.clientName}>
                    Data Encontro: <Text style={styles.clientData}>{item.animalDtEncontro}</Text>
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.btnEdit}
                        onPress={() => {
                            setEdicao(true);
                            getCliente(item.usuarioId);
                        }}
                    >
                           <TouchableOpacity style={styles.btnSave} onPress={() => editClient(false)}>
                        <Text style={styles.btnSaveText}>Voltar</Text>
                    </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        )}
    />
          
                </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  flat: {
    width: "100%",
    marginTop: 20,
  },
  
  clientContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  clientName: {
    fontSize: 20, // Aumentando o tamanho da fonte para dar mais destaque
    color: "#1a1a1a", // Usando um tom de azul escuro para um visual mais elegante
    marginBottom: 15, // Ajustando o espaçamento inferior
    fontWeight: "bold",
    textDecoration: "underline", // Adicionando sublinhado
  },
  clientData: {
    fontSize: 18, // Definindo um tamanho de fonte ligeiramente menor
    color: "#777", // Usando uma cor mais suave
    marginBottom: 10,
    fontFamily: "sans-serif", // Definindo uma fonte diferente, substitua pelo nome da fonte desejada
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 4, // Definindo a largura da borda
    borderColor: '#000', // Cor da borda, você pode ajustar conforme necessário
    borderRadius: 10, // Bordas arredondadas, se desejado
  },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnEdit: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
 
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  editar: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
  },
  
  btnSave: {
    backgroundColor: "#4CAF50",
    padding: 15 ,
    borderRadius: 5,
    alignItems: "center",
    cursor: "pointer",
  },
  btnSaveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  
 
});

