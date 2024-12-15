class Viajes {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
        //this.verTodo();
        this.getMapaEstaticoMapBox();
        this.getMapaDinamicoMapBox();
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    verTodo(){
        var ubicacion=document.createElement("section");
        var datos=''; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
        document.querySelector("main").appendChild(ubicacion);
    }

    getMapaEstaticoMapBox(){

        var mapa = document.createElement("img");
        var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/";
        // var marcador = "pin-s-Point+FF0000("+this.longitud+","+this.latitud+")";
        var marcador = "geojson(%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B"
                        +"%22marker-color%22%3A%22%23ff0000%22%2C%22marker-size%22%3A%22medium%22%2C%22"
                        +"marker-symbol%22%3A%22circle%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22"
                        +"Point%22%2C%22coordinates%22%3A%5B"+this.longitud+"%2C"+this.latitud+"%5D%7D%7D)";
        var zoom = 15;
        var tamaño = "500x500";
        var apiKey = "?access_token=pk.eyJ1IjoidW8yODk1MTAiLCJhIjoiY200OG93MnNnMDI2YjJpcjRieXM5cDUybSJ9.HJAZajuwP81PRQqybk2eZw";

        var urlMapa = url+marcador+"/"+this.longitud+","+this.latitud+","+zoom+"/"+tamaño+apiKey;

        mapa.setAttribute("src", urlMapa);
        mapa.setAttribute("alt", "Mapa de MapBox");
        document.querySelector("main section").appendChild(mapa);
    }

    getMapaDinamicoMapBox(){

        var div = document.createElement("div");
        var contenedor = document.createElement("section");
        contenedor.appendChild(div);
        document.querySelector("main section").appendChild(contenedor);
        
        mapboxgl.accessToken = "pk.eyJ1IjoidW8yODk1MTAiLCJhIjoiY200OG93MnNnMDI2YjJpcjRieXM5cDUybSJ9.HJAZajuwP81PRQqybk2eZw";
        
        const map = new mapboxgl.Map({
            container:div,
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 15,
            center: [this.longitud, this.latitud],
            attributionControl: false
        });

        map.addControl(new mapboxgl.NavigationControl({
            showZoom: true,
            showCompass: false
        }), 'top-left');

        new mapboxgl.Marker({color:'red'})
        .setLngLat([this.longitud, this.latitud])
        .addTo(map);

        map.resize();
    }

    cargarCarrusel(){

        const slides = document.querySelectorAll('img');
                
        const nextSlide = document.querySelector('article>button:nth-of-type(1)');

        let curSlide = 3;
        let maxSlide = slides.length-1;
                
        nextSlide.addEventListener('click', function(){
            if(curSlide === maxSlide){
                curSlide = 0;
            }else{
                curSlide++;
            }

            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
                
        const prevSlide = document.querySelector('article>button:nth-of-type(2)');

        prevSlide.addEventListener('click', function(){
            if(curSlide === 0){
                curSlide = maxSlide;
            } else {
                curSlide--; 
            }

            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX('+ trans + '%)')
            });
        });
    }
}
