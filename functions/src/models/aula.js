const admin = require('firebase-admin')
//admin.initializeApp()

const aulaCollection = admin.firestore().collection('aulas')

function formateDocument(doc){
 const data = doc.data()
 const _id = doc.id
 return {_id,...data}
}

module.exports = {
 getAll(){
	return new Promise(async resolve=>{
	 const aulaCSnapshot = await aulaCollection.get()
	 const aulas = aulaCSnapshot.docs.map(formateDocument)
	 resolve(aulas)
	})
 },
 find(id){
	return new Promise(resolve=>{
	 const aulaDocument = aulaCollection.doc(id)
	 aulaDocument.get()
		.then(aulaSnapshot=>{
		 resolve(formateDocument(aulaSnapshot))
		})
	})
 },
 create(aulaData){
	return new Promise((resolve,reject)=>{
	 aulaCollection.add(aulaData)
		.then(aulaDocument=>{
		 aulaDocument.get().then(aulaSnapshot=>resolve(formateDocument(aulaSnapshot)))
		})
		.catch(reject)
	})

 },
 update(id,aulaData){
	return new Promise((resolve,reject)=>{
	 const aulaDocument = aulaCollection.doc(id)
	 aulaDocument.update(aulaData)
		.then(()=>{
		 aulaDocument.get().then(aulaSnapshot=>resolve(formateDocument(aulaSnapshot)))
		})
		.catch(reject)
	})
 },
 delete(){
	return new Promise((resolve,reject)=>{
	 aulaCollection.doc(id).delete()
		.then(resolve)
		.catch(reject)
	})
 }
}
