class Fondo{

    constructor(pais, capital, circuito){
        this.pais=pais;
        this.capital=capital;
        this.circuito=circuito;
    }

    // Grand Prix of Qatar
    // Losail International Circuit
    // Losail
    // Qatar

    cargarImagen(){
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI,
            {
                tags: "Grand Prix of Qatar, Losail International Circuit, Losail, Qatar",
                tagmode: "all",
                extras: "date-upload",
                format: "json"
            })
            .done(function(data) {
                $.each(data.items, function(i, item) {
                    var imageUrl = item.media.m;
                    imageUrl = imageUrl.replace("_m", "_b");                    
                    //$("<img />").attr("src", item.media.m).appendTo("main section").attr("alt", item.media.m).appendTo("main section");
                    if(imageUrl){
                        $("body").css("background-image", "url("+imageUrl+")");
                        $("body").css("background-size", "cover");
                        $("body").css("min-height", "100vh");
                    }
                    if(i==3)
                        return false;
                });
            });
    }

}