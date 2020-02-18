module.exports ={
 async index(request,response){
	request.query.accessToken === process.env.ACCESS_TOKEN ?
	 response.send("OK") : response.status(401).send()
 }
}
