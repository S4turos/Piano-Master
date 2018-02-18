var n = findGetParameter("notas");
var clef = findGetParameter("clave");
VF = Vex.Flow;

if(n == null){
	n = 10;
}

var sol, fa;

function loadTreble(){
	var div = document.getElementById("treble")
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
	renderer.resize(800, 150);
	var context = renderer.getContext();
	var stave = new VF.Stave(10, 30, 750);
	stave.addClef("treble");
	stave.setContext(context).draw();
	sol = fillNotes('treble', n);
	var voice = new VF.Voice({num_beats: n,  beat_value: 4});
	voice.addTickables(sol[0]);
	var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 700);
	voice.draw(context, stave);
}

function loadBass(){
	var div = document.getElementById("bass")
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
	renderer.resize(800, 150);
	var context = renderer.getContext();
	var stave = new VF.Stave(10, 30, 750);
	stave.addClef("bass");
	stave.setContext(context).draw();
	fa = fillNotes('bass', n);
	var voice = new VF.Voice({num_beats: n,  beat_value: 4});
	voice.addTickables(fa[0]);
	var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 700);
	voice.draw(context, stave);
}

if(clef == "sol"){
	loadTreble();
}else if(clef == "fa"){
	loadBass();
}else if(clef == "solfa" || clef == null){
	loadTreble();
	loadBass();
}