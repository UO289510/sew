<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset ="UTF-8" />
    <link rel="icon" href="multimedia/imagenes/favicon2.ico">
    <title>F1 Desktop - Semáforo</title>

    <meta name ="author" content="Daniel López Fdez" />
    <meta name ="description" content="Aquí se podrá jugar al juego del semaforo"/>
    <meta name ="keywords" content="semaforo, juegos, juego, reflejos, rápidez" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="estilo/estilos.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css"/>
    
    <script src="js/semaforo.js"></script>

</head>

<body>

    <?php
        
        class Record{
            private $db;
            function __construct(){
                $server = "localhost";
                $user = "DBUSER2024";
                $pass = "DBPSWD2024";
                $dbname = "records";
            }

            function addToTable($nombre, $apellidos, $nivel, $reaccion){
                
                $this->db = new mysqli("localhost","DBUSER2024","DBPSWD2024","records");
                if($this->db->connect_errno){
                    echo "Error de conexión: " . $this->db->connect_error;
                }

                $consultaPre = $this->db->prepare("INSERT INTO registro (Nombre, Apellidos, Nivel, Tiempo) VALUES (?,?,?,?)");
                $consultaPre->bind_param("ssid", $nombre, $apellidos, $nivel, $reaccion);
                $consultaPre->execute();
                $consultaPre->close();
            }

            function getTopTen($nivel){

                $this->db = new mysqli("localhost","DBUSER2024","DBPSWD2024","records");
                if($this->db->connect_errno){
                    echo "Error de conexión: " . $this->db->connect_error;
                }

                $nivel = (int)$nivel;

                $result = $this->db->query("SELECT Nombre, Apellidos, Tiempo FROM registro WHERE nivel=$nivel ORDER BY Tiempo DESC LIMIT 10");
                
                $html = "";
                $html .= "<ol>Nombre - Apellidos - Tiempo";

                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $html .= "<li>" . $row['Nombre'] . " - " . $row['Apellidos'] . " - " . $row['Tiempo'] . "</li>";
                    }
                } else {
                    $html .= "<li>No hay registros para el nivel especificado.</li>";
                }
            
                $html .= "</ol>"; 

                echo $html ;

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
                <a href="viajes.php">Viajes</a>
                <a class="active" href="juegos.html"><span class="active">Juegos</span></a>
            </nav>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> Semaforo</p>
    
    <section>
        <h2>Juegos</h2>
        <nav>
            <a href="memoria.html">Memoria</a>
            <a href="semaforo.php">Semaforo</a>
        </nav>
    </section>

    <main>
        <script>
            var semaforo = new Semaforo();
        </script>
        
        <?php
             if(count($_POST)>0){
                $record = new Record();
                $record->addToTable($_POST["nombre"],$_POST["apellidos"],$_POST["nivel"],$_POST["reaccion"]);
                $record->getTopTen($_POST["nivel"]);
            }
        ?>
    </main>


</body>















</html>