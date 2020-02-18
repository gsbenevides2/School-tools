const Aula = require('../../models/aula')

const antiOverwrite = require('./utils/antiOverwrite')
const orderByFunction = require('./utils/order')

module.exports ={
 async index(request,response){
	let aulas = await Aula.getAll()
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
	const aulas = await Aula.getAll()

	antiOverwrite(aulas,week,null,position)
	 .then(()=>{
		Aula.create({
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
	Aula.update(id,{
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
	Aula.delete(id)
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
