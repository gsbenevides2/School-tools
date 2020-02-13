import React from 'react'
import {Text,TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

import styles from './styles'

export default function(props){
 return (
	<TouchableOpacity onPress={props.onPress} style={styles.container}>
	 <MaterialIcons name='add' size={35} color='#F8F8F2'/>
	 <Text style={styles.text}>Adicionar Aula</Text>
	</TouchableOpacity>
 )
}
