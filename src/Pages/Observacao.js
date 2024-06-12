import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Observacoes() {
    const [addingObservation, setAddingObservation] = useState(false); // Estado para adicionar observação

    // Estados para os campos da nova observação
    const [observationDescription, setObservationDescription] = useState('');
    const [observationLocation, setObservationLocation] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [observationAnimal, setObservationAnimal] = useState('');

    async function saveObservation() {
        const observation = {
            description: observationDescription,
            location: observationLocation,
            date: observationDate,
            animal: observationAnimal,
            userId: 0
        };

        try {
            const response = await fetch('http://10.139.75.40/api/Observacoes/GetAllObservacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(observation)
            });
            const json = await response.json();
            Alert.alert('Sucesso', `Observação salva com ID: ${json.id}`);
            setAddingObservation(false); 
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a observação');
        }
    }

    return (
        <View style={styles.container}>
             <Text style={styles.tituloinformacoes}>OBSERVAÇÕES</Text>
            {addingObservation ? (
                
                <View style={styles.innerContainer}>
                    <Text style={styles.label}>Descrição:</Text>
                    <TextInput
                        style={styles.input}
                        value={observationDescription}
                        onChangeText={setObservationDescription}
                    />
                    <Text style={styles.label}>Local:</Text>
                    <TextInput
                        style={styles.input}
                        value={observationLocation}
                        onChangeText={setObservationLocation}
                    />
                    <Text style={styles.label}>Data:</Text>
                    <TextInput
                        style={styles.input}
                        value={observationDate}
                        onChangeText={setObservationDate}
                        placeholder="YYYY-MM-DD"
                    />
                    <Text style={styles.label}>Animal:</Text>
                    <TextInput
                        style={styles.input}
                        value={observationAnimal}
                        onChangeText={setObservationAnimal}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnSave} onPress={saveObservation}>
                            <Text style={styles.btnSaveText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => setAddingObservation(false)}>
                            <Text style={styles.btnSaveText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity style={styles.btnAddObservation} onPress={() => setAddingObservation(true)}>
                    <Text style={styles.btnAddObservationText}>Adicionar Observação</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tituloinformacoes:{
        fontSize: 45,
        fontWeight: 'bold',
        color:'#999',
        textDecorationLine: 'underline',
    },
    innerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        height: 40, // Aumentei a altura para 50
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        width: 200,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    btnSave: {
        backgroundColor: '#28a7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btnCancel: {
        backgroundColor: '#f44336',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btnSaveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnAddObservation: {
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    btnAddObservationText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
