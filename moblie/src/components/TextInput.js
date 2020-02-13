import React from 'react'

import {
 TextInput
} from 'react-native'

const styleDefault  = {
 height: 50,
 backgroundColor: '#888EB4',
 color: '#F8F8F2',
 borderRadius: 25,
 paddingHorizontal: 20,
 fontSize: 16,
 shadowColor: '#000',
 shadowOpacity: 0.2,
 shadowOffset: {
	width: 4,
	height: 4
 },
 elevation: 2

}
export default function Input(props){
 const style = {...styleDefault,...props.style ||{}}
 return (
	<TextInput
	{...props}
	style={style}
 />

 )
}
