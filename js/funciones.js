//agarando canvas
var cuadrito = document.getElementById("canvas_cuadrito");
var papel    = cuadrito.getContext("2d");

//medidas el canvas
var ancho = cuadrito.width;
var alto  = cuadrito.height;

//cordenadas de inicio
var x = ancho / 2;
var y = alto / 2 ;

//saber el estado el puntero
var estado;
var estado_material;

var pincel  = document.getElementById("pincel");
var borrar  = document.getElementById("borrador");
var rallita = document.getElementById("rallita");


//Color and Size
var color_Id = document.getElementById("color");
var color;

var size_Id = document.getElementById("size");
var size;

//eventos!!!!!!!!
document.addEventListener('keydown', DibujarConTeclas);

//eventos para el mouse
document.addEventListener('mousedown', mousePreciona);
document.addEventListener('mousemove', mouseSeMueve);
document.addEventListener('mouseup', mouseDeja);



//materiales de Dibujo para el canvas
pincel.addEventListener('click', pincel_fun);
borrar.addEventListener('click', borrar_fun);
rallita.addEventListener('click', rallita_fun);



//puntito del centro
Dibujar(papel, x-1, y-1, x+1, y+1, "red", 2);


/*Funcciones*/

//Dibuja en el papel de fomar mas sencilla
function Dibujar(papel, xInicial, yInicial, xFinal, yFinal, color, size) {
	
	papel.lineWidth = size;
	papel.beginPath();
	papel.strokeStyle = color;
	papel.moveTo(xInicial, yInicial);
	papel.lineTo(xFinal, yFinal);
	papel.stroke();
	papel.closePath();
}




//Dibujar Con Las Teclas
function DibujarConTeclas(eventos)
{

	//se actualiza para saber que datos que coloco el usuario
	color = color_Id.value;
	size  = parseInt(size_Id.value);
	
	//movimiento por cada teclado
	var movimiento = 5;

	
	switch(eventos.keyCode) {


		//Izquierdad
		case 37:
			Dibujar(papel, x, y, x - movimiento, y, color, size);
			
			x = x - movimiento;
		break;

		//Arriba
		case 38:
			Dibujar(papel, x, y, x, y - movimiento, color, size);

			y = y - movimiento;
		break;

		//Derecha
		case 39:
			Dibujar(papel, x, y, x + movimiento, y, color, size);

			x = x + movimiento;
		break;

		//Abajo
		case 40:
			Dibujar(papel, x, y, x, y + movimiento, color, size);

			y = y + movimiento;
		break;
	}

}





/*
 *Funciones para el pincel o los 
 *materiales de paint
 */

//estas funciones solo es para darle valor al estado_material
function borrar_fun()
{
	estado_material = 2;
}
function pincel_fun()
{
	estado_material = 1;
}
function rallita_fun()
{
	estado_material = 3;
}


//para que estado tenga su cantidad corespondiente
function EstadoDeEstadoXd()
{
	switch(estado_material){

		case 1:
			estado = 1;

			return estado;
		break;

		case 2:
			estado = 2;

			return estado;
		break;

		case 3:
			estado = 3

			return estado;
		break;
	}
}



//funciones para el mouse
function mousePreciona (eventos) 
{
	
	//guarda la ubicacion el puntero
	x = eventos.layerX;
	y = eventos.layerY;
	
	estado = EstadoDeEstadoXd();

}

function mouseSeMueve(eventos) 
{

	//se actualiza para saber que datos que coloco el usuario
	color = color_Id.value;
	size  = parseInt(size_Id.value);

	switch (estado)
	{
		case 1:
		
			Dibujar(papel, x, y, eventos.layerX, eventos.layerY, color, size);

			x = eventos.layerX;
			y = eventos.layerY;

		break;

		case 2:
			
			papel.clearRect( x, y, -size, -size);

			x = eventos.layerX;
			y = eventos.layerY;

		break;

		case 3:
			
			Dibujar(papel, x, y, eventos.layerX, eventos.layerY, color, size);

		break;
	}

}

function mouseDeja (eventos)
{

	x = eventos.layerX;
	y = eventos.layerY;

	estado = 0;

}



