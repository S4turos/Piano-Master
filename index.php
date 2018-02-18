<!DOCTYPE html>
<html>

<head>
	<title>Piano Master</title>
	<meta charset="UTF-8">
	
	<link rel="icon" href="images/piano.ico">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	
	<style>
		#header{
			opacity: 0.4;
		}
	</style>
</head>

<body background="images/bgpiano.jpg">

	<div class="jumbotron" id="header">
	  <h1 class="display-4">Piano Master</h1>
	  <p class="lead">Entrena tu lectura a primera vista tocando partituras aleatorias en el menor tiempo posible. Con soporte para teclado MIDI.</p>
	  <hr class="my-4">
	  <p>Selecciona las opciones deseadas para crear partituras personalizadas.</p>
	</div>
	
	
	<div class="container-fluid">
	  <div class="row  justify-content-md-center">
		<div class="col-3" style="border-radius: 15px 0px 0px 15px; background: url(images/paper.gif); background-position: left top; background-repeat: repeat; padding-top:1rem; padding-bottom:0.5rem">
		  <form>
			  <div class="form-group">
				<label for="clave">Clave:</label>
				<select class="custom-select" id="clave">
				  <option value="sol" <?php if(isset($_GET['clave']) && $_GET["clave"] == "sol") echo "selected"; ?>>Clave de sol</option>
				  <option value="fa" <?php if(isset($_GET['clave']) && $_GET["clave"] == "fa") echo "selected"; ?>>Clave de fa</option>
				  <option value="solfa" <?php if((isset($_GET['clave']) && $_GET["clave"] == "solfa") || !isset($_GET['clave'])) echo "selected"; ?>>Clave de sol y fa</option>
				</select>
			  </div>
			  <div class="form-group">
					<label for="notas">Número de notas:</label>
				  <select class="custom-select" id="notas">
					  <option value="10" <?php if(isset($_GET['notas']) && $_GET["notas"] == "10") echo "selected"; ?>>10 notas</option>
					  <option value="15" <?php if(isset($_GET['notas']) && $_GET["notas"] == "15") echo "selected"; ?>>15 notas</option>
					  <option value="20" <?php if(isset($_GET['notas']) && $_GET["notas"] == "20") echo "selected"; ?>>20 notas</option>
					</select>
					<br/><br/>
					<div class="text-center">
						<button type=button class="btn btn-primary center-block" onclick="load()">Crear partitura</button>
					</div>
			  </div>
			</form>
		</div>
		<div style="background-color: #E5F1FF; border-radius: 0px 30px 30px 0px; padding-left: 1.5rem">
			<div id="bass"/>
			<div id="treble"/>
		  </div>
		</div>
	</div>
	
	
	<script src="scripts/vexflow-min.js"></script>
	<script src="scripts/random.js"></script>
	<script src="scripts/web-midi.js"></script>
	<script src="scripts/get.js"></script>
	<script src="scripts/sheet.js"></script>
	<script>
	
		function load(){
			var clef = document.getElementById("clave");
			var selected_clef = clef.options[clef.selectedIndex].value;
			var notes = document.getElementById("notas");
			var selected_notes = notes.options[notes.selectedIndex].value;
			
			window.location.href = "?clave=" + selected_clef + "&notas=" + selected_notes;
		
		}
	
	</script>
</body>

</html>