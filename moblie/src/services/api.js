import {AsyncStorage} from 'react-native'
import {getNetworkStateAsync} from 'expo-network'
import axios from 'axios'
import network  from './network'


const api = axios.create({
 baseURL:'https://us-central1-school-tools-gsb.cloudfunctions.net/v1'
})

const api_new  = network('http://localhost:5000/school-tools-gsb/us-central1/v1/')
const module = {
 getDays(){
	return api_new.get('aula',{
	 params:{
		orderBy:'weekAndPosition'
	 }
	})
 },
 validAccessToken(accessToken){
	return new Promise(async (resolve,reject)=>{
	 api_new.get("auth",{params:{accessToken}})
		.then(()=>{
		 AsyncStorage.setItem('accessToken',accessToken)
		 resolve()
		})
		.catch((code,error)=>{
		 if(code ==='axios-error' && error.request.status===401){
			reject('Token invalido')
		 }
		 else reject("Erro desconhecido")
		})
	})
 },
 loadAccessToken(){
	return new Promise(async(resolve,reject)=>{
	 const accessToken = await AsyncStorage.getItem('accessToken')
	 if(accessToken){
		this.validAccessToken(accessToken)
		 .then(()=>{
			resolve(accessToken)
		 })
		 .catch(message=>{
			if(message==='Token invalido'){
			 reject('Token invalido faça a autenticação novamente')
			}
			else resolve(accessToken)
		 })
	 }
	 else resolve(null)
	})
 },
 deleteAula(id){
	return new Promise(async(resolve,reject)=>{
	 const access_token = await AsyncStorage.getItem('accessToken')
	 api_new.delete('aula',{
		data:{id,access_token},
		params:{
		 return_all:true,
		 orderBy:'weekAndPosition'
		}
	 })
		.then(resolve)
		.catch(reject)
	})
 },
 createAula(aulaData){
	return new Promise(async(resolve,reject)=>{
	 const access_token = await AsyncStorage.getItem('accessToken')
	 api_new.post(`aula`,{
		data:{
		 access_token,
		 ...aulaData,
		},
		params:{
		 return_all:true,
		 orderBy:'weekAndPosition'
		}
	 })
		.then(resolve)
		.catch(reject)
	})
 },
 updateAula(aulaData){
	return new Promise(async(resolve,reject)=>{
	 const access_token = await AsyncStorage.getItem('accessToken')
	 api_new.put('aula',{
		data:{
		 access_token,
		 ...aulaData
		},
		params:{
		 return_all:true,
		 orderBy:'weekAndPosition'
		}
	 })
		.then(resolve)
		.catch(reject)
	})
 }
}
export default module
