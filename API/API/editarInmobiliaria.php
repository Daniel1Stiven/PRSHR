<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization'); 
header('Access-Control-Allow-Credentials: true'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "stellar_homes";

try {

    $NombreInmobiliaria = $_POST['NombreInmobiliaria'];
    $EmailInmobiliaria = $_POST['EmailInmobiliaria'];

    $stmt = $conn->prepare("UPDATE inmobiliaria SET
    NombreInmobiliaria = :NombreInmobiliaria,
    EmailInmobiliaria = :EmailInmobiliaria  
    WHERE idInmobiliaria = :id_i ");

    $stmt->bindParam(':NombreInmobiliaria', $NombreInmobiliaria);
    $stmt->bindParam(':EmailInmobiliaria', $EmailInmobiliaria);
    $stmt->bindParam(':id_i', $_SESSION['id_i']);
    
    $stmt->execute();

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage(); 
}



