(function() {
	
    function stripHtml(value) {
        // remove html tags and space chars
        return value.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
        // remove numbers and punctuation
        .replace(/[0-9.(),;:!?%#$'"_+=\/-]*/g,'');
    }
    jQuery.validator.addMethod("maxWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length < params;
    }, jQuery.validator.format("Please enter {0} words or less."));
	 
    jQuery.validator.addMethod("minWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
    }, jQuery.validator.format("Please enter at least {0} words."));
	 
    jQuery.validator.addMethod("rangeWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1];
    }, jQuery.validator.format("Please enter between {0} and {1} words."));

})();

jQuery.validator.addMethod("letterswithbasicpunc", function(value, element) {
    return this.optional(element) || /^[a-z-.,()'\"\sñáéíóúÁÉÍÓÚñ]+$/i.test(value);
}, "Ingrese s&oacute;lo letras o signos de puntuación.");

jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || (!/[_]+/i.test(value) && /^[\w]+$/i.test(value));
}, "Ingrese s&oacute;lo letras y/o numeros.");

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zsñáéíóúÁÉÍÓÚñ]+$/i.test(value);
}, "Ingrese s&oacute;lo letras.");

jQuery.validator.addMethod("nowhitespace", function(value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
}, "Por favor no espacios en blanco.");

jQuery.validator.addMethod("integer", function(value, element) {
    return this.optional(element) || /^-?\d+$/.test(value);
}, "Ingrese s&oacute;lo numeros positivos o negativos no decimales.");

jQuery.validator.addMethod("digit", function(value, element) {
    return this.optional(element) || /^\d+$/.test(value);
}, "Ingrese s&oacute;lo d&iacute;gitos.");

jQuery.validator.addMethod('telefono', function(value, element) {
    return this.optional(element) || value.length > 9 &&
    value.match(/^[0-9]{2}\-[0-9]{1,}\-[0-9]{1,}$/);
}, 'Por favor ingrese un tel&eacute;fono v&aacute;lido.<br>Ej. 56-2-7923232 o 56-9-7884451');

jQuery.validator.addMethod("fecha_generica", function(value, element) { 
	var bits = value.match( /([0-9]+)/gi ), str;
        if ( ! bits )
        return this.optional(element) || false;
        str = bits[ 1 ] + '-' + bits[ 0 ] + '-' + bits[ 2 ];
        return this.optional(element) || !/Invalid|NaN/.test(new Date( str ));
}, "Por favor ingrese una fecha v&aacute;lida");

$.validator.addMethod(
    "australianDate",
    function(value, element) {
        // put your own logic here, this is just a (crappy) example
        return value.match(/^\d\d?\-\d\d?\-\d\d\d\d$/);
    },
    "Ingrese la fecha con formato dd-mm-yyyy"
);

(function($)
{
  jQuery.fn.Rut = function(options)
  {
    var defaults = {
      digito_verificador: null,
      on_error: function(){},
      on_success: function(){},
      validation: true,
      format: true,
      format_on: 'change'
    };

    var opts = $.extend(defaults, options);

    this.each(function(){
    
      if(defaults.format)
      {
        jQuery(this).bind(defaults.format_on, function(){
          jQuery(this).val(jQuery.Rut.formatear(jQuery(this).val(),defaults.digito_verificador==null));
        });
      }
      if(defaults.validation)
      {
        if(defaults.digito_verificador == null)
        {
          jQuery(this).bind('blur', function(){
            var rut = jQuery(this).val();
            if(jQuery(this).val() != "" && !jQuery.Rut.validar(rut))
            {
                defaults.on_error();
            }
            else if(jQuery(this).val() != "")
            {
                defaults.on_success();
            }
          });
        }
        else
        {
          var id = jQuery(this).attr("id");
          jQuery(defaults.digito_verificador).bind('blur', function(){
            var rut = jQuery("#"+id).val()+"-"+jQuery(this).val();
            if(jQuery(this).val() != "" && !jQuery.Rut.validar(rut))
            {
                defaults.on_error();
            }
            else if(jQuery(this).val() != "")
            {
                defaults.on_success();
            }
          });
        }
      }
    });
  }
})(jQuery);

/**
  Funciones
*/


