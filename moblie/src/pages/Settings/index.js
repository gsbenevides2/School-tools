import React from 'react'
import {
 ScrollView,
 TouchableNativeFeedback,
 TouchableOpacity,
 View,
 Text,
 AsyncStorage
} from 'react-native'

import { connect } from 'react-redux'
import appActions from '../../appActions'
import {FontAwesome} from '@expo/vector-icons'
import styles from './styles'

function Settings(props){
 function logout(){
	props.dispatch(
	 appActions.setAccessToken(null)
	)
	AsyncStorage.removeItem("accessToken")
 }
 return (
	<ScrollView style={styles.container}>
	 {
		!props.accessToken?
		<TouchableNativeFeedback onPress={()=>{
		 props.navigation.navigate("Auth")
		}}>
		<View style={styles.item}>
		 <FontAwesome style={styles.icon} name="sign-in" size={20} color="#000"/>
		 <Text style={styles.text}>Autenticar(Para Administradores)</Text>
		</View>
	 </TouchableNativeFeedback>
		:
	 <TouchableNativeFeedback onPress={logout}>
		<View style={styles.item}>
		 <FontAwesome style={styles.icon} name="sign-out" size={20} color="#000"/>
		 <Text style={styles.text}>Sair</Text>
		</View>
	 </TouchableNativeFeedback>
	 }
	</ScrollView>
 )
}
export default connect(store => (
 { accessToken: store.accessToken }
))(Settings)

