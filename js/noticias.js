class Noticias{

    archivo = null;

    constructor(){
        if(!(window.File && window.FileReader && window.FileList && window.Blob)){
            document.write("<p>Este navegador no soporta el API File y este programa puede no funcionar correctamente</p>");
        }
        this.cargarBoton();
    }

    cargarBoton(){
        var boton = document.querySelector("button");
        boton.onclick = this.addToCollection.bind(this);
    }

    readInputFile(files){
        this.archivo = files[0];
        var tipoTexto = /text.*/;
        var main = document.querySelector("main");
        
        // Solo se procesan archivos de texto
        if (this.archivo.type.match(tipoTexto)) {
            var section = document.createElement("section");
            var lector = new FileReader();
    
            lector.onload = function (evento) {
                var lineas = lector.result.split("\n");
                
                // Se procesa cada linea no vacia
                lineas.forEach(linea => {
                    if (linea.trim() === "") return;
    
                    var partes = linea.split("_");
                    if (partes.length === 3) {
                        var [titular, cuerpo, autor] = partes;
    
                        var articulo = document.createElement("article");
                        var h3 = document.createElement("h3");
                        var p = document.createElement("p");
                        var pAutor = document.createElement("p");
    
                        h3.textContent = titular.trim();
                        p.textContent = cuerpo.trim();
                        pAutor.textContent = "Por: " + autor.trim();
    
                        articulo.appendChild(h3);
                        articulo.appendChild(p);
                        articulo.appendChild(pAutor);
    
                        section.appendChild(articulo);
                    }
                });
    
                main.appendChild(section);
            };
    
            lector.readAsText(this.archivo);
        } else {
            var errorArchivo = document.createElement("p");
            errorArchivo.innerText = "Error: ¡¡¡ Archivo no válido !!!";
            main.appendChild(errorArchivo);
        }
    }

    addToCollection(){
        var inputs = document.querySelectorAll("input[type='text']");
        var titular = inputs[0].value.trim();
        var cuerpo = inputs[1].value.trim();
        var autor = inputs[2].value.trim();

        var section = document.querySelector("section:nth-of-type(3)");

        if(titular && cuerpo && autor){
            var articulo = document.createElement("article");
            var h3 = document.createElement("h3");
            var p = document.createElement("p");
            var pAutor = document.createElement("p");

            h3.textContent = titular.trim();
            p.textContent = cuerpo.trim();
            pAutor.textContent = "Por: "+autor.trim();

            articulo.appendChild(h3);
            articulo.appendChild(p);
            articulo.appendChild(pAutor);

            section.appendChild(articulo);
        }

    }
}