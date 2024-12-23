class Memoria{

    deck = [];
    objects = [];
    numberOfMatches=0;
    startMoment = null;
    endMoment = null;

    elements = [
        {element: "RedBull", source:"multimedia/imagenes/RedBull.svg"},
        {element: "RedBull", source:"multimedia/imagenes/RedBull.svg"},
        {element: "McLaren", source:"multimedia/imagenes/McLaren.svg"},
        {element: "McLaren", source:"multimedia/imagenes/McLaren.svg"},
        {element: "Alpine", source:"multimedia/imagenes/Alpine.svg"},
        {element: "Alpine", source:"multimedia/imagenes/Alpine.svg"},
        {element: "Aston Martin", source:"multimedia/imagenes/AstonMartin.svg"},
        {element: "Aston Martin", source:"multimedia/imagenes/AstonMartin.svg"},
        {element: "Ferrari", source:"multimedia/imagenes/Ferrari.svg"},
        {element: "Ferrari", source:"multimedia/imagenes/Ferrari.svg"},
        {element: "Mercedes", source:"multimedia/imagenes/Mercedes.svg"},
        {element: "Mercedes", source:"multimedia/imagenes/Mercedes.svg"} 
    ];


    constructor(){
        this.hasFlippedCard=false;
        this.lockBoard=false;
        this.firstCard=null;
        this.secondCard=null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
        this.gameStart();
    }

    gameStart(){
        window.alert("Pulsa o haz click sobre las tarjetas para encontrar todas las parejas en el menor tiempo posible. El cronometro se activa en cuanto se cierra esta ventana.");
        this.startMoment=Date.now();
    }

    showCards(){
        for(var i=0; i<this.objects.length; i++){
            document.write(this.objects[i]);
        }
    }

    getHasFlippedCard(){
        return this.hasFlippedCard;
    }

    shuffleElements(){
       for(var i=0; i<this.elements.length; i++){
            var j = Math.floor(Math.random() * (i+1)); 
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
       }
    }

    unflipCards(){
        this.lockBoard=true;
        setTimeout(() => {
            this.firstCard.setAttribute("data-state", "hidden");
            this.secondCard.setAttribute("data-state", "hidden");
            this.resetBoard();
        }, 1000);
    }

    resetBoard(){
        this.firstCard=null;
        this.secondCard=null;
        this.hasFlippedCard=false;
        this.lockBoard=false;
    }

    checkForMatch(){
        if(this.firstCard.getAttribute("data-element")==this.secondCard
                                                .getAttribute("data-element")){
            this.disableCards();
            this.numberOfMatches++;
            this.resetBoard();
        }else{
            this.unflipCards();
        }
    }

    disableCards(){
        setTimeout(() =>{
            this.firstCard.setAttribute('data-state', 'revealed');
            this.secondCard.setAttribute('data-state', 'revealed');
            this.resetBoard();
        }, 1000);
    }

    showElems(){
        for(var i=0; i<this.elements.length; i++){
            document.write("<p>"+this.elements[i].element+"</p>"+"<p>"+this.elements[i].source+"</p>");
        }
    }

    createElements(){
        var gameBoard = document.querySelector("section section");

        var titulo = document.createElement("h2");
        titulo.textContent="Juego de Memoria";

        gameBoard.appendChild(titulo);

        for(var i=0; i<this.elements.length; i++){
            var article=document.createElement("article");
            article.setAttribute('data-element', this.elements[i].element);
            
            var name=document.createElement("h3");
            name.textContent="Tarjeta de Memoria";

            var image = document.createElement("img");
            image.setAttribute("src", this.elements[i].source);
            image.setAttribute("alt", this.elements[i].element);

            article.appendChild(name);
            article.appendChild(image);

            gameBoard.appendChild(article);
            this.objects.push(article);
        }
    }

    addEventListeners(){
        for(var i=0; i<this.objects.length; i++){
            this.objects[i].onclick = null;
            this.objects[i].onclick = this.flipCard.bind(this.objects[i], this);
        }
    }

    gameFinished(){
        if(this.numberOfMatches==6){
            this.endMoment=Date.now();
            return true;
        }
        return false;
    }

    flipCard(game) {
            
            if (game.lockBoard) {
                return;
            }   

            // Primera comprobación: si la tarjeta ya está revelada
            if (this.getAttribute("data-state") === "revealed") {
                return;
            }
    
            // Segunda comprobación: si el tablero está bloqueado
            
    
            // Tercera comprobación: si la tarjeta es la misma que la primera seleccionada
            if (this === game.firstCard) {
                return;
            }
    
            // Si ninguna de las condiciones anteriores se cumple, continuamos
            // Modificar el atributo data-state para voltear la tarjeta
            this.setAttribute("data-state", "flip");
    
            // Comprobación de si ya había una tarjeta volteada
            if (!game.hasFlippedCard) {
                // No había ninguna tarjeta volteada
                game.hasFlippedCard = true;
                game.firstCard = this; // Almacena la primera tarjeta seleccionada
            } else {
                // Ya había una tarjeta volteada, esta es la segunda
                game.secondCard = this; // Almacena la segunda tarjeta seleccionada
                game.lockBoard = true;
                game.checkForMatch();   // Comprueba si ambas tarjetas son iguales
            }
            if(game.gameFinished()){
                
                setTimeout(() =>{
                    window.alert("¡Has ganado! Has logrado un tiempo de "+ tiempo +"s");             
                }, 500);
                var tiempo = game.endMoment-game.startMoment;
                tiempo = (tiempo/1000).toFixed(3);
            }
    }
}