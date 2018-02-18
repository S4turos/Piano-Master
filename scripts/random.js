function randomNote(clef){
	if(clef == 'treble'){
		var clave = notas_sol;
	}else if(clef == 'bass'){
		var clave = notas_fa;
	}else{
		console.log('Clave no definida');
	}
	return clave[Math.floor(Math.random()*clave.length)];
}

function fillNotes(clef, n){
	var voz = [];
	var correctas = [];

	for (i = 0; i < n; i++) {
		correctas.push(randomNote(clef));
		voz.push(new VF.StaveNote({clef: clef, keys: [correctas[i]], duration: "q" }));
	}
	
	return [voz, correctas];

}

var notas_sol = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5", "d/5", "e/5", "f/5", "g/5"];
var notas_fa = ["c/2", "d/2", "e/2", "f/2", "g/2", "a/2", "b/2", "c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3"];