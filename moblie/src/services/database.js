import {AsyncStorage} from 'react-native';

const module = {
 setObject(key,data){
	const dataString = JSON.stringify(data)
	return AsyncStorage.setItem(key,dataString)
 },
 getObject(key){
	return new Promise((resolve,reject)=>{
	 AsyncStorage.getItem(key)
		.then(data=>{
		 if(data) resolve(JSON.parse(data))
		 else resolve(null)
		})
		.catch(reject)
	})
 },
 AsyncStorage
}

export default module
