/*Plugin creed-validate  1.0
Author: Antonio Superlano
correo: ajsuperlano@gmail.com

Uso: El uso del plugin se usa pasando el id del formulario a validate
*  Modo de uso: 
* Use : $("#Form").creedValidateText(); para ejecutar validaciones en los campos del formulario
* Use : $("#Form").verificarACM(); para verificar que campo obligatorios no esten vacios 
* Solo recibe un parametro elemPerPage que define cuantos rows mostrara por pagina
* si no se indica el parametro por defecto son 2
*/

(function ( $ ) {
	/* función privada*/
	
	$.fn.creedValidate = function() {
		var form = $( this );
			// console.log(form)
/**
 * [recorro cada campo de el formulario]
 */
 form.find("input,select,textarea").each(function(){
 	if (validate = this.getAttribute("validate")) {
 		validate = validate.split("|");
 		/*console.log( $(this).siblings('label'));*/
 		if (validate[0] == 1) {$('label[for="'+this.id+'"]').append(' <i style="color:red" title="requerido">*</i> ') };

 		if(validate[1] == "L")             { this.onkeypress = function(event) {return validaL(event,this);    } }
 		else if(validate[1] == "N")        { this.onkeypress = function(event) {return validaN(event,this);    } }
 		else if(validate[1] == "D")        { this.onkeypress = function(event) {return validaD(event,this);    } }
 		else if(validate[1] == "LE")       { this.onkeypress = function(event) {return validaLE(event,this);   } }
 		else if(validate[1] == "NE")       { this.onkeypress = function(event) {return validaNE(event,this);   } }
 		else if(validate[1] == "LN")       { this.onkeypress = function(event) {return validaLN(event,this);   } }
 		else if(validate[1] == "LNE")      { this.onkeypress = function(event) {return validaLNE(event,this);  } }
 		else if(validate[1] == "LNEC")     { this.onkeypress = function(event) {return validaLNEC(event,this); } }
 		else if(validate[1] == "email")    { this.onblur = function(event)     {return validaEmail(this);      } }
 		else if(validate[1] == "telefono") { this.onblur = function(event)     {return validaTelefono(this);   } }
 		else if(validate[1] == "cedula")   { this.onblur = function(event)     {return validaCedula(this);     } }
 		else if(validate[1] == "rif")      { this.onblur = function(event)     {return validaCedula(this);     } }
 		if (validate[2] != undefined){
 			if(validate[2].indexOf(":")!=-1 ) { add_max_min(this,validate[2]); }
 		}

 	};
 });
 return this;
};
$.fn.creedValidateCheck = function() {

	var form = $( this );
/**
 * [recorro cada campo de el formulario]
 */
 var invalido=0;
 form.find("input,select,textarea").each(function(){
 	if (validate = this.getAttribute("validate")) {
 		validate = validate.split("|");
 		if(validate[0] == "1" && this.value == "")
 		{ 
 			invalido++; this.style.border = "1px solid red"; 
 		} else{ 
 			this.style.border = "";
 		} 
 		//console.log(validate);	

 	};


 });
 if (invalido > 0) { 
 	$('#creedValidateText').css({display: "block", "text-align": "center", color: "red"}).html('Por favor complete los campos Obligatorios, resaltados con "*" </i>');
 	return 0 ;
 }else {
 	$('#creedValidateText').css({display: "", "text-align": "", color: ""}).html('');
 	return 1}

 };
/**
	* funciones que empisan con valida mas una terminacion 
	* [valida  funciones para validate la escritura en campos, campo de texto, input o textarea]
	* @param  {[type]} e       [tecla pulsada, e.keyCode || e.which, compatible entre navegadores]
	* @var    {[string]} tecla [tecla pulsada convertida en minuscula para la combrobacion]
	* @var    {[string]} caracter [valores a comprobar en la validacion]
	* teminaciones 
	* L: solo letras lentras 
	* LE: letras y espacio
	* N: Solo numeros
	* NE: numeros y espacio
	* LN: letras y numeros
	* LNE: Letras, numeros y espacio
	* LNEC: Letras, numeros. espacio Caracteres especiales : ,.;:¡!¿?#$%&()"
	*/
	var validaL = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = "áéíóúabcdefghijklmnñopqrstuvwxyz"; 
		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		/*si no pulse una tecla valida, y la tecla_especial no se pulso*/
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
	};
	var validaLE = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = " áéíóúabcdefghijklmnñopqrstuvwxyz"; 

		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		/*si no pulse una tecla valida, y la tecla_especial no se pulso*/
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
		
	};

	var validaN = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = "1234567890"; /*caracteres admitidos*/
		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		/*si no pulse una tecla valida, y la tecla_especial no se pulso*/
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
	};
	var validaD = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = "1234567890."; /*caracteres admitidos*/
		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		/*si no pulse una tecla valida, y la tecla_especial no se pulso*/
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
	};
	var validaNE = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = " 1234567890"; /*caracteres admitidos*/
		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		/*si no pulse una tecla valida, y la tecla_especial no se pulso*/
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
	};
	var validaLN = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = "áéíóúabcdefghijklmnñopqrstuvwxyz1234567890"; /*caracteres admitidos*/
		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		/*si no pulse una tecla valida, y la tecla_especial no se pulso*/
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
	};
	var validaLNE = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = " áéíóúabcdefghijklmnñopqrstuvwxyz1234567890"; /*caracteres admitidos*/
		especiales = [8,35,36,37,46,39,9];
		tecla_especial = !1;    
		for(var i in especiales) {
			if(key == especiales[i]) {
				if(charKey==0){
					tecla_especial = true;
					break;    
				}
			}
		}
		if(caracter.indexOf(tecla) == -1 && !tecla_especial) {
			return!1;
		}
	};
	var validaLNEC = function(e,input) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		caracter = " áéíóúabcdefghijklmnñopqrstuvwxyz1234567890,.;:¡!¿?#$%&()\""; /*caracteres admitidos*/
		if(caracter.indexOf(tecla) == -1 ) {
			return!1;
		}
	};

	function validaEmail(input) {
		var patron = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(input.value!="") {
			if (!patron.test(input.value)) {
				alert("Error: La dirección de correo <" +input.value+ "> es incorrecta.");
				input.value = "";
				input.focus();
			}
		}  
	};
	/* solo formato venezuela*/
	function validaTelefono(input) {
		var patron = /^([0-9]{4,4}(|\-)([0-9]{7,7}))$/		
		if(input.value!="") {
			if (!patron.test(input.value)) {
				alert("Error: El numero de telefono <" +input.value+ "> esta en un formato incorrectopor favor introdusca nuevamente.");
				input.value="";
				input.focus();
			}
		}
	};
	function validaCedula(input) {
		var patron = /^[evEV]\-([0-9]{6,8})+$/;
		if(input.value!="") {
			if (!patron.test(input.value)) {
				alert("Error: El numero de cedula <" +input.value+ "> esta en un formato incorrecto por favor introdusca nuevamente.");
				input.value="";
				input.focus();
			}
		}
	};
	function validaRif(input) {
		var patron = /^[EAGVeagv]\-([0-9]{7,7})\-([0-9]{1,1})+$/;
		if(input.value!="") {
			if (!patron.test(input.value)) {
				alert("Error: El RIF  <" +input.value+ "> esta en un formato incorrecto por favor introdusca nuevamente.");
				input.value="";
				input.focus();
			}
		}
	};

	function add_max_min(input,valor) {
		valor = valor.split(":"); 
		if (valor[2] != undefined){
			input.setAttribute("min",valor[0]);
			input.setAttribute("max",valor[1]);
		} else {
			input.setAttribute("minlength",valor[0]);
			input.setAttribute("maxlength",valor[1]);
		}
	} 	

}( jQuery ));