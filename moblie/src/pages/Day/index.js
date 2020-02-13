import React from 'react';
import {
 ScrollView,
 RefreshControl,
 Text
} from 'react-native';

import api from '../../services/api'
import { connect } from 'react-redux';
import appActions  from '../../appActions';
import CardMateria from '../../components/CardMateria'
import CardAdd from '../../components/CardAdd'
import MessageScreen from '../../components/MessageScreen'
import styles from './styles'

function DayScreen(props){
 const {week} = props
 const dayData = props.days ? props.days[week] : null
 const [loading, setLoading] = React.useState(dayData?false:true)
 const [message, setMessage] = React.useState(null)
 function loadData(){
	setLoading(true)
	api.getDays()
	 .then(dataReceived=>{
		setLoading(false)
		props.dispatch(appActions.setDays(dataReceived))
	 })
	 .catch(error=>{
		setLoading(false)
		setMessage(error)
	 })
 }
 function toAula(aula){
	props.navigation.navigate("Aula",{aula:aula})
 }
 function newAula(){
	props.navigation.navigate("AulaEditing",{title:'Nova Aula',newAula:true})
 }
 api.loadAccessToken()
	.then(accessToken=>{
	 if(accessToken){
		props.dispatch(appActions.setAccessToken(accessToken))
	 }
	})
	.catch(console.log)

 React.useEffect(()=>{
	if(dayData === null){
	 loadData()
	}

 },[])
 function LoadContent(){
	if(loading){
	 return <MessageScreen type='loading' />
	}
	else if(message){
	 return <MessageScreen type={message} />
	}
	else if(dayData && dayData.length===0){
	 if(props.accessToken){
		return <CardAdd onPress={newAula}/>
	 }
	 else{
		return <MessageScreen type='empty' />
	 }
	}
	else if(dayData){
	 const aulas = 	dayData.map((e,i)=>{
		if(e){
		 return <CardMateria key={i} onPress={()=>toAula(e)} {...e} />
		}
		else return null
	 })
	 const addAula = <CardAdd onPress={newAula} key="addAula"/>
		if(props.accessToken) aulas.push(addAula)
	 return aulas
	}
 }

 return (
	<ScrollView 
	refreshControl={
	 <RefreshControl refreshing={loading} onRefresh={loadData}/>
	}
	 style={styles.container}>{
		LoadContent()
	 }</ScrollView>
 )
}
export default connect(store=>(
 {
	accessToken:store.accessToken,
	days:store.days
 }
))(DayScreen)
