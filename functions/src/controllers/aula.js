const admin = require('firebase-admin')
admin.initializeApp()

const AulaCollection = admin.firestore().collection('aulas')

const antiOverwrite = require('./utils/antiOverwrite')
const orderByFunction = require('./utils/order')

function formateDocument(doc){
 const data = doc.data()
 const _id = doc.id
 return {
	_id,
	...data
 }
}

function receiveAulas(){
 return new Promise(async resolve=>{
	const aulaSnapshot = await AulaCollection.get()
	const aulas = aulaSnapshot.docs.map(formateDocument)
	resolve(aulas)
 })
}
function updateAula(id,aulaData){
 return new Promise((resolve,reject)=>{
	const docRef = AulaCollection.doc(id)
	docRef.set(aulaData)
	 .then(()=>{
		docRef.get().then(doc=>resolve(formateDocument(doc)))
	 })
	 .catch(reject)
 })
}
function saveAula(aulaData){
 return new Promise((resolve,reject)=>{
	AulaCollection.add(aulaData)
	 .then(docRef=>{
		docRef.get().then(doc=>resolve(formateDocument(doc)))
	 })
	 .catch(reject)
 })
}
function deleteAula(id){
 return new Promise((resolve,reject)=>{
	AulaCollection.doc(id).delete()
	 .then(resolve)
	 .catch(reject)
 })
}
module.exports ={
 async index(request,response){
	let aulas = await receiveAulas()
	if(request.query){
	 const {orderBy} = request.query
	 if(orderBy){
		aulas = orderByFunction(aulas,orderBy)
	 }
	}
	return response.json(aulas)
 },
 async store(request,response){
	const {
	 materia,
	 week,
	 professor,
	 time,
	 position,
	 access_token
	} = request.body
	console.log(request.body)
	if(access_token !== process.env.ACCESS_TOKEN){
	 return response.status(401).send("Token de acesso invalido")
	}
	if(!time.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/gm)){
	 return response.status(400).send()
	}
	const aulas = await receiveAulas()

	antiOverwrite(aulas,week,null,position)
	 .then(()=>{
		saveAula({
		 materia:materia.toLowerCase(),
		 week:week.toLowerCase(),
		 position,
		 professor,
		 time
		})
		 .then((aula)=>{
			response.json(aula)
		 })
		 .catch(error=>{
			console.log(error)
			response.status(500)
			 .send("Erro não tratado")
		 })
	 })
	 .catch(()=>{
		response.status(400)
		 .send(`Erro:Aula já existente na posição:${position}`)
	 })
 },
 async update(request,response){
	const {
	 id,
	 materia,
	 week,
	 professor,
	 time,
	 position,
	 access_token
	} = request.body
	if(access_token !== process.env.ACCESS_TOKEN){
	 return response.status(401).send("Token de acesso invalido")
	}
	if(!time.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/gm)){
	 return response.status(401).send()
	}
	updateAula(id,{
	 materia,
	 week,
	 professor,
	 position,
	 time
	})
	 .then((aula)=>{
		response.json(aula)
	 })
		 .catch(error=>{
			console.log(error)
		response.status(500)
		 .send("Erro não tratado")
	 })
 },
 async delete(request,response){
	const {
	 id,
	 access_token
	} = request.body
	if(access_token !== process.env.ACCESS_TOKEN){
	 return response.status(401).send("Token de acesso invalido")
	}
	deleteAula(id)
	 .then(()=>{
		response.send("OK")
	 })
	 .catch(error=>{
		console.log(error)
		response.status(500)
		 .send("Erro não tratado")
	 })
 }
}
