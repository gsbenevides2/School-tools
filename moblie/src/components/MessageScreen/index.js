import React from 'react';
import {
 View,
 Text,
 Image
} from 'react-native'

import styles from './styles'

export default function({type,refreshCalback}){
 const messages = {
	empty:{
	 text:'Ops parece que aqui não tem nada aqui.',
	 image:require('../../../assets/empty.png')
	},
	offline:{
	 text:'Ops parece que você está offline.',
	 image:require('../../../assets/offline.png')
	},
	server:{
	 text:'Ops ocorreu um erro desconhecido. Desculpa:(',
	 image:require('../../../assets/server.png')
	},
	loading:{
	 text:"Carregando aguarde...",
	 image:require('../../../assets/loading.png')
	}
 }
 return (
	 <View style={styles.container}>
	 <Image style={styles.image} source={messages[type].image}/>
	 <Text style={styles.text}>{messages[type].text}</Text>
	</View>
 )
}
