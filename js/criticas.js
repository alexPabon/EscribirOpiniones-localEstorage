var ses_usuario;
var lugares ="";
var flag = false;

// Cuando se carga la pagina, oculta el boton de borrar y comprueba que
// los usuarios esten logueado
function carga_pg()
{
	var btnBorrar = document.getElementById('borrar');
	var nombre = document.getElementById("cliente");
	var nombreUsuario = document.getElementById("n_usuario");
	
	btnBorrar.style.display="none";

	ses_usuario = sessionStorage.getItem("criticas");

	if(ses_usuario == null){
		location.href = "index.html";
	}else{
		ses_usuario = JSON.parse(ses_usuario);
		flag = true;		
	}

	nombre.innerHTML = ses_usuario[0].toUpperCase()+" "+ses_usuario[1].toUpperCase()
	nombreUsuario.innerHTML = ses_usuario[2];
}

// Toma la informacion del array lugares y la carga en el select
function carga_info()
{
	var selecLugar = document.getElementById("sele_lugar");
	var seleConten ="";
	var lugares = ["Lugares","Sagrada Familia","Park Güell","La pedrera","Casa Batlló","La catedral"];

	for(var i =0; i<lugares.length; i++)
	{
		if(i==0)
			seleConten += '<option disabled selected="">- - '+lugares[i]+' - -</option>';
		else
			seleConten += '<option>'+lugares[i]+'</option>';		
	}

	selecLugar.innerHTML= seleConten;
}

//Eliminamos el elemento que hemos creado para iniciar la sesion y redireccionamos a index.html
function cerrarSesion()
{
	sessionStorage.removeItem("criticas");
	location.href = "index.html";
}

//Insertamos las opiniones, por un lado en descripcion tenemos la vista previa del comentario
// que hemos escrito y en el muro, aparecerá las opiniones de todos los usuarios.
function insert_post()
{
	var ul0 = document.getElementById("lug");
	var lista0 = ul0.getElementsByTagName('li');
	var ul1 = document.getElementById("desc");
	var lista1 = ul1.getElementsByTagName('li');
	var l = document.createElement("li");
	var lugar = document.getElementById("sele_lugar");	
	var btnBorrar = document.getElementById('borrar');
	var msnError = document.getElementById("error");
	var entradaOpinion = document.getElementById("mensaje");
	var descripcion = document.getElementById("descripcion");
	var publicaciones = document.getElementById("muro");


	entradaOpinion.style.display="block";
	btnBorrar.style.display="";
	
		//si la opinion esta vacia o no ha seleccionado un lugar
	if(entradaOpinion.value=="" || lugar.value=="- - Lugares - -"){
		msnError.innerHTML = "Debe seleccionar un lugar y escribir un comentario";
	}else{
		msnError.innerHTML = "";
		ul0.appendChild(l);
		lista0[lista0.length-1].innerHTML = lugar.value;

		l = document.createElement("li");
		ul1.appendChild(l);
		lista1[lista1.length-1].innerHTML = entradaOpinion.value;
		
		//Esta condicion es para igualar la altura de las dos listas con ".offsetHeight"
		if(lista1[lista1.length-1].offsetHeight>0)
			lista0[lista0.length-1].style.height = lista1[lista1.length-1].offsetHeight+"px";
		
		entradaOpinion.value ="";	
	}

	
		//si anteriormente se ha creado una <li>, mostrará la descripcion y oculta 
		//los comentarios
	if(lista0.length>1){
		descripcion.style.display="block";
		publicaciones.style.display="none";
	}else{
		descripcion.style.display="none";
	}
}

//Elimina el ultimo comentario que hayamos introducido recientemente
function borraUltimoLis()
{
	var lista0 = document.getElementById("lug").getElementsByTagName('li');
	var lista1 = document.getElementById("desc").getElementsByTagName('li');
	var descripcion = document.getElementById("descripcion");
	var ulLugar = document.getElementById("lug");
	var ulDescripcion = document.getElementById("desc");

	if(lista0.length>1)
	{
		ulLugar.removeChild(lista0[lista0.length-1])
		ulDescripcion.removeChild(lista1[lista1.length-1])

		if(lista0.length==1)
			descripcion.style.display = "none";
	}	
}

//carga todos los comentarios que han subido los usuarios
function cargarPosts()
{
	var ul0 = document.getElementById("lug");
	var lista0 = ul0.getElementsByTagName('li');
	var ul1 = document.getElementById("desc");
	var lista1 = ul1.getElementsByTagName('li');
	var btnBorrar = document.getElementById('borrar');
	var msnError = document.getElementById("error");
	var entradaOpinion = document.getElementById("mensaje");
	var publicaciones = document.getElementById("muro");
	var borrar0 ="";
	var borrar1 ="";
	var contenido ="";
	var posts = "";
	var fecha = new Date();
	var formated_date = fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();

		//Variable para cargar los comentarios del post de todos los usuarios
	var lugar = document.getElementById("sele_lugar");
	var posts = localStorage.getItem(lugar.value);
	var container_posts = document.getElementById("muro");
	var divContent='';

	btnBorrar.style.display="none";
	msnError.innerHTML = "";

		//Añadir los comentarios que estaban en la lista previa a localEstorage
	for(var i=1; i<lista0.length; i++){
			contenido = [ses_usuario[2],lista1[i].innerHTML, formated_date];
			posts = localStorage.getItem(lista0[i].innerHTML);	

			if(posts==null){
				var array_lugar = [contenido];
				localStorage.setItem(lista0[i].innerHTML, JSON.stringify(array_lugar));		
			}else{
				posts = JSON.parse(posts);
				posts.push(contenido);
				localStorage.setItem(lista0[i].innerHTML, JSON.stringify(posts));
			}
		}		

	entradaOpinion.value = "";
	entradaOpinion.style.display="none";
	
		//Carga todas la opiniones que estan guardadas en localEstorage
	if(posts==null && lugar.value!="- - Lugares - -"){		
		divContent = "<h2>"+lugar.value+"</h2>";
		divContent +="<div class='post'>";
			divContent+="<div class='header_post'>";
				divContent+="<h3>No se han escrito opiniones, se el primero en escribir tu opinion</h3>";
		divContent+="</div>";
		
		container_posts.innerHTML = divContent;
		entradaOpinion.style.display="none";
		publicaciones.style.display="block";
	}
	else if(posts!=null && lugar.value!="--lugares--")
	{
		posts = JSON.parse(posts);
		divContent = "<h2>"+lugar.value+"</h2>";

		for(var i = posts.length-1; i>=0; i--)
		{
			divContent+="<div class='post'>";
				divContent+="<div class='header_post'>";
					divContent+="<span class='nick_post'>"+posts[i][0]+"</span>";
					divContent+="<span class='date_post'>"+posts[i][2]+"</span>";
				divContent+="</div>";
				divContent+="<p>"+posts[i][1]+"</p>";
			divContent+="</div>";
		}
		container_posts.innerHTML = divContent;

		for(var j=lista0.length; j>1; j--)
		{
			borrar0 = ul0.removeChild(lista0[j-1]);
			borrar1 = ul1.removeChild(lista1[j-1]);
		}
		entradaOpinion.style.display="none";
		publicaciones.style.display="block";  		
	}
	
}