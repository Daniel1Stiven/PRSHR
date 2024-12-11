<?php
require 'db.php';

$sql = "
    SELECT 
        i.*, 
        t.Descripcion AS transaccion_desc, 
        e.Descripcion AS estado_desc, 
        inm.idInmobiliaria AS inmobiliaria_id,
        inm.NombreInmobiliaria AS inmobiliaria_nombre, 
        tp.Descripcion AS tipo_desc 
    FROM 
        inmueble i
    LEFT JOIN 
        transaccion t ON i.transaccion_idtransaccion = t.idtransaccion
    LEFT JOIN 
        estado e ON i.estado_id_estado = e.id_estado
    LEFT JOIN 
        inmobiliaria inm ON i.inmobiliaria_idInmobiliaria = inm.idInmobiliaria
    LEFT JOIN 
        tipo tp ON i.tipo_idtipo = tp.idtipo
";

$stmt = $pdo->query($sql);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Return the results as JSON
echo json_encode($rows);
?>
