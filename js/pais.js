class Pais{

  constructor(pais, capital, poblacion){
    this.pais=pais;
    this.capital=capital;
    this.circuito="";
    this.poblacion=poblacion;
    this.tipoGob="";
    this.metaCoord="";
    this.religion="";
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

}
var pais = new Pais("Qatar", "Doha", "2 719 391 hab")
pais.rellenar();