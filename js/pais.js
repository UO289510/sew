class Pais{

  //datosDiarios = {};
  //mediasDiarias = {};

  constructor(pais, capital, poblacion){
    this.pais=pais;
    this.capital=capital;
    this.circuito="";
    this.poblacion=poblacion;
    this.tipoGob="";
    this.metaCoord="";
    this.religion="";

    this.apikey = "1e0609232f75b9157771534791675217";
    this.ciudad = "Lusail";
    this.tipo = "&mode=xml";
    this.unidades = "&units=metric";
    this.idioma = "&lang=es";
    this.url = "http://api.openweathermap.org/data/2.5/forecast?q="+this.ciudad+this.tipo+this.unidades+this.idioma+"&APPID="+this.apikey;
  }  
  
  rellenar(){
    this.circuito="Circuito Internacional de Lusail";
    this.tipoGob="Monarquia absoluta";
    this.metaCoord="25º 29' 21.19''N   51º 26' 58.56''E";
    this.religion="Islam"
  }

  getNombre(){
    return ""+this.pais;
  }

  getCapital(){
    return ""+this.capital;
  }

  getOtraInfo(){
    return "<ul> <li> Población: "+this.poblacion+"</li>"
    +"<li> Forma de gobierno: "+this.tipoGob+"</li>"
    +"<li> Religión: "+this.religion+"</li>"
    +"<li> Circuito: "+this.circuito+"</li></ul>";
  }

  writeCoord(){
    document.write(this.metaCoord);
  }

  cargarDatos(){
    $.ajax({
      dataType: "xml",
      url: this.url,
      method: 'GET',
      success: function(datos) {
        
        var seccion = document.createElement("section");
        $(datos).find("time").each(function() {
          var desde = $(this).attr("from");
          var hasta = $(this).attr("to");

          var horaDesde = desde.split("T")[1];
          var horaHasta = hasta.split("T")[1];

          var fecha = desde.split("T")[0];
          var año = fecha.split("-")[0];
          var mes = fecha.split("-")[1];
          var dia = fecha.split("-")[2];

          if(horaDesde=="06:00:00" && horaHasta=="09:00:00"){

            var temperatura = $(this).find('temperature').attr("value");
            var temperaturaMin = $(this).find('temperature').attr("min");
            var temperaturaMax = $(this).find('temperature').attr("max");
            var temperaturaUnit = $(this).find('temperature').attr("unit");
            var humedad = $(this).find('humidity').attr("value");
            var humedadUnit = $(this).find('humidity').attr("unit");
            var precipitacion = $(this).find('precipitation').attr("value");
            var precipitacionUnit = $(this).find('precipitation').attr("unit");
            var precipitacionTipo = $(this).find('precipitation').attr("type");
            var symbol = $(this).find('symbol').attr("var");
            var desde = $(this).attr("from");
            var hasta = $(this).attr("to");
            

            if (temperaturaUnit === "kelvin") {
                temperaturaMin = (temperaturaMin - 273.15).toFixed(2);
                temperaturaMax = (temperaturaMax - 273.15).toFixed(2);
                temperaturaUnit = "Celsius";
            }
  
            
            var elemento = document.createElement("article");
            var h3 = document.createElement("h3");
            h3.textContent = dia+"-"+mes+"-"+año;
            elemento.appendChild(h3);
            
            var pTemp = document.createElement("p");
            pTemp.textContent = Math.round(parseFloat(temperatura)) +"º";
            elemento.appendChild(pTemp);
            
            var pMaxTemp = document.createElement("p");
            pMaxTemp.textContent = "Máxima: "+temperaturaMax+"º";
            elemento.appendChild(pMaxTemp);
            
            var pMinTemp = document.createElement("p");
            pMinTemp.textContent = "Minima: "+temperaturaMin+"º";
            elemento.appendChild(pMinTemp);
            
            var pHumedad = document.createElement("p");
            pHumedad.textContent = "Humedad: "+humedad+ " " + humedadUnit;
            elemento.appendChild(pHumedad);
          
            var precipitacionValue = precipitacionTipo+": "+precipitacion+" "+precipitacionUnit;
            var pPrecipitacion = document.createElement("p");

            if(precipitacionValue!="undefined: undefined undefined"){
              pPrecipitacion.textContent = precipitacionValue;
              elemento.appendChild(pPrecipitacion);
            }else{
              pPrecipitacion.textContent = "Precipitación no disponible";
              elemento.appendChild(pPrecipitacion);
            }


            if(symbol){
              var imagen = document.createElement("img");
              imagen.src = "http://openweathermap.org/img/wn/"+symbol+"@2x.png";
            }
            
            elemento.appendChild(imagen);

            seccion.appendChild(elemento);
          }
        });
        document.querySelector("main section").appendChild(seccion);
      },
      error: function() {
          $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
          $("h4, h5, p").remove();
      }
  });
  }

  calcularMedias(){

    $.ajax({
      dataType: "xml",
      url: this.url,
      method: 'GET',
      success: function(datos){
        var seccion = document.createElement("section");
        var datosDiarios = {};
        $(datos).find("time").each(function(){
          var desde = $(this).attr("from");
          
          var fecha = desde.split("T")[0]; 
          
          if(!datosDiarios[fecha]){
            datosDiarios[fecha] = {
              temperatura:0,
              tMax:0,
              tMin:999,
              tUnit:"",
              humedad:0,
              humedadUnit:"",
              precipitacion:0,
              precUnit:"",
              precType:"",
              symbol:"",
              contador:0
            };
          }

            datosDiarios[fecha].temperatura += parseFloat($(this).find("temperature").attr("value"));
            
            var auxTMax = parseFloat($(this).find("temperature").attr("max"));
            if(auxTMax > datosDiarios[fecha].tMax){
              datosDiarios[fecha].tMax = auxTMax;
            }

            var auxTMin = parseFloat($(this).find("temperature").attr("min"));
            if(auxTMin < datosDiarios[fecha].tMin){
              datosDiarios[fecha].tMin = auxTMin;
            }
            
            datosDiarios[fecha].tUnit = $(this).find("temperature").attr("unit");

            datosDiarios[fecha].humedad += parseFloat($(this).find("humidity").attr("value"));
            datosDiarios[fecha].humUnit = $(this).find("humidity").attr("unit");

            datosDiarios[fecha].precipitacion += parseFloat($(this).find("precipitation").attr("value"));
            datosDiarios[fecha].precUnit = $(this).find("precipitation").attr("unit");
            datosDiarios[fecha].precType = $(this).find("precipitation").attr("type");

            datosDiarios[fecha].symbol += "-"+$(this).find("symbol").attr("var");

            datosDiarios[fecha].contador++;
          
        });

        var mediasDiarias = {};

        for(var fecha in datosDiarios){
          mediasDiarias[fecha] = {
            temperatura: (datosDiarios[fecha].temperatura/datosDiarios[fecha].contador).toFixed(0),
            //tMax: (datosDiarios[fecha].tMax/datosDiarios[fecha].contador).toFixed(2),
            tMax: datosDiarios[fecha].tMax,
            //tMin: (datosDiarios[fecha].tMin/datosDiarios[fecha].contador).toFixed(2),
            tMin: datosDiarios[fecha].tMin,
            tUnit: datosDiarios[fecha].tUnit,
            humedad: (datosDiarios[fecha].humedad/datosDiarios[fecha].contador).toFixed(2),
            humedadUnit: datosDiarios[fecha].humUnit,
            precipitacion: (datosDiarios[fecha].precipitacion/datosDiarios[fecha].contador).toFixed(2),
            precUnit: datosDiarios[fecha].precUnit,
            precType: datosDiarios[fecha].precType,
            symbol : ""
          }

          var repeticiones = {};
              var simbolos = datosDiarios[fecha].symbol;
              simbolos = simbolos.split("-");

              simbolos.forEach(elem =>{
                repeticiones[elem] = (repeticiones[elem] || 0)+1;
              });

              var valorMasRepetido="";
              var numRepeticiones=0;
              for(var elem in repeticiones){
                if(repeticiones[elem] > numRepeticiones){
                  numRepeticiones=repeticiones[elem];
                  valorMasRepetido=elem;
                }
              }
          mediasDiarias[fecha].symbol=valorMasRepetido;

          if(mediasDiarias[fecha].tUnit=="celsius"){
            mediasDiarias[fecha].tUnit="º";
          }else{
            mediasDiarias[fecha].tUnit="k";
          }
        }


        for(var fecha in mediasDiarias){

          var articulo = document.createElement("article");

          var media = mediasDiarias[fecha];
          
          var año = fecha.split("-")[0];
          var mes = fecha.split("-")[1];
          var dia = fecha.split("-")[2]; 

          var h3 = document.createElement("h3");
          h3.textContent = dia+"-"+mes+"-"+año;
          articulo.appendChild(h3);

          var pTemp = document.createElement("p");
          pTemp.textContent = media.temperatura+media.tUnit;
          articulo.appendChild(pTemp);

          var pTempMax = document.createElement("p");
          pTempMax.textContent = "Máxima: "+media.tMax+" "+media.tUnit;
          articulo.appendChild(pTempMax);

          var pTempMin = document.createElement("p");
          pTempMin.textContent = "Mínima: "+media.tMin+" "+media.tUnit;
          articulo.appendChild(pTempMin);

          var pHum = document.createElement("p");
          pHum.textContent = "Humedad: "+media.humedad+" "+media.humedadUnit;
          articulo.appendChild(pHum);

          var pPrecipitacion = document.createElement("p");

          var precString = media.precipitacionTipo+": "+media.precipitacion+" "+media.precipitacionUnit;

          if(precString!="undefined: undefined undefined"){
            pPrecipitacion.textContent = " No disponible";
          }else{
            pPrecipitacion.textContent = precString;
          }
          articulo.appendChild(pPrecipitacion);

          if(media.symbol){
            var imagen = document.createElement("img");
            imagen.src = "http://openweathermap.org/img/wn/"+media.symbol+"@2x.png";
            articulo.appendChild(imagen);
          }

          seccion.appendChild(articulo);
        }
        document.querySelector("main section").appendChild(seccion);


      }, error: function(){
        $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
          $("h4, h5, p").remove();
      }
    });
  }
  
  crearElemento(tipoElemento, texto, insertarAntesDe){
    // Crea un nuevo elemento modificando el árbol DOM
    // El elemnto creado es de 'tipoElemento' con un 'texto' 
    // El elemnto se coloca antes del elemnto 'insertarAntesDe'
    var elemento = document.createElement(tipoElemento); 
    elemento.innerHTML = texto;
    $(insertarAntesDe).before(elemento);
  }

  verXML(){
    //Muestra el archivo JSON recibido
    this.crearElemento("h2","Datos en XML desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
    this.crearElemento("h3",this.correcto,"footer"); // Crea un elemento con DOM 
    this.crearElemento("h4","XML","footer"); // Crea un elemento con DOM        
    this.crearElemento("h5","","footer"); // Crea un elemento con DOM para el string con XML
    this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
    this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con XML
    //this.cargarDatos();
    this.calcularMedias();
    $("button").attr("disabled","disabled");
  }
}
