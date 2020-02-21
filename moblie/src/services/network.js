import axios from 'axios'
import database from './database'
import {getNetworkStateAsync} from 'expo-network'

export default function apiCreator(baseURL){
 const axiosApi = axios.create({
	baseURL
 })
 function get(resource,requestOptions){
	return new Promise((resolve,reject)=>{
	 getNetworkStateAsync()
		.then(async ({isConnected})=>{
		 if(isConnected){
			axiosApi.get(`/${resource}`,requestOptions)
			 .then(({data})=>{
				database.setObject(resource,data)
				resolve(data)
			 })
			 .catch(error=>{
				reject('axios-error',error)
			 })
		 }
		 else{
			const dataOffline = await database.getObject(resource)
			if(dataOffline) resolve(dataOffline,'offline')
			else reject('offline')
		 }
		})
		.catch(async error=>{
		 const dataOffline = await database.getObject(resource)
		 if(dataOffline) resolve(dataOffline,{name:'permission-error',error})
		 else reject('permission-network-error',error)
		})
	})
 }
 function post(resource,requestOptions){
	return new Promise((resolve,reject)=>{
	 getNetworkStateAsync()
		.then(async ({isConnected})=>{
		 if(isConnected){
			axiosApi({
			 method:'post',
			 url:`/${resource}`,
			 ...requestOptions,
			})
			 .then(({data})=>{
				resolve(data)
			 })
			 .catch(error=>{
				reject('axios-error',error)
			 })
		 }
		 else reject('offline')
		})
		.catch(error=>{
		 reject('permission-network-error',error)
		})
	})
 }
 function put(resource,requestOptions){
	return new Promise((resolve,reject)=>{
	 getNetworkStateAsync()
		.then(async ({isConnected})=>{
		 if(isConnected){
			axiosApi({
			 method:'put',
			 url:`/${resource}`,
			 ...requestOptions
			})
			 .then(({data})=>{
				resolve(data)
			 })
			 .catch(error=>{
				reject('axios-error',error)
			 })
		 }
		 else reject('offline')
		})
		.catch(error=>{
		 reject('permission-network-error',error)
		})
	})
 }
 function del(resource,requestOptions){
	return new Promise((resolve,reject)=>{
	 getNetworkStateAsync()
		.then(async ({isConnected})=>{
		 if(isConnected){
			axiosApi({
			 method:'delete',
			 url:`/${resource}`,
			 ...requestOptions
			})
			 .then(({data})=>{
				resolve(data)
			 })
			 .catch(error=>{
				reject('axios-error',error)
			 })
		 }
		 else reject('offline')
		})
		.catch(error=>{
		 reject('permission-network-error',error)
		})
	})
 }
 return {
	get,
	post,
	put,
	delete:del,
	axiosApi
 }
}
