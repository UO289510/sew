class Circuito{

    archivo = null;

    constructor(){
        if(!(window.File && window.FileReader && window.FileList && window.Blob)){
            document.write("<p>Este navegador no soporta el API File y este programa puede no funcionar correctamente</p>");
        }
    }


    leerArchivoXML(file){
        
        this.archivo=file[0];

        var section = document.createElement("section");
        const lector = new FileReader();


        if(this.archivo.type.match("text/xml")){

            var title = document.createElement("h2");
            title.textContent = this.archivo.name;
            section.appendChild(title);
    
            lector.onload = function(evento){
                
                var xmlDoc = $.parseXML(lector.result);
                var xml = $(xmlDoc);
                
                var doc = xml[0];
                var firstNode = doc.firstChild;
    
                const contenido = function recorre(node){
                    
                    var contenedorNodo = document.createElement("ul");
    
                    var nombre = ""+node.localName;
                    contenedorNodo.textContent = nombre.toUpperCase();
                    
                    var attributes = node.attributes;
                    if(attributes.length > 0){
                        var contenedorAtributos = document.createElement("li");
                        var listaAtributos = document.createElement("ul");
                        contenedorNodo.appendChild(contenedorAtributos);
                        contenedorAtributos.textContent = "Atributos:";
        
                        for(var i=0; i<attributes.length; i++){
                            var attr = document.createElement("li");
                            attr.textContent = attributes[i].name +": "+attributes[i].value;
                            listaAtributos.appendChild(attr);
                        }
        
                        contenedorAtributos.appendChild(listaAtributos);
                    }
    
                    var children = node.children;
                    if(children.length>0){
                        var contenedorHijos = document.createElement("li");
                        var listaHijos = document.createElement("ul");
                        contenedorHijos.textContent = "Hijos: ";
                        
                        for(var i=0; i<children.length; i++){
                            var nodoHijo = recorre(children[i]);
                            listaHijos.appendChild(nodoHijo); 
                        }
                        
                        contenedorHijos.appendChild(listaHijos);
                        contenedorNodo.appendChild(contenedorHijos);
                    }
    
    
                    return contenedorNodo;
                };
                
                section.appendChild(contenido(firstNode));
                document.querySelector("main").appendChild(section);
            };
            lector.readAsText(this.archivo);    
        }else {
            var errorArchivo = document.createElement("p");
            errorArchivo.innerText = "Error: ¡¡¡ Archivo no válido !!!";
            document.querySelector("main").appendChild(errorArchivo);
        }
    }


    leerArchivosKML(files){    
        for(var elem=0; elem<files.length; elem++){
    
            this.archivo=files[elem];
    
            if(this.archivo.name.toLowerCase().endsWith(".kml")){
                
                    const coordenadas = new Array();
                    const infoTramos = new Array();
    
                    const lector = new FileReader();
                    lector.onload = function(evento){
    
                    var kmlDoc = $.parseXML(lector.result);
                    var kml = $(kmlDoc);
    
                    var doc = kml[0];
                    var firstNode = doc.firstChild;
                    var tramos = firstNode.firstChild.children;
    
                    for(var t=0; t<tramos.length-2; t++){
                        
                        var data = tramos[t].children;
    
                        var numero = data[0];
                        numero = numero.textContent.charAt(1);
                        var sector = data[1];
                        sector = sector.textContent.charAt(1);
                        var punto = data[2].children;
    
                        var coord = punto[0];
                        var modoAltitud = punto[1];
    
                        coord = coord.textContent;
                        coord = coord.replace(/\n/g,'');
                        coord = coord.split(",");
    
                        var longitud = parseFloat(coord[0]);
                        var latitud = parseFloat(coord[1]);
                        var altura = parseFloat(coord[2]);
    
                        coordenadas[t] = [longitud, latitud];
    
                        modoAltitud = modoAltitud.textContent;
                        modoAltitud = modoAltitud.replace(/\n/g, '');
    
                        var info = "Tramo: "+numero+" - Sector: "+sector+" - { long: "+longitud+" lat: "+latitud+" altura: "+altura+" m ("+modoAltitud+")}";
                        infoTramos[t]=info;
                    }
    
                var centroLat = coordenadas[0][0];
                var centroLong = coordenadas[0][1];
    
                mapboxgl.accessToken = "pk.eyJ1IjoidW8yODk1MTAiLCJhIjoiY200OG93MnNnMDI2YjJpcjRieXM5cDUybSJ9.HJAZajuwP81PRQqybk2eZw";
                const map = new mapboxgl.Map({
                    container:mapa,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    zoom: 15,
                    center: [centroLat, centroLong],
                    attributionControl:false
                });
    
                map.on('load', ()=>{
                    map.addSource('route', {
                        'type':'geojson',
                        'data':{
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type':'LineString',
                                'coordinates': coordenadas
                            }
                        }
                    });
    
                    map.addLayer({
                        'id':'route',
                        'type':'line',
                        'source':'route',
                        'layout':{
                            'line-join':'round',
                            'line-cap':'round'
                        },
                        'paint':{
                            'line-color':'red',
                            'line-width':8
                        }
                    });
                });
    
                };
                lector.readAsText(this.archivo);
    
                var mapa = document.createElement("div");
                var container = document.createElement("section");
                container.appendChild(mapa);
                document.querySelector("main").appendChild(container);

            }else {
                var errorArchivo = document.createElement("p");
                errorArchivo.innerText = "Error: ¡¡¡ Archivo no válido !!!";
                document.querySelector("main").appendChild(errorArchivo);
            }

        }   
    }

    leerArchivoSVG(file){
        this.archivo=file[0];

        if(this.archivo.name.toLowerCase().endsWith(".svg")){

            var section = document.createElement("section");
            const lector = new FileReader();
    
            lector.onload = function(evento){
                var svgDoc = $.parseXML(lector.result);
                var svg = $(svgDoc);
    
                var doc = svg[0];
                var nodes = doc.firstChild.children;
                
                var polylines = nodes[0];
                polylines = polylines.attributes;
    
                var polyPoints = polylines[0];
                polyPoints = polyPoints.textContent.split(" ");
                var polyStroke = polylines[1];
                var polyStroke_width = polylines[2];
                var polyFill = polylines[4]; 
                
                var points = new Array();
                var etiquetas = new Array();
    
                for(var i=0; i<polyPoints.length; i++){
                    var coords = polyPoints[i];
                    coords = coords.split(",");
                    var x = parseFloat(coords[0]);
                    var y = parseFloat(coords[1]);
    
                    var etiqueta = nodes[i+1].innerHTML.replace(/\n/g, '');
                    etiqueta = etiqueta.split(" ");
    
    
    
                    etiquetas[i] = "Punto "+i+": Altura: "+etiqueta[2]+" m  Distancia aproximada recorrida desde la salida: "+etiqueta[3];
                    points[i] = [x,y];
                }
    
                var content = document.createElement("ul");
    
                for(var i=0; i<nodes.length-1; i++){
                    
                    var etiqueta = etiquetas[i];
                    var punto = points[i];
                    
                    var tramoContenedor = document.createElement("li");
                    var tramo = document.createElement("ul");
                    tramoContenedor.appendChild(tramo);
                    var x = document.createElement("li");
                    var y = document.createElement("li");
    
                    tramo.textContent = etiquetas[i];
                    x.textContent="       Posicion X: "+punto[0];
                    tramo.appendChild(x);
                    y.textContent="       Posicion Y: "+punto[1];                
                    tramo.appendChild(y);
    
                    content.appendChild(tramoContenedor);
                }
    
                section.appendChild(content);
                document.querySelector("main").appendChild(section);
    
            };
            lector.readAsText(this.archivo);
        }else {
            var errorArchivo = document.createElement("p");
            errorArchivo.innerText = "Error: ¡¡¡ Archivo no válido !!!";
            document.querySelector("main").appendChild(errorArchivo);
        }


    }



}