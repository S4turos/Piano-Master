var midi, data;

var x = 0;
var right = new Audio('audio/right.mp3');
var wrong = new Audio('audio/wrong.mp3');
var clockRunning = false;
var keys = [];

var code = {
	"c/2" : 36,
  "c#/2" : 37,
  "db/2": 37,
  "d/2" : 38,
  "d#/2" : 39,
  "eb/2" : 39,
  "e/2" : 40,
  "f/2" : 41,
  "f#/2" : 42,
  "gb/2" : 42,
  "g/2" : 43,
  "g#/2" : 44,
  "ab/2" : 44,
  "a/2" : 45,
  "a#/2" : 46,
  "bb/2" : 46,
  "b/2" : 47,
  "c/3" : 48,
  "c#/3" : 49,
  "db/3": 49,
  "d/3" : 50,
  "d#/3" : 51,
  "eb/3" : 51,
  "e/3" : 52,
  "f/3" : 53,
  "f#/3" : 54,
  "gb/3" : 54,
  "g/3" : 55,
  "g#/3" : 56,
  "ab/3" : 56,
  "a/3" : 57,
  "a#/3" : 58,
  "bb/3" : 58,
  "b/3" : 59,
  "c/4" : 60,
  "c#/4" : 61,
  "db/4": 61,
  "d/4" : 62,
  "d#/4" : 63,
  "eb/4" : 63,
  "e/4" : 64,
  "f/4" : 65,
  "f#/4" : 66,
  "gb/4" : 66,
  "g/4" : 67,
  "g#/4" : 68,
  "ab/4" : 68,
  "a/4" : 69,
  "a#/4" : 70,
  "bb/4" : 70,
  "b/4" : 71,
  "c/5" : 72,
  "c#/5" : 73,
  "db/5" : 73,
  "d/5": 74,
  "d#/5" : 75,
  "eb/5" : 75,
  "e/5" : 76,
  "f/5" : 77,
  "f#/5" : 78,
  "gb/5" : 78,
  "g/5" : 79,
  "g#/5" : 80,
  "ab/5" : 80,
  "a/5" : 81,
  "a#/5" : 82,
  "bb/5" : 82,
  "b/5" : 83,
  "c/6" : 84,
  "c#/6" : 85,
  "db/6" : 85,
  "d/6": 86,
  "d#/6" : 87,
  "eb/6" : 87,
  "e/6" : 88,
  "f/6" : 89,
  "f#/6" : 90,
  "gb/6" : 90,
  "g/6" : 91,
  "g#/6" : 92,
  "ab/6" : 92,
  "a/6" : 93,
  "a#/6" : 94,
  "bb/6" : 94,
  "b/6" : 95,
  "c/7": 96
};

function pauseSound(){
	right.pause();
	right.currentTime = 0;
	wrong.pause();
	wrong.currentTime = 0;
}

function rightKey(){
	pauseSound();
	x++;
	right.play();
	if(x == n){
		setTimeout(function(){location.reload()},1200);
	}
}

function wrongKey(){
	pauseSound();
	wrong.play();
}

function checkKeys(){
	if(clef == "sol"){
		if(code[sol[1][x]] == keys[0] && keys.length == 1){
			rightKey();
		}else{
			wrongKey();
		}
	}else if(clef == "fa"){
		if(code[fa[1][x]] == keys[0] && keys.length == 1){
			rightKey();
		}else{
			wrongKey();
		}
	}else if(clef == "solfa" || findGetParameter("clave") == null){
		if(keys.includes(code[sol[1][x]]) && keys.includes(code[fa[1][x]]) && keys.length == 2){
			rightKey();
		}else{
			wrongKey();
		}
	}
	
	clockRunning = false;
	keys = [];
	
}

// start talking to MIDI controller
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  console.warn("No MIDI support in your browser")
}

// on success
function onMIDISuccess(midiData) {
  // this is all our MIDI data
  midi = midiData;
  var allInputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
    // when a MIDI value is received call the onMIDIMessage function
    input.value.onmidimessage = gotMIDImessage;
  }
}

function gotMIDImessage(messageData) {
	
	var key = messageData.data[1];
	var intensity = messageData.data[2];
	
	if(key >= 36 && key <= 96 && intensity > 0){
		keys.push(key);
		if(!clockRunning){
			clockRunning = true;
			setTimeout(checkKeys, 200);
		}
	}

}

// on failure
function onMIDIFailure() {
  console.warn("Not recognising MIDI controller")
}
