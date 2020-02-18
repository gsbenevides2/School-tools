const admin = require('firebase-admin')

const atividadeCollection = admin.firestore().collection('atividades')

function formateDocument(doc){
 const data = doc.data()
 const _id = doc.id
 data.date = data.date.toDate()
 return {_id,...data}
}

module.exports = {
 getAll(){
	return new Promise(async resolve=>{
	 const atividadeCSnapshot = await atividadeCollection.get()
	 const atividades = atividadeCSnapshot.docs.map(formateDocument)
	 resolve(atividades)
	})
 },
 find(id){
	return new Promise(resolve=>{
	 const atividadeDocument = atividadeCollection.doc(id)
	 atividadeDocument.get()
		.then(atividadenapshot=>{
		 resolve(formateDocument(atividadeSnapshot))
		})
	})
 },
 create(atividadeData){
	return new Promise((resolve,reject)=>{
	 atividadeCollection.add(atividadeData)
		.then(atividadeDocument=>{
		 atividadeDocument.get().then(atividadeSnapshot=>resolve(formateDocument(atividadeSnapshot)))
		})
		.catch(reject)
	})

 },
 update(id,atividadeData){
	return new Promise((resolve,reject)=>{
	 const atividadeDocument = atividadeCollection.doc(id)
	 atividadeDocument.update(atividadeData)
		.then(()=>{
		 atividadeDocument.get().then(atividadeSnapshot=>resolve(formateDocument(atividadeSnapshot)))
		})
		.catch(reject)
	})
 },
 delete(){
	return new Promise((resolve,reject)=>{
	 atividadeCollection.doc(id).delete()
		.then(resolve)
		.catch(reject)
	})
 }
}
