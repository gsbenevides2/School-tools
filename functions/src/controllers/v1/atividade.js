const Atividade = require('../../models/atividade')

module.exports ={
 async index(request,response){
	let atividades = await Atividade.getAll()
	return response.json(atividades)
 },
 async store(request,response){
	const {
	 name,
	 materia,
	 timestamp,
	 description,
	 access_token
	} = request.body
	if(access_token !== process.env.ACCESS_TOKEN){
	 return response.status(401).send("Token de acesso invalido")
	}
	Atividade.create({
	 name,
	 materia:materia.toLowerCase(),
	 date:new Date(timestamp),
	 description,
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
 async update(request,response){
	const {
	 id,
	 materia,
	 timestamp,
	 description,
	 name,
	 access_token
	} = request.body
	if(access_token !== process.env.ACCESS_TOKEN){
	 return response.status(401).send("Token de acesso invalido")
	}
	Aula.update(id,{
	 materia,
	 timestamp,
	 description,
	 name
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
