import React from 'react'
import {Text,TouchableOpacity} from 'react-native'

import especialUppercase from '../../utils/especialUppercase'
import styles from './styles'

export default function(props){
 return (
	<TouchableOpacity onPress={props.onPress} style={styles.container}>
	 <Text style={styles.materia}>{especialUppercase(props.materia)}</Text>
	 <Text style={styles.professor}>{props.professor}</Text>
	 <Text style={styles.time}>{props.time}</Text>
	 <Text style={styles.viewMore}>Ver mais -></Text>
	</TouchableOpacity>
 )
}
