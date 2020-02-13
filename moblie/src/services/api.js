import {AsyncStorage} from 'react-native'
import {getNetworkStateAsync} from 'expo-network'
import axios from 'axios'


const api = axios.create({
 baseURL:'http://localhost:5000/school-tools-gsb/us-central1/v1'
})

const module = {
 getDays(){
	return new Promise(async (resolve,reject)=>{
	 getNetworkStateAsync().then(async({isConnected})=>{
		if(isConnected){
		 api.get('/aula',{
			params:{
			 orderBy:'weekAndPosition'
			}
		 }).then(response=>{
			AsyncStorage.setItem('aula',JSON.stringify(response.data))
			resolve(response.data)
		 })
			.catch(async(error)=>{
			 const data = JSON.parse(await AsyncStorage.getItem('aula'))
			 if(data)resolve(data)
			 else reject('server')
			})
		}
		else{
		 const data = JSON.parse(await AsyncStorage.getItem('aula'))
		 if(data)resolve(data)
		 else reject('offline')
		}
	 })
		.catch(async()=>{
		 const data = JSON.parse(await AsyncStorage.getItem('aula'))
		 if(data)resolve(data)
		 else reject('offline')
		})
	})
 },
 validAccessToken(accessToken){
	return new Promise(async (resolve,reject)=>{
	 getNetworkStateAsync().then(async({isConnected})=>{
		if(isConnected){
		 api.get("/auth",{params:{accessToken}})
			.then(()=>{
			 AsyncStorage.setItem('accessToken',accessToken)
			 resolve()
			})
			.catch(({request})=>{
			 if(request.status===401){
				reject('Token invalido')
			 }
			 else reject("Erro desconhecido")
			})
		}
		else{
		 reject("Você está offline")
		}
	 })
		.catch(()=>{
		 reject("Você está offline")
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
	 getNetworkStateAsync().then(async({isConnected})=>{
		if(isConnected){
		 const access_token = await AsyncStorage.getItem('accessToken')
		 api.delete('/aula',{
			data:{id,access_token}
		 }).then(async()=>{
			resolve(await this.getDays())
		 })
			.catch(({request})=>{
			 if(request.status===401){
				reject('Token Invalido. Autentique-se novamente')
			 }
			 else reject('Erro desconhecido')
			})
		}
		else{
		 reject("Você está offline")
		}
	 })
		.catch(()=>{
		 reject("Você está offline")
		})
	})
 },
 createAula(aulaData){
	return new Promise(async(resolve,reject)=>{
	 getNetworkStateAsync().then(async({isConnected})=>{
		if(isConnected){
		 const access_token = await AsyncStorage.getItem('accessToken')
		 api.post('/aula',{
			access_token,...aulaData
		 }).then(async()=>{
			resolve(await this.getDays())
		 })
			.catch(({request})=>{
			 console.log(request)
			 if(request.status===401){
				reject('Token Invalido. Autentique-se novamente')
			 }
			 else reject('Erro desconhecido')
			})
		}
		else{
		 reject("Você está offline")
		}
	 })
		.catch(()=>{
		 reject("Você está offline")
		})
	})
 },
 updateAula(aulaData){
	return new Promise(async(resolve,reject)=>{
	 getNetworkStateAsync().then(async({isConnected})=>{
		if(isConnected){
		 const access_token = await AsyncStorage.getItem('accessToken')
		 api.put('/aula',{
			access_token,...aulaData
		 }).then(async()=>{
			resolve(await this.getDays())
		 })
			.catch(({request})=>{
			 console.log(request)
			 if(request.status===401){
				reject('Token Invalido. Autentique-se novamente')
			 }
			 else reject('Erro desconhecido')
			})
		}
		else{
		 reject("Você está offline")
		}
	 })
		.catch(()=>{
		 reject("Você está offline")
		})
	})
 }
}
export default module
