import React from 'react'
import {View,Text} from 'react-native'
import {showMessage} from 'react-native-flash-message'

import { connect } from 'react-redux';
import appActions  from '../../appActions'

import especialUppercase from '../../utils/especialUppercase'
import api from '../../services/api'
import Button from '../../components/Button'
import styles from './styles'

function Aula({navigation,accessToken,dispatch}){
 const aula = navigation.getParam('aula')
 function deleteAula(){
	api.deleteAula(aula._id)
	 .then(data=>{
		dispatch(appActions.setDays(data))
		showMessage({
		 message:'Sucesso',
		 description:'Aula deletada',
		 type:'default',
		 backgroundColor:'#50FA7B',
		 color:'#282A36'
		})
		setTimeout(()=>{
		 navigation.goBack()
		},1505)
	 })
	 .catch(error=>{
		showMessage({
		 message:'Erro',
		 description:error,
		 type:'default',
		 backgroundColor:'#ff5555',
		 color:'white'
		})

	 })
 }
 return (
	<View style={styles.container}>
	 <Text style={styles.week}>{`${especialUppercase(aula.week)} - ${aula.position} Aula`}</Text>
	 <Text style={styles.materia}>{especialUppercase(aula.materia)}</Text>
	 <Text style={styles.professor}>{aula.professor}</Text>
	 <Text style={styles.time}>{aula.time}</Text>{
		accessToken && 
		 <Button style={styles.button} onPress={()=>{
			navigation.navigate('AulaEditing',{title:'Editar Aula',newAula:false,aula})
		 }}value="Editar aula"/> 
	 }
		 {accessToken && <Button style={styles.button} onPress={deleteAula}value="Deletar aula"/>}
		</View>
 )
}

export default connect(store=>(
 {accessToken:store.accessToken}
))(Aula)
