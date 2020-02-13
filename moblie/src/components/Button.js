import React from 'react'
import {
 TouchableOpacity,
 StyleSheet,
 Text
} from 'react-native'

const styleDefault ={
 backgroundColor:"#BD93F9",
 padding:10,
 borderRadius:10
}

const styleText ={
 color:"#282A36",
 fontWeight:'bold',
 fontSize:20,
 textAlign:'center'
}

export default (props)=>{
 if(props.style){
	style = StyleSheet.compose(styleDefault,props.style)
 }
 else style = styleDefault

 return (
	<TouchableOpacity {...props} style={style}>
	 {props.value? 
		<Text style={styleText}>{props.value}</Text>
	: props.childrem}
	</TouchableOpacity>
 )
}
