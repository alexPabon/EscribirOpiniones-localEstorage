var Color_de_borde ="#6495ed9c";

function cambiar(pos)
{
	document.getElementById('ini_ses').style.display = "none";
	document.getElementById('reg_us').style.display = "none";
	var p = document.getElementsByClassName("text_info");
	var entradas_ini = document.getElementsByClassName('info0');
	var entradas_reg = document.getElementsByClassName('info');

	var año = document.getElementById("Y_sele");
	var mes = document.getElementById("M_sele");
	var dia = document.getElementById("D_sele");

	dia.value = dia.getElementsByTagName("option")[0].value;
	dia.style.borderColor = Color_de_borde;

	mes.value = mes.getElementsByTagName("option")[0].value;
	mes.style.borderColor = Color_de_borde;

	año.value = año.getElementsByTagName("option")[0].value;
	año.style.borderColor = Color_de_borde;

	document.getElementById("comentario").innerHTML ="";
	document.getElementById("error_login").innerHTML ="";

	p[0].style.color = "Black";		

	for(var i=0; i<entradas_ini.length; i++)
	{
		entradas_ini[i].value = "";
		entradas_ini[i].style.borderColor = Color_de_borde;
	}
	for(var j=0; j<entradas_reg.length; j++)
	{
		entradas_reg[j].value = "";
		entradas_reg[j].style.borderColor = Color_de_borde;
	}

	document.getElementById(pos).style.display = "block";
}

function guardarDatos()
{
	var entradas = document.getElementById("formulario1").getElementsByClassName("info");
	var fecha_n = document.getElementsByClassName("fechaNacimiento");
	var quit_espacios = "";
	var datos = [];

		//Quita los espacios a los extremos del input y los añade al array datos
	for(var i=0; i<entradas.length; i++)
		if(i==3 || i==4){	//inputs que escribe la contraseña
			quit_espacios = entradas[i].value.trim();
			datos.push(quit_espacios);
		}else{
			quit_espacios = entradas[i].value.trim().toLowerCase();
			datos.push(quit_espacios);
		}		
	
	datos.push(fecha_n[0].value+"/"+fecha_n[1].value+"/"+fecha_n[2].value);

		//variables para cargar los dtos a localStorage
	var usuarios = localStorage.getItem("usuarios");
	var adjuntar ="";

	if(usuarios == null){	//si no existe usuarios, lo crea
		adjuntar =[datos];
			//crea usuarios y añade datos a localStorage
		localStorage.setItem("usuarios", JSON.stringify(adjuntar));
	}else{
		usuarios = JSON.parse(usuarios); //toma el array usuarios
		usuarios.push(datos);	//añade los datos y despues guarda usuarios en localStorage
		localStorage.setItem("usuarios", JSON.stringify(usuarios));
	}

	document.getElementById("comentario").innerHTML="Registrado correctamente, ya puedes ingresar!";

		//Despuea de 3 segundos se cambia la vista de registro por login
	setTimeout(function()
	{
		cambiar("ini_ses")		
	},3000);

}

function login()
{
	var cliente = document.getElementById("user");
	var pass = document.getElementById("pass0");
	var err = document.getElementById("error_login");
	var campos = "";

		//valida input del nombre de usuario
	if(cliente.value==""){
		campos += "-Falta datos de usuario. <br>";
		cliente.style.borderColor = "red";
	}else{
		cliente.style.borderColor = Color_de_borde;
	}

		//valida input de la contraseña
	if(pass.value==""){
		campos += "-Falta contraseña";
		pass.style.borderColor = "red";
	}else{
		pass.style.borderColor = Color_de_borde;
	}

		//si algun campo se encuetra vacio, se escribe un msn
	err.innerHTML = campos;

		//si no hay msn de error
	if(campos==""){
		var flag = false;
		var usuarios = localStorage.getItem("usuarios");
		usuarios = JSON.parse(usuarios);		

			//recorremos el array de usuarios
		for(var i=0; i<usuarios.length; i++)
		{
				//si coincide el nombre de usuario y la contraseña
			if(usuarios[i][2]==cliente.value.trim() && usuarios[i][3]== pass.value.trim())
			{
				flag = true;
				campos = "Iniciando sesion...";
				document.getElementsByTagName("body")[0].style.background = "white";
				document.getElementById("ini_ses").innerHTML = campos;
				document.getElementById("ini_ses").style.fontSize = "25px";
				sessionStorage.setItem("criticas", JSON.stringify([usuarios[i][0],usuarios[i][1],usuarios[i][2]]));

				setTimeout(function()
				{
					location.href = "criticas.html";
				},3000);
			}
		}

		if(!flag)
		{
			err.innerHTML = "Error! <br>Los datos introducidos no coinciden, Vuelva a intentarlo."
		}

	}
	
}