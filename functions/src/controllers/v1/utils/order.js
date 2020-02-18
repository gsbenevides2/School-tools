module.exports = (aulas,orderBy)=>{
 if(orderBy==="week"){
	const weeks = {
	 segunda:[],
	 terça:[],
	 quarta:[],
	 quinta:[],
	 sexta:[]
	}
	aulas.map(aula=>{
	 weeks[aula.week].push(aula)
	})
	return weeks
 }
 if(orderBy==="weekAndPosition"){
	const qtdAulasPerWeek = {
	 segunda:0,
	 terça:0,
	 quarta:0,
	 quinta:0,
	 sexta:0
	}

	aulas.map(aula=>{
	 qtdAulasPerWeek[aula.week]++
	})
	const weeks = {
	 segunda:new Array(qtdAulasPerWeek.segunda),
	 terça:new Array(qtdAulasPerWeek.terça),
	 quarta:new Array(qtdAulasPerWeek.quarta),
	 quinta:new Array(qtdAulasPerWeek.quinta),
	 sexta:new Array(qtdAulasPerWeek.sexta),
	}
	aulas.map(aula=>{
	 weeks[aula.week][aula.position-1] = aula
	})
	
	return weeks
 }

}
