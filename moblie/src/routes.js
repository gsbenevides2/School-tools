import React from 'react'
import {Text} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {MaterialIcons} from '@expo/vector-icons'

import Day from './pages/Day';
import Aula from './pages/Aula';
import AulaEditing from './pages/AulaEditing';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import DrawerButton from './components/DrawerButton' 

const CreateDayNavigator = function(week){
 return createStackNavigator({
	Day:{
	 screen:(props)=>(<Day {...props} week={week}/>),
	 navigationOptions:{
		headerShown:false
	 }
	}
 })
}

const SettingsNavigator = createStackNavigator({
 Settings: {
	screen: Settings,
	navigationOptions:(props)=>({
	 title:'Configurações',
	 headerLeft:()=><DrawerButton {...props}/>
	}),
 },	
 Auth: {
	screen: Auth,
	navigationOptions:{
	 title:'Entrar'
	}
 }
},{
 defaultNavigationOptions:{
	headerStyle:{
	 backgroundColor:'#282A36'
	},
	headerTintColor:'#F8F8F2'
 }
})

const DaysNavigator = createBottomTabNavigator({
 Segunda:{
	screen:CreateDayNavigator('segunda'),
	navigationOptions:{
	 tabBarIcon:({tintColor})=>(<Text style={{color:tintColor,fontSize:25}}>S</Text>)
	}
 },
 Terça:{
	screen:CreateDayNavigator('terça'),
	navigationOptions:{
	 tabBarIcon:({tintColor})=>(<Text style={{color:tintColor,fontSize:25}}>T</Text>)
	}
 },
 Quarta:{
	screen:CreateDayNavigator('quarta'),
	navigationOptions:{
	 tabBarIcon:({tintColor})=>(<Text style={{color:tintColor,fontSize:25}}>Q</Text>)
	}
 },
 Quinta:{
	screen:CreateDayNavigator('quinta'),
	navigationOptions:{
	 tabBarIcon:({tintColor})=>(<Text style={{color:tintColor,fontSize:25}}>Q</Text>)
	}
 },
 Sexta:{
	screen:CreateDayNavigator('sexta'),
	navigationOptions:{
	 tabBarIcon:({tintColor})=>(<Text style={{color:tintColor,fontSize:25}}>S</Text>)
	}
 },
},{
 tabBarOptions:{
	activeTintColor:'#FFB86C',
	inactiveTintColor:'#F8F8F2',
	inactiveBackgroundColor:'#282A36',
	activeBackgroundColor:'#282A36'
 }
})


const QuadroNavigator = createStackNavigator({
 Quadro: {
	screen: DaysNavigator,
	navigationOptions:(props)=>({
	 title:'Quadro de aulas',
	 headerLeft:()=><DrawerButton {...props}/>
	}),
 },
 Aula,
 AulaEditing:{
	screen:AulaEditing,
	navigationOptions:({navigation})=>({
	 title:`${navigation.state.params.title}`
	})
 }
},{
 defaultNavigationOptions:{
	headerStyle:{
	 backgroundColor:'#282A36'
	},
	headerTintColor:'#F8F8F2'
 }
});

const AppNavigator = createDrawerNavigator({
 QuadroNavigator:{
	screen:QuadroNavigator,
	navigationOptions:{
	 title:'Quadro de aulas',
	 drawerIcon:({tintColor})=><MaterialIcons size={20} name="dashboard" color={tintColor}/>
	}
 },
 SettingsNavigator:{
	screen:SettingsNavigator,
	navigationOptions:{
	 title:'Configurações',
	 drawerIcon:({tintColor})=><MaterialIcons size={20} name="settings" color={tintColor}/>
	}
 }
},{
 drawerBackgroundColor:'#282A36',
 contentOptions:{
	activeTintColor:'#FFB86C',
	inactiveTintColor:'#F8F8F2',
	inactiveBackgroundColor:'#282A36',
 }
})
export default createAppContainer(AppNavigator);

