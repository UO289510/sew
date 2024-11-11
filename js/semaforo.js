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
        var tReaction = this.clic_moment - this.unload_moment;
        
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
    }

    getRandomInt(){
        const minCeiled = Math.ceil(0);
        const maxFloored = Math.floor(this.levels.length);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}