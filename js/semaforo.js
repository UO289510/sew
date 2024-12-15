class Semaforo{

    levels = [0.2, 0.5, 0.8];
    lights = 4;
    unload_moment = null;
    clic_moment = null;
    difficulty = 0;
    firstTry = true;

    constructor(){
        this.createStructure();
    }

    createStructure(){

        this.difficulty = Math.floor(Math.random() * ((this.levels.length-1)+1));

        var mainScreen = document.querySelector("main");

        var encabezado = document.createElement("h2");
        encabezado.textContent = "Semáforo";
        mainScreen.appendChild(encabezado);

        for(var i=0; i<this.lights; i++){
            var light = document.createElement("div");
            mainScreen.appendChild(light);
        }
        
        var bArranque = document.createElement("button");
        bArranque.textContent = "Arranque";
        bArranque.onclick = this.initSequence.bind(this);
        mainScreen.appendChild(bArranque);
        
        var bReaccion = document.createElement("button");
        bReaccion.textContent = "Reacción";
        bReaccion.onclick = this.stopReaction.bind(this);
        bReaccion.disabled = true;
        mainScreen.appendChild(bReaccion);
    }

    initSequence(){
        var delay = 2000 + (this.levels[this.difficulty]*100);
        setTimeout(() =>{
            this.unload_moment = Date.now();
            this.endSequence();
        }, delay);
        
        const boton = document.querySelector("button:first-of-type");
        boton.disabled = true;

        var mainScreen = document.querySelector("main");
        mainScreen.classList.add("load");
    }

    endSequence(){
        const boton = document.querySelector("button:nth-of-type(2)");
        boton.disabled = false;

        var mainScreen = document.querySelector("main");
        mainScreen.classList.replace("load", "unload");
    }

    stopReaction(){
        this.clic_moment = Date.now();
        var tReaction = (this.clic_moment - this.unload_moment).toFixed(3);
        
        var mainScreen = document.querySelector("main");
        
        if(this.firstTry == true){
            this.firstTry = false;
            var result = document.createElement("p");
            result.textContent = "Tiempo de reacción: "+tReaction+" ms";
            mainScreen.appendChild(result);
        }else{
            var result = document.querySelector("main p");
            result.textContent = "Tiempo de reacción: "+tReaction+" ms";
        }
        

        mainScreen.classList.remove("load");
        mainScreen.classList.remove("unload");

        var bReaccion = document.querySelector("button:nth-of-type(2)");
        bReaccion.disabled = true;
        var bArranque = document.querySelector("button:first-of-type");
        bArranque.disabled = false;
        this.createRecordFrom();
    }

    getRandomInt(){
        const minCeiled = Math.ceil(0);
        const maxFloored = Math.floor(this.levels.length);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }


    createRecordFrom(){

        var section = document.createElement("section");

        var title = document.createElement("h3");
        title.textContent = "REGISTRA TU PUNTUACIÓN";
        section.appendChild(title);

        var formulario = document.createElement("form");
        formulario.setAttribute("action", "#");
        formulario.setAttribute("method", "post");
        formulario.setAttribute("name", "formulario");
        section.appendChild(formulario);


        var pNombre = document.createElement("p");
        pNombre.textContent = "Nombre: ";
        var nombre = document.createElement("input");
        pNombre.appendChild(nombre);
        nombre.setAttribute("type", "text");
        nombre.setAttribute("name", "nombre");
        formulario.appendChild(pNombre);

        var pApellidos = document.createElement("p");
        pApellidos.textContent = "Apellidos: ";
        var apellidos = document.createElement("input");
        pApellidos.appendChild(apellidos);
        apellidos.setAttribute("type", "text");
        apellidos.setAttribute("name", "apellidos");
        formulario.appendChild(pApellidos);

        var pNivel = document.createElement("p");
        pNivel.textContent = "Nivel: ";
        var nivel = document.createElement("input");
        pNivel.appendChild(nivel);
        nivel.setAttribute("type", "number");
        nivel.setAttribute("name", "nivel");
        nivel.setAttribute("value", this.difficulty);
        nivel.setAttribute("readonly", true);
        formulario.appendChild(pNivel);
        
        var pReaccion = document.createElement("p");
        pReaccion.textContent = "Tiempo (en segundos): ";
        var reaccion = document.createElement("input");
        pReaccion.appendChild(reaccion);
        reaccion.setAttribute("type", "number");
        reaccion.setAttribute("step", "0.001");
        reaccion.setAttribute("name", "reaccion");
        reaccion.setAttribute("value", ((this.clic_moment - this.unload_moment)/1000).toFixed(3));
        reaccion.setAttribute("readonly", true);
        formulario.appendChild(pReaccion);

        // var pAñadir = document.createElement("p");
        var añadir = document.createElement("input");
        // pAñadir.appendChild(añadir);
        añadir.setAttribute("type","submit");
        añadir.setAttribute("name", "añadir");
        añadir.setAttribute("value", "Añadir");
        // formulario.appendChild(pAñadir);
        formulario.appendChild(añadir);
        section.appendChild(formulario);


        document.querySelector("main").appendChild(section);
    }
}