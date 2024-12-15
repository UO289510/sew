<!DOCTYPE html>

<html lang="es">
<head>
<meta charset="UTF-8" />
<title>F1 Desktop - Viajes</title>
<link rel="icon" href="multimedia/imagenes/favicon2.ico">


<meta name ="author" content ="Daniel López Fdez" />
<meta name ="description" content ="Aquí se podrá consultar información relacionada a los viajes a realizar esta temporada" />
<meta name ="keywords" content ="viajes, qatar, doha, eur, qar, divisa" />
<meta name ="viewport" content ="width=device-width, initial-scale=1.0" />


<link rel="stylesheet" type="text/css" href="estilo/estilos.css" />
<link rel="stylesheet" type="text/css" href="estilo/layout.css" />
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="js/viajes.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js"></script>

</head>

<body>
    <?php
        class Carrusel{

            private $capital;
            private $pais;
            private $photos;

            public function __construct($capital, $pais){
                $this->capital = $capital;
                $this->pais = $pais;
            }

            function loadPhotos(){

                $api_key="12154c801e846fdecba649470074ee2b";
                $tags = "{$this->capital},{$this->pais}";
                // $tags = "{Doha}, {Qatar}, {doha}, {qatar}";
                $perPage = 11;

                $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
                $url.='&api_key='.$api_key;
                $url.= '&tags='.$tags;
                $url.='&tagmode=all';
                $url.= '&per_page='.$perPage;
                $url.= '&format=json';
                $url.= '&nojsoncallback=1';

                $respuesta = file_get_contents($url);
                $json = json_decode($respuesta);

                
                if($json==null){
                    echo "<h3>Error en el archivo JSON recibido</h3>";
                }else{
                    $this-> photos = $json;
                }
                
                $html = "<article>";

                for($i=0;$i<$perPage;$i++){

                    $titulo = $json->items[$i]->title;
                    $URLfoto = $json->items[$i]->media->m; 
                    $URLfoto = str_replace("_m", "_b", $URLfoto); 
                    $html.="<img alt='".$titulo."' src='".$URLfoto."' />";
                }

                $html.="<button> &gt; </button><button> &lt; </button>";

                $html.="</article>";
                echo $html;
            }

        }

        class Moneda {

            private $monedaLocal;
            private $monedaBase;

            function __construct($monedaLocal, $monedaBase){
                    
                $this->monedaLocal = $monedaLocal;
                $this->monedaBase = $monedaBase;
            }

            function getConversionRate(){

                $varAPI = 'https://v6.exchangerate-api.com/v6/';
                $apiKey = '3a3e017c6cb2f6b83223dfb6/';
                $pair = 'pair/';



                // $url = $varAPI . $apiKey . $pair . $this->monedaLocal . '/' . $this->monedaBase;

                
                $req_url = 'https://v6.exchangerate-api.com/v6/3a3e017c6cb2f6b83223dfb6/latest/EUR';
                $response_json = file_get_contents($req_url);

                // Continuing if we got a result
                if(false !== $response_json) {

                    // Try/catch for json_decode operation
                    try {

                        // Decoding
                        $response = json_decode($response_json);

                        // Check for success
                        if('success' === $response->result) {

                            // YOUR APPLICATION CODE HERE, e.g.
                            $base_price = 1; // Your price in USD
                            $QAR_price = round(($base_price * $response->conversion_rates->{$this->monedaLocal}), 2);
                            echo "<p> Su conversion es de : $base_price EUR = $QAR_price QAR </p>";
                        }

                    }
                    catch(Exception $e) {
                        echo "<p> Ha ocurrido un error </p>";
                    }

                }
            }

        }

    ?>


    <header>
        <h1><a href="index.html"> F1 Desktop</a></h1>
        <nav> 
            <a href="index.html">Inicio</a>
            <a href="piloto.html">Piloto</a>
            <a href="noticias.html">Noticias</a>
            <a href="calendario.html">Calendario</a>
            <a href="metereologia.html">Metereología</a>
            <a href="circuito.html">Circuito</a>
            <a class="active" href="viajes.php"><span class="active">Viajes</span></a>
            <a href="juegos.html">Juegos</a>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> Viajes </p>

    <main>
        <h2>Viajes</h2>
        <?php
            $carrusel = new Carrusel("Doha", "Qatar");
            $carrusel->loadPhotos();
        ?>
        <script>
           var viajes = new Viajes();
           viajes.cargarCarrusel();
        </script>

        <section>
            <h2>Planifica tu viaje</h2>
        </section>

    </main>
        <?php
            $moneda = new Moneda("QAR", "EUR");
            $moneda->getConversionRate();
        ?>
</body>
</html>