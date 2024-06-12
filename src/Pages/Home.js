import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
    const [clientes, setClientes] = useState([]);
    const [edicao, setEdicao] = useState(false);
    const [clientId, setClientId] = useState("");
    const [animalNome, setAnimalNome] = useState('');
    const [animalFoto, setAnimalFoto] = useState();
    const [clientEmail, setEmail] = useState('');
    const [clientGenere, setGenere] = useState('');
    const [animalCor, setAnimalCor] = useState('');
    const [animalRaca, setAnimalRaca] = useState('');
    const [animalTipo, setAnimalTipo] = useState('');
    const [animalSexo, setAnimalSexo] = useState('');
    const [animalDtDesaparecimento, setAnimalDtDesaparecimento] = useState('');
    const [animalDtEncontro, setAnimalDtEncontro] = useState('');

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
            setClientId(id);      
            setAnimalNome(json.animalNome);
            setAnimalFoto(json.animalFoto);
            setAnimalRaca(json.animalRaca);
            setAnimalTipo(json.animalTipo);
            setAnimalSexo(json.animalSexo);
            setAnimalDtDesaparecimento(json.animalDtDesaparecimento);
            setAnimalDtEncontro(json.animalDtEncontro);
            setAnimalCor(json.animalCor);
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
                animalNome: animalNome,
                clientEmail: clientEmail,
                clientGenere: clientGenere,
                animalCor: animalCor
            })
        })
        .then((response) => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
        getClientes();
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
            
            {edicao == false ?
                <FlatList
                    style={styles.flat}
                    data={clientes}
                    keyExtractor={(item) => item.animalId}
                    renderItem={({ item }) => (
                        
                        <View style={styles.clientContainer}>
                           
                            <Image source={{ uri: item.animalFoto }} style={styles.image} />
                            <Text style={styles.clientName}>Nome: <Text style={styles.clientData}>{item.animalNome}</Text></Text>
                            <View style={styles.buttonContainer}>

                           

                                <TouchableOpacity style={styles.btnEdit} onPress={() => { setEdicao(true); getCliente(item.animalId) }}>
                                    <Text style={styles.btnText}>DETALHES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                :
                <View style={styles.editar}>
                    <View style={styles.clientContainer}>
                        <Text style={styles.tituloinformacoes}>INFORMAÇÕES</Text>
                        <Text style={styles.clientName}>
                            Nome: <Text style={styles.clientData}>{animalNome}</Text>
                        </Text>
                        <Text style={styles.clientName}>
                            Tipo: <Text style={styles.clientData}>{animalTipo}</Text>
                        </Text>
                        <Text style={styles.clientName}>
                            Cor: <Text style={styles.clientData}>{animalCor}</Text>
                        </Text>
                        <Text style={styles.clientName}>
                            Sexo: <Text style={styles.clientData}>{animalSexo}</Text>
                        </Text>
                        <Text style={styles.clientName}>
                            Data desaparecimento: <Text style={styles.clientData}>{animalDtDesaparecimento}</Text>
                        </Text>
                        <Text style={styles.clientName}>
                            Data Encontro: <Text style={styles.clientData}>{animalDtEncontro}</Text>
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.btnSave} onPress={() => setEdicao(false)}>
                                <Text style={styles.btnSaveText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSave} onPress={() => setEdicao(false)}>
                                <Text style={styles.btnSaveText}>Nova Observação</Text>
                            </TouchableOpacity>
                           
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titulohome:{
        fontSize: 45,
        fontWeight: 'bold',
    },
    tituloinformacoes:{
        fontSize: 45,
        fontWeight: 'bold',
        color:'#999',
        textDecorationLine: 'underline',
    },
    flat: {
        marginTop: 10,
    },
    clientContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clientData: {
        fontWeight: 'normal',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    btnEdit: {
        backgroundColor: '#28a7',
        padding: 10,
        borderRadius: 5,
    },
    btnText: {
        color: '#fff',
    },
    editar: {
        padding: 20,
    },
    btnSave: {
        backgroundColor: '#28a7',
        padding: 10,
        borderRadius: 5,
    },
    btnSaveText: {
        color: '#fff',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 50,
      
        width: 200,
        height: 200,
        borderWidth: 4, 
        borderColor: '#000', 
        borderRadius: 60, 
        marginLeft: 57,
    },
});