jQuery.Rut = {

  formatear:  function(Rut, digitoVerificador)
          {
          var sRut = new String(Rut);
          var sRutFormateado = '';
          sRut = jQuery.Rut.quitarFormato(sRut);
          if(digitoVerificador){
            var sDV = sRut.charAt(sRut.length-1);
            sRut = sRut.substring(0, sRut.length-1);
          }
          while( sRut.length > 3 )
          {
            sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
            sRut = sRut.substring(0, sRut.length - 3);
          }
          sRutFormateado = sRut + sRutFormateado;
          if(sRutFormateado != "" && digitoVerificador)
          {
            sRutFormateado += "-"+sDV;
          }
          else if(digitoVerificador)
          {
            sRutFormateado += sDV;
          }
          
          return sRutFormateado;
        },

  quitarFormato: function(rut)
        {
          var strRut = new String(rut);
          while( strRut.indexOf(".") != -1 )
          {
          strRut = strRut.replace(".","");
          }
          while( strRut.indexOf("-") != -1 )
          {
          strRut = strRut.replace("-","");
          }
          
          return strRut;
        },

  digitoValido: function(dv)
        { 
          if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' 
            && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' 
            && dv != 'k'  && dv != 'K')
          {   
            return false; 
          } 
          return true;
        },

  digitoCorrecto:   function(crut)
          { 
            largo = crut.length;
            if ( largo < 2 )  
            {   
              return false; 
            }
            if(largo > 2)
            {
              rut = crut.substring(0, largo - 1);
            }
            else
            {   
              rut = crut.charAt(0);
            }
            dv = crut.charAt(largo-1);
            jQuery.Rut.digitoValido(dv);  
          
            if(rut == null || dv == null)
            {
              return 0;
            }

            dvr = jQuery.Rut.getDigito(rut);

            if (dvr != dv.toLowerCase())  
            {   
              return false;
            }
            return true;
          },

  getDigito:    function(rut)
        {
          var dvr = '0';
          suma = 0;
          mul  = 2;
          for(i=rut.length -1;i >= 0;i--) 
          { 
            suma = suma + rut.charAt(i) * mul;    
            if (mul == 7)
            {
              mul = 2;
            }   
            else
            {         
              mul++;
            } 
          }
          res = suma % 11;  
          if (res==1)
          {
            return 'k';
          } 
          else if(res==0)
          {   
            return '0';
          } 
          else  
          {   
            return 11-res;
          }
        },

  validar:   function(texto)
        {
          texto = jQuery.Rut.quitarFormato(texto);
          largo = texto.length;
        
          // rut muy corto
          if ( largo < 2 )  
          {
            return false; 
          }
    
          // verifica que los numeros correspondan a los de rut
          for (i=0; i < largo ; i++ ) 
          {   
            // numero o letra que no corresponda a los del rut
            if(!jQuery.Rut.digitoValido(texto.charAt(i)))
            {     
              return false;
            }
          }
    
          var invertido = "";
          for(i=(largo-1),j=0; i>=0; i--,j++)
          {
            invertido = invertido + texto.charAt(i);
          }
          var dtexto = "";
          dtexto = dtexto + invertido.charAt(0);
          dtexto = dtexto + '-';  
          cnt = 0;  
        
          for ( i=1,j=2; i<largo; i++,j++ ) 
          {
            if ( cnt == 3 )   
            {     
              dtexto = dtexto + '.';      
              j++;      
              dtexto = dtexto + invertido.charAt(i);      
              cnt = 1;    
            }
            else    
            {       
              dtexto = dtexto + invertido.charAt(i);      
              cnt++;    
            } 
          } 
        
          invertido = ""; 
          for (i=(dtexto.length-1),j=0; i>=0; i--,j++)
          {   
            invertido = invertido + dtexto.charAt(i);
          }
    
          if (jQuery.Rut.digitoCorrecto(texto))
          {   
            return true;
          }
          return false;
        }
};

$.validator.addMethod("rut", function(value, element) {
	return this.optional(element) || $.Rut.validar(value);
	}, "Ingrese un rut v&aacute;lido.");

$.validator.addMethod("require_from_group", function(value, element, options) {
  var numberRequired = options[0];
  var selector = options[1];
  var fields = $(selector, element.form);
  var filled_fields = fields.filter(function() {
    // it's more clear to compare with empty string
    return $(this).val() != ""; 
  });
  var empty_fields = fields.not(filled_fields);
  // we will mark only first empty field as invalid
  if (filled_fields.length < numberRequired && empty_fields[0] == element) {
    return false;
  }
  return true;
// {0} below is the 0th item in the options field
}, jQuery.format("Please fill out at least {0} of these fields."));