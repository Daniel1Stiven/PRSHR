<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization'); 
header('Access-Control-Allow-Credentials: true'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "stellar_homes";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Nombre = $_POST['Nombre'];
    $descripcion = $_POST['descripcion'];
    $localidad = $_POST['localidad'];
    $direccion = $_POST['direccion'];
    $numCont = $_POST['numCont'];
    $precio = $_POST['precio'];
    $fechaPubli = $_POST['fechaPubli'];
    $estado_id_estado = $_POST['estado_id_estado'];
    $tipo_idtipo = $_POST['tipo_idtipo'];
    $transaccion_idtransaccion = $_POST['transaccion_idtransaccion'];

    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $imagenTmp = $_FILES['imagen']['tmp_name'];
        $imagenNombre = basename($_FILES['imagen']['name']);
        $imagenRuta = 'uploads/' . $imagenNombre;        
        if (move_uploaded_file($imagenTmp, $imagenRuta)) {
            $sql = "INSERT INTO inmueble (Nombre, imagen, Descripcion, localidad, Direccion, NumCont, precio, FechaPubli, estado_id_estado, tipo_idtipo, transaccion_idtransaccion, inmobiliaria_idInmobiliaria) 
        VALUES (:Nombre, :imagen, :descripcion, :localidad, :direccion, :numCont, :precio, :fechaPubli, :estado_id_estado, :tipo_idtipo, :transaccion_idtransaccion, :inmobiliaria_idInmobiliaria)";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':Nombre', $Nombre);
        $stmt->bindParam(':imagen', $imagenRuta);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':localidad', $localidad);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':numCont', $numCont);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':fechaPubli', $fechaPubli);
        $stmt->bindParam(':estado_id_estado', $estado_id_estado);
        $stmt->bindParam(':tipo_idtipo', $tipo_idtipo);
        $stmt->bindParam(':transaccion_idtransaccion', $transaccion_idtransaccion);
        $stmt->bindParam(':inmobiliaria_idInmobiliaria', $inmobiliaria_idInmobiliaria); 

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Inmueble añadido correctamente.']);
        }else {
            echo json_encode(['success' => false, 'message' => 'Error al añadir el inmueble.']);
        }

}
?>