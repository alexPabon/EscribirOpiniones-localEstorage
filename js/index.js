var Color_de_borde ="#6495ed9c";

function cargar_info()
{
	//Carga los datos de la fecha de nacimiento	
	var año = document.getElementById("Y_sele");
	var mes = document.getElementById("M_sele");
	var dia = document.getElementById("D_sele");
	var seleConten ="";

	//Introducir los dias
	for(var i=0; i<=31; i++)
		if(i==0)
			seleConten += '<option disabled="" selected="">dd</option>';
		else
			seleConten += '<option>'+i+'</option>';

	dia.innerHTML = seleConten;
	seleConten ="";
	
	//Introducir el meses
	for(var i=0; i<=12; i++)
		if(i==0)
			seleConten += '<option disabled="" selected="">mm</option>';
		else
			seleConten += '<option>'+i+'</option>';	

	mes.innerHTML = seleConten;
	seleConten ="";

	//Introducir los años
	for(var i=2002; i>=1970; i--)
		if(i==2002)
			seleConten += '<option disabled="" selected="">yyyy</option>';
		else
			seleConten += '<option>'+i+'</option>';

	año.innerHTML = seleConten;
	seleConten ="";
}

// Hace el cambio de placeholder y pone visible el label correspondiente.
// Esto lo hace a las entradas de inicio de sesion.
function visibilidad(vis)
{
	var usuario = document.getElementById('user');
	var contraseña = document.getElementById('pass0')
	
	switch(vis)
	{
		case 1:
			if(usuario.value ==""){
				document.getElementById('user0').style.visibility = "visible";
				usuario.placeholder = "";				
			}
			break;
		case 2:
			if(usuario.value ==""){
				document.getElementById('user0').style.visibility = "hidden";
				usuario.placeholder = "Usuario";				
			}	
			break;
		case 3:
			if(contraseña.value ==""){
				document.getElementById('pass').style.visibility = "visible";
				contraseña.placeholder = "";				
			}
			break;
		case 4:
			if(contraseña.value ==""){
				document.getElementById('pass').style.visibility = "hidden";
				contraseña.placeholder = "Contraseña";				
			}	
			break;
		default:
			alert("Error!");		
	}
	
}

//Se valida el formulario de registro para comprobar que no hay campos vacios.
function validate()
{	
	var entradas =document.getElementById("formulario1").getElementsByClassName("info")	
	var pass1 = document.getElementById("pass1");
	var r_pass = document.getElementById("r_pass");
	var p = document.getElementsByClassName("text_info");
	var tel = document.getElementById("tel");
	var lbl = document.getElementById("formulario1").getElementsByTagName("label");
	var año = document.getElementById("Y_sele");
	var mes = document.getElementById("M_sele");
	var dia = document.getElementById("D_sele");
	var pConten= "";
	var flag = true;

		//valida las entradas de texto
	for(var i=0; i<entradas.length; i++)
		if(entradas[i].value.length<3){
			entradas[i].style.borderColor = "red";
			pConten += "- Falta llenar datos en " +lbl[i].innerHTML.substr(0,lbl[i].innerHTML.length-2)+"<br>";
			flag = false;
		}else{
			entradas[i].style.borderColor = Color_de_borde	
		}		
	
		//valida la cantidad de caracteres de la contraseña
	if(pass1.value.length>=6){
		p[0].style.color = "Black";		
	}else{
		pass1.style.borderColor = "red";
		p[0].style.color = "red";
		pConten += "- En la contraseña, minimo 6 caracteres <br>"
		flag = false;
	}

		//comproeba que coincida las contraseñas introducida
	if(pass1.value==r_pass.value){
		document.getElementById("err_pass").style.visibility = "hidden";
	}else{
		document.getElementById("err_pass").style.visibility = "visible";
		pass1.style.borderColor = "red";
		r_pass.style.borderColor = "red";
		pConten += "- Error en la contraseña <br>";
		flag = false;
	}

		//valida el tel comprobando que el primer numero comiece por 9, 7 o 6
	if(tel.value[0]==9 || tel.value[0]==7 || tel.value[0]==6){
		tel.style.borderColor = Color_de_borde
	}else{
		tel.style.borderColor = "red";
		pConten += "- Error en el numero de telefono. <br>";
		flag = false;
	}

		//comprueba que se ha elegido una fecha de nacimiento
	if(dia.value=="dd" || mes.value=="mm" || año.value=="yyyy"){
		dia.style.borderColor = "red";
		mes.style.borderColor = "red";
		año.style.borderColor = "red";
		flag = false;
		pConten += "- Error en la fecha de nacimiento <br>";
	}else{
			//si en el mes 2 es mayor que el dia 28, generará un error			
		if(mes.value==2 && dia.value>28 ){
			dia.style.borderColor = "red";
			mes.style.borderColor = "red";
			año.style.borderColor = "red";
			pConten += "- Error en la fecha de nacimiento <br>";
			flag = false;			
			dia.value = dia.getElementsByTagName("option")[0].value;
		}else{
			dia.style.borderColor = Color_de_borde
			mes.style.borderColor = Color_de_borde
			año.style.borderColor = Color_de_borde
		}
	}

	// Despues que se validaran todos los campos, y si todo esta correcto, comprobamos.
	if(flag){
		document.getElementById("comentario").innerHTML = "";
		//Esta funcion se encuentra en index_datos.js
		guardarDatos();		
	}else{
		document.getElementById("comentario").innerHTML = pConten;
	}
}

function validar_car(pos)
{
	var pos_entrada = document.getElementById("formulario1").getElementsByTagName('input')[pos];

	if(pos==3 || pos==4)
		if(pos_entrada.value.length>=6)
			pos_entrada.style.borderColor = "green";
		else
			pos_entrada.style.borderColor = Color_de_borde;
	else if(pos==6)
		if(pos_entrada.value[0]==9 || pos_entrada.value[0]==7 || pos_entrada.value[0]==6)
			pos_entrada.style.borderColor = "green";
		else
			pos_entrada.style.borderColor = Color_de_borde;
	else
		if(pos_entrada.value.length>=3)
			pos_entrada.style.borderColor = "green";
		else
			pos_entrada.style.borderColor = Color_de_borde;	
}
