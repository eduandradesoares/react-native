import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, AsyncStorageStatic } from 'react-native';
import Header  from './components/Header.js';
import Body  from './components/Body.js';

export default function App (){

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(()=>{
    //Quando inicar o app queremos que leia a key anotacao.

    (async () => {
      try{
        const anotacaoLeitura = await AsyncStorageStatic.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      }catch(error){}
    })();

  },[])  
  
  setData = async() =>{
    try{
      await AsyncStorageStatic.setItem('anotacao', anotacao);
    } catch(error){

    }

    alert('Sua anotação foi salva!')
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }
    
  if(estado == 'leitura'){
    return(
    
      <View style={{flex:1}}>  
        <StatusBar style="light" />      
            <View style={styles.header}><Text style={{textAlign: 'center', color: 'white', fontSize:20}}>App de Anotação</Text></View>
              {
              (anotacao != '')?
              <View><Text style={styles.anotacao}>{anotacao}</Text></View>
              :
              <View><Text style={{opacity:0.3}}>Nenhuma anotação encontrada</Text></View>
              }
            <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}>
              {
                (anotacao == '')?
                <Text style={styles.btnAnotacaoTexto}>+</Text>
                :
                <Text style={styles.btnAnotacaoTexto}>editar</Text>
              }
            </TouchableOpacity>

      </View>
    );   
  }else if(estado == 'atualizando'){
    return(
    
      <View style={{flex:1}}>  
        <StatusBar style="light" />      
            <View style={styles.header}><Text style={{textAlign: 'center', color: 'white', fontSize:20}}>App de Anotação</Text></View>

              
            <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao} style={{padding: 20, textAlignVertical: 'top', height:200}}></TextInput>
            <TouchableOpacity onPress={() => atualizarTexto()} style={styles.btnAnotacao}><Text style={styles.btnAtualizandoTexto}>Salvar</Text></TouchableOpacity>
      </View>
    );   
  }  
 
}

const styles = StyleSheet.create({
    header:{
      width: '100%',
      paddingTop: 20,
      paddingBottom: 10,
      backgroundColor: '#069'
    },
    anotacao:{
      fontSize: 14,
      padding: 30,
      textAlign: 'justify'
    },
    btnAnotacao:{
      position: 'absolute',
      right: 30,
      bottom: 20,
      width: 50,
      height: 50,
      backgroundColor: '#FBC02D',
      borderRadius: 25,
    },
    btnAnotacaoTexto:{
      color: 'white',
      position: 'relative',
      textAlign: 'center',
      top: 7,
      fontSize: 25
    },
    btnAtualizandoTexto:{
      color: 'white',
      position: 'relative',
      textAlign: 'center',
      top: 12,
      fontSize: 15
    }
});


