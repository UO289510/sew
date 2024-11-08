class Memoria{

    deck = [];
    objects = [];


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
        this.objects = this.createElements();
        this.addEventListeners(this.objects);
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
        setTimeout(this.resetBoard(), 5);
    }

    resetBoard(){
        this.firstCard=null;
        this.secondCard=null;
        this.hasFlippedCard=false;
        this.lockBoard=false;
    }

    checkForMatch(){
        if(this.firstCard==this.secondCard){
            this.disableCards();
        }else{
            this.unflipCards();
        }
    }

    disableCards(){
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');
        this.resetBoard();
    }

    showElems(){
        for(var i=0; i<this.elements.length; i++){
            document.write("<p>"+this.elements[i].element+"</p>"+"<p>"+this.elements[i].source+"</p>");
        }
    }

    createElements(){
        for(var i=0; i<this.elements.length; i++){
             this.objects[i] = "<article data-element= '"+this.elements[i].element+"' >"+
             "<h3> Tarjeta de Memoria </h3>"+"<img src='"+this.elements[i].source+"' alt="+this.elements[i].element+"></article>";
        }
    }

    addEventListeners(cards){
        for(var i=0; i<cards.length; i++){
            cards[i].onclick = this.flipCard.bind(this, cards[i]);
        }
    }

    flipCard(card, game) {
            // Primera comprobación: si la tarjeta ya está revelada
            if (card.getAttribute("data-state") === "revealed") {
                return;
            }
    
            // Segunda comprobación: si el tablero está bloqueado
            if (game.lockBoard) {
                return;
            }
    
            // Tercera comprobación: si la tarjeta es la misma que la primera seleccionada
            if (card === game.firstCard) {
                return;
            }
    
            // Si ninguna de las condiciones anteriores se cumple, continuamos
            // Modificar el atributo data-state para voltear la tarjeta
            card.setAttribute("data-state", "flip");
    
            // Comprobación de si ya había una tarjeta volteada
            if (!game.hasFlippedCard) {
                // No había ninguna tarjeta volteada
                game.hasFlippedCard = true;
                game.firstCard = card; // Almacena la primera tarjeta seleccionada
            } else {
                // Ya había una tarjeta volteada, esta es la segunda
                game.secondCard = card; // Almacena la segunda tarjeta seleccionada
                game.checkForMatch();   // Comprueba si ambas tarjetas son iguales
            }
    }

}
