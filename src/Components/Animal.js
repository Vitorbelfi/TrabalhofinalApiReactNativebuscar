import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Produto({ animalNome, animalFoto, animalRaca, animalTipo, animalCor,  animalSexo, animalObservacao, animalDtDesaparecimento, animalDtEncontro }) {
    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <Text style={css.animalNome}>{animalNome}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: animalFoto }} style={css.animalFoto}/>
            </View>
          
            
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: "100%",
        height: 600
    },
    boxTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft: 5
    },
    
    animalNome: {
        color: "white",
        textAlign: "center"
    },
    boxImage: {
        width: "100%",
        height: 390
    },
    animalFoto: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    categoryBox: {
        width: "100%",
        marginTop: 15
    },
    descriptionBox: {
        width: "100%",
        marginTop: 15,
        padding: 10
    },
    descriptionText: {
        color: "white",
        textAlign: "justify"
    },
    categoryBox: {
        width: "100%",
        padding: 10
    },
    categoryText: {
        color: "white"
    }
})