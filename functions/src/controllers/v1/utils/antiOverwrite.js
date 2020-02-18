module.exports = (aulas,week,aula_id,position)=>{
 return new Promise((resolver,rejeitar)=>{
	let reject = false
	aulas.map(aula=>{
	 if(
	 aula.week === week.toLowerCase() &&
	 aula.position === position &&
		aula._id !== aula_id
	 ){
		reject = true
	 }
	})
	if(reject) rejeitar()
	else resolver()
 })
}
