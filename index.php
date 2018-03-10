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
	
	
	<div class="container-fluid" style="margin-bottom: 2em">
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
					<label for="escala">Escala:</label>
					<select class="custom-select" id="escala">
					  <option value="do_mayor" <?php if(isset($_GET['escala']) && $_GET["escala"] == "do_mayor") echo "selected"; ?>>Do mayor</option>
					  <option value="sol_mayor" <?php if(isset($_GET['escala']) && $_GET["escala"] == "sol_mayor") echo "selected"; ?>>Sol mayor</option>
					  <option value="mi_bemol_mayor" <?php if(isset($_GET['escala']) && $_GET["escala"] == "mi_bemol_mayor") echo "selected"; ?>>Mi bemol mayor</option>
					</select>
				  </div>
				  <div class="form-group">
					<label for="intervalos">Intervalos:</label>
					<select class="custom-select" id="intervalos">
					  <option value="5" <?php if(isset($_GET['intervalos']) && $_GET["intervalos"] == "5") echo "selected"; ?>>Cortos</option>
					  <option value="8" <?php if(isset($_GET['intervalos']) && $_GET["intervalos"] == "8" || !isset($_GET['clave'])) echo "selected"; ?>>Medios</option>
					  <option value="11" <?php if(isset($_GET['intervalos']) && $_GET["intervalos"] == "11") echo "selected"; ?>>Largos</option>
					</select>
				  </div>
				  <div class="form-group">
						<label for="negras">Número de negras:</label>
					  <select class="custom-select" id="negras">
						  <option value="10" <?php if(isset($_GET['negras']) && $_GET["negras"] == "10") echo "selected"; ?>>10 negras</option>
						  <option value="15" <?php if(isset($_GET['negras']) && $_GET["negras"] == "15") echo "selected"; ?>>15 negras</option>
						  <option value="20" <?php if(isset($_GET['negras']) && $_GET["negras"] == "20") echo "selected"; ?>>20 negras</option>
						</select>
				  </div>
				  <div class="form-group">
						<label for="pulsos">Negras por minuto:</label>
					  <select class="custom-select" id="pulsos">
							<option value="0" <?php if(isset($_GET['pulsos']) && $_GET["pulsos"] == "0") echo "selected"; ?>>Sin tempo</option>
						  <option value="60" <?php if(isset($_GET['pulsos']) && $_GET["pulsos"] == "60") echo "selected"; ?>>60 pulsos</option>
						  <option value="80" <?php if(isset($_GET['pulsos']) && $_GET["pulsos"] == "80") echo "selected"; ?>>80 pulsos</option>
						  <option value="100" <?php if(isset($_GET['pulsos']) && $_GET["pulsos"] == "100") echo "selected"; ?>>100 pulsos</option>
						  <option value="120" <?php if(isset($_GET['pulsos']) && $_GET["pulsos"] == "120") echo "selected"; ?>>120 pulsos</option>
						</select>
						<br/><br/>
						<div class="text-center">
							<button type=button class="btn btn-primary center-block" onclick="load()">Crear partitura</button>
						</div>
				  </div>
				</form>
			</div>
			<div style="background-color: #E5F1FF; border-radius: 0px 30px 30px 0px; padding-left: 1.5rem; padding-top: 7rem">
				<div id="stave"/>
			</div>
		</div>
	</div>
	
	<script src="scripts/get.js"></script>
	<script src="scripts/vexflow-min.js"></script>
	<script src="scripts/web-midi.js"></script>
	<script src="scripts/sheet.js"></script>
	
	<script>
	
		function load(){
			var clef = document.getElementById("clave");
			var selected_clef = clef.options[clef.selectedIndex].value;
			var notes = document.getElementById("escala");
			var selected_escala = notes.options[notes.selectedIndex].value;
			var notes = document.getElementById("intervalos");
			var selected_intervalos = notes.options[notes.selectedIndex].value;
			var notes = document.getElementById("negras");
			var selected_negras = notes.options[notes.selectedIndex].value;
			var notes = document.getElementById("pulsos");
			var selected_pulsos = notes.options[notes.selectedIndex].value;
			
			window.location.href = "?clave=" + selected_clef + "&escala=" + selected_escala
			+ "&intervalos=" + selected_intervalos + "&negras=" + selected_negras + "&pulsos=" + selected_pulsos
			+ "#stave";
		
		}
	
	</script>
	
</body>

</html>