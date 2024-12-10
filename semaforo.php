<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset ="UTF-8" />
    <link rel="icon" href="multimedia/imagenes/favicon2.ico">
    
    <meta name ="author" content="Daniel López Fdez" />
    <meta name ="description" content="Aquí se podrá jugar al juego del semaforo"/>
    <meta name ="keywords" content="..." />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="estilo/estilos.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css"/>
    <script src="js/semaforo.js"></script>

</head>

<body>

    <?php
        
        class Vehiculo{
            function __construct(){
                $server = "localhost";
                $user = "DBUSER2024";
                $pass = "DBPSWD2024";
                $dbname = "records";
            }
        
        
        
        }

    ?>

    <header>
        <h1><a href="index.html"> F1 Desktop</a></h1>
        <nav>
            <nav> 
                <a href="index.html">Inicio</a>
                <a href="piloto.html">Piloto</a>
                <a href="noticias.html">Noticias</a>
                <a href="calendario.html">Calendario</a>
                <a href="metereologia.html">Metereología</a>
                <a href="circuito.html">Circuito</a>
                <a href="viajes.html">Viajes</a>
                <a class="active" href="juegos.html"><span class="active">Juegos</span></a>
            </nav>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> Semaforo</p>
    
    <section>
        <h2>Juegos</h2>
        <nav>
            <a href="memoria.html">Memoria</a>
            <a href="semaforo.html">Semaforo</a>
        </nav>
    </section>

    <main>
        <script>
            var semaforo = new Semaforo();
        </script>

    </main>


</body>















</html>