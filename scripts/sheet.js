var n = findGetParameter("negras");
var clef = findGetParameter("clave");
var escala = findGetParameter('escala');
var intervalos = findGetParameter('intervalos');

if(n == null){
	n = 10;
}

if(intervalos == null){
	intervalos = 5;
}

if(escala == 'sol_mayor'){
	var notas_sol = ["c/4", "d/4", "e/4", "f#/4", "g/4", "a/4", "b/4", "c/5", "d/5", "e/5", "f#/5", "g/5"];
	var notas_fa = ["c/2", "d/2", "e/2", "f#/2", "g/2", "a/2", "b/2", "c/3", "d/3", "e/3", "f#/3", "g/3", "a/3", "b/3"];
}else if(escala == 'mi_bemol_mayor'){
	var notas_sol = ["c/4", "d/4", "eb/4", "f/4", "g/4", "ab/4", "bb/4", "c/5", "d/5", "eb/5", "f/5", "g/5"];
	var notas_fa = ["c/2", "d/2", "eb/2", "f/2", "g/2", "ab/2", "bb/2", "c/3", "d/3", "eb/3", "f/3", "g/3", "ab/3", "bb/3"];
}else{
	var notas_sol = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5", "d/5", "e/5", "f/5", "g/5"];
	var notas_fa = ["c/2", "d/2", "e/2", "f/2", "g/2", "a/2", "b/2", "c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3"];
}

if(escala == 'sol_mayor'){
	var key_signature = 'G';
}else if(escala == 'mi_bemol_mayor'){
	var key_signature = 'Eb';
}else{
	var key_signature = 'C';
}

var VF = Vex.Flow;
var div = document.getElementById("stave");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(800, 350);
var context = renderer.getContext();

var sol, fa;

function randomNote(clef){
	if(clef == 'treble'){
		var clave = notas_sol;
	}else if(clef == 'bass'){
		var clave = notas_fa;
	}else{
		console.log('Clave no definida');
	}
	return clave[Math.floor(Math.random() * clave.length)];
}

function fillNotes(clef, n){
	
	var voz = [];
	var correctas = [];
	
	for (i = 0; i < n; i++) {
		correctas.push(randomNote(clef));
		voz.push(new VF.StaveNote({clef: clef, keys: [correctas[i]], duration: "q", auto_stem: true }));
	}
	
	return [voz, correctas];

}

function cortar(clave, corte){
	
	var clave_def = [];
	var iterador = corte;
	
	for (i = 0; i < intervalos; i++){
		clave_def.push(clave[iterador]);
		if(iterador > 0 && iterador <= corte){
			iterador--;
		}else if(iterador == 0){
			iterador = corte + 1;
		}else{
			iterador++;
		}
	}
	
	return clave_def;
	
}

function loadStave(x, y, width, clef){
	var stave = new VF.Stave(x, y, width);
	stave.addClef(clef).addKeySignature(key_signature);
	stave.setContext(context).draw();
	var notes = fillNotes(clef, n);
	var voice = new VF.Voice({num_beats: n,  beat_value: 4});
	voice.addTickables(notes[0]);
	var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 700);
	voice.draw(context, stave);
	return [stave, notes];
}


if(intervalos != null){
	var corte_sol = Math.floor(Math.random() * notas_sol.length);
	var corte_fa = Math.floor(Math.random() * notas_fa.length);
	var notas_sol = cortar(notas_sol, corte_sol);
	var notas_fa = cortar(notas_fa, corte_fa);
}


if(clef == "sol"){
	var treble = loadStave(20, 80, 750, "treble");
	sol = treble[1];
}else if(clef == "fa"){
	var bass = loadStave(20, 80, 750, "bass");
	fa = bass[1];
}else if(clef == "solfa" || clef == null){
	var treble = loadStave(20, 0, 750, "treble");
	var bass = loadStave(20, 150, 750, "bass");
	sol = treble[1];
	fa = bass[1];
	var brace = new Vex.Flow.StaveConnector(treble[0], bass[0]).setType(3);
	var lineLeft = new Vex.Flow.StaveConnector(treble[0], bass[0]).setType(1);
	var lineRight = new Vex.Flow.StaveConnector(treble[0], bass[0]).setType(6);
	brace.setContext(context).draw();
	lineLeft.setContext(context).draw();
	lineRight.setContext(context).draw();
}
