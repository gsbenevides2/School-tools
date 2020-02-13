import React from 'react'
import {
 View,
 Image,
} from 'react-native'
import styles from './styles'

import api from '../../services/api'
import { connect } from 'react-redux'
import appActions from '../../appActions'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { showMessage } from "react-native-flash-message";
const login = require('../../../assets/login.png')

function Auth(props){
 const [token,setToken] = React.useState('')

 function authButtonPressed(){
	api.validAccessToken(token)
	 .then(()=>{
		showMessage({
		 message:'Sucesso',
		 type:'default',
		 backgroundColor:"#50FA7B",
		 color:'#282A36',
		 description:'Seja bem-vindo'
		})
		props.dispatch(appActions.setAccessToken(token))
		setTimeout(()=>{
		 props.navigation.navigate("Settings")
		},1508)
	 })
	 .catch(error=>{
		showMessage({
		 message:'Erro',
		 type:'default',
		 backgroundColor:"#ff5555",
		 color:'white',
		 description:error
		})
	 })
 }

 return(
	<View style={styles.container}>
	 <Image style={styles.image} source={login}/>
	 <TextInput
	 value={token}
	 onChangeText={setToken}
	 style={styles.textInput}
	 placeholder="Insira o token de acesso:"
	/>
		<Button onPress={authButtonPressed} value="Autenticar"/>
	 </View>
 )
}

export default connect(store => (
 { accessToken: store.accessToken }
))(Auth)
