class Agenda{


    constructor(){
        this.url="https://ergast.com/api/f1/current.json";
        this.cargarBoton();
    }

    cargarBoton(){
        var boton = document.querySelector("button");
        boton.onclick = this.cargarDatos.bind(this);
    }

    cargarDatos() {
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var raceTable = datos.MRData.RaceTable;
                var races = raceTable.Races;
                var section = document.createElement("section");
                var articulo = document.createElement("article"); 
                section.appendChild(articulo);

                races.forEach((race, index) => {
                    
                    var container = document.createElement("section");
                    
                    var fecha = document.createElement("h3");
                    fecha.textContent=race.date +"   "+race.time;
                    container.appendChild(fecha);

                    var nombre = document.createElement("p");
                    nombre.textContent=race.raceName;
                    container.appendChild(nombre);

                    var circuito = document.createElement("p");
                    circuito.textContent=race.Circuit.circuitName;
                    container.appendChild(circuito);

                    var coordenadas = document.createElement("p");
                    var lat = race.Circuit.Location.lat;
                    var long = race.Circuit.Location.long;

                    var stringCoord = "";

                    if(lat<0){
                        stringCoord += lat+"S";
                    }else{
                        stringCoord += lat+"N";
                    }

                    stringCoord +="  ";

                    if(long<0){
                        stringCoord += long+"O";
                    }else{
                        stringCoord += long+"E";
                    }

                    coordenadas.textContent=stringCoord;
                    container.appendChild(coordenadas);

                    
                    articulo.appendChild(container);
                });
                document.querySelector("main").appendChild(section);
            },
            error: function() {
          $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
          $("h4, h5, p").remove();
      }
        });
    }

}