import React from 'react'
import {View,Picker} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {showMessage} from 'react-native-flash-message'
import {connect} from 'react-redux'

import appActions from '../../appActions'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import especialUppercase from '../../utils/especialUppercase'
import api from '../../services/api'
import styles from './styles'

function AulaEditing(props){
 const newAula = props.navigation.getParam('newAula')
 const aula = props.navigation.getParam('aula')

 function generateDateFromString(time,start){
	const re = /(\d{2}):(\d{2})-(\d{2}):(\d{2})/gm
	const results = re.exec(time)
	const dateAtual = new Date()
	const date = new Date(2020,11,1,results[start?1:3],results[start?2:4])
	return date
 }
 const [materia, setMateria] = React.useState(newAula?'':aula.materia)
 const [professor, setProfessor] = React.useState(newAula?'':aula.professor)
 const [timeStart, setTimeStart] = React.useState(newAula?new Date():generateDateFromString(aula.time,true))
 const [timeStartShow, setTimeStartShow] = React.useState(false)
 const [timeEnd, setTimeEnd] = React.useState(newAula?new Date():generateDateFromString(aula.time,false))
 const [timeEndShow, setTimeEndShow] = React.useState(false)

 const [position, setPosition] = React.useState(newAula?'':`${aula.position}`)
 const [week, setWeek] = React.useState(newAula?'':aula.week)
 function formateTime(time){
	return `${time.getHours()<10? `0${time.getHours()}` : time.getHours()}:${time.getMinutes() <10 ? `0${time.getMinutes()}` : time.getMinutes()}`
 }
 function prepareTimeToSave(){
	return formateTime(timeStart)+'-'+formateTime(timeEnd)
 }
 function save(data){
	function padraoResolve(days){
	 props.dispatch(appActions.setDays(days))
	 setTimeout(()=>{
		props.navigation.navigate('Quadro')
	 },1505)
	 showMessage({
		message:'Sucesso',
		description:'Salvo com sucesso',
		type:'default',
		backgroundColor:'#50FA7B',
		color:'#282A36'
	 }) 
	}
	function padraoReject(error){
	 showMessage({
		message:'Erro',
		description:error,
		type:'default',
		backgroundColor:'#FF5555',
		color:'#282A36'
	 }) 
	}
	if(newAula){
	 api.createAula({
		materia,
		professor,
		position,
		week,
		time:prepareTimeToSave()
	 })
		.then(padraoResolve)
		.catch(padraoReject)
	}
	else{
	 api.updateAula({
		id:aula._id,
		materia,
		professor,
		position,
		week,
		time:prepareTimeToSave()
	 })
		.then(padraoResolve)
		.catch(padraoReject)
	}
 }
 return (
	<View style={styles.container} >
	 <TextInput value={especialUppercase(materia)} onChangeText={t=>setMateria(t.toLowerCase())} style={styles.element} placeholder='Nome da materia:'/>
	 <TextInput value={professor} onChangeText={setProfessor} style={styles.element} placeholder='Nome do professor'/>
	 <Picker
	 selectedValue={week}
	 onValueChange={(e)=>setWeek(e)}
	 style={styles.elementPicker} >
	 <Picker.Item value='segunda' label='Segunda'></Picker.Item>
	 <Picker.Item value='terça' label='Terça'></Picker.Item>
	 <Picker.Item value='quarta' label='Quarta'></Picker.Item>
	 <Picker.Item value='quinta' label='Quinta'></Picker.Item>
	 <Picker.Item value='sexta' label='Sexta'></Picker.Item>
	</Picker>
	<TextInput
	value={position}
	onChangeText={newValue=>{
	 if(newValue){
		setPosition(`${parseInt(newValue)}`)
	 }
	 else setPosition('')
	}}
	keyboardType='numeric'
	style={styles.element}
	placeholder='Numero da aula'/>
	<Button style={styles.element} onPress={()=>{setTimeStartShow(true)}} value={`Inserir horario de inicio: ${formateTime(timeStart)}`}/>
	{timeStartShow &&
		<DateTimePicker
		onChange={(event,timeReceived)=>{
		 setTimeStartShow(false)
		 setTimeStart(timeReceived ||timeStart )
		}}
		value={timeStart}
		mode={'time'}
	 />
	}
		<Button style={styles.element} onPress={()=>{setTimeEndShow(true)}} value={`Inserir horario de fim: ${formateTime(timeEnd)}`}/>
		{timeEndShow &&
			<DateTimePicker
			onChange={(event,timeReceived)=>{
			 setTimeEndShow(false)
			 setTimeEnd(timeReceived ||timeEnd )
			}}
			value={timeEnd}
			mode={'time'}
		 />
		}
			<Button onPress={save} style={styles.element} value='Salvar'/>
		 </View>
 )
}
export default connect(store=>(
 {accessToken:store.accessToken}
))(AulaEditing)
