<?php
// Incluir el archivo de conexión a la base de datos
require 'db.php';

// Verificar si el parámetro 'id' se pasa por GET
if (isset($_GET['id'])) {
    $id = $_GET['id']; // Obtener el ID del documento

    // Verificar si el formulario fue enviado mediante POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Consulta SQL para eliminar el documento de la base de datos
        $sql = "DELETE FROM doc_cliente WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        // Redirigir a la página de verificación con un mensaje de éxito
        header("Location: verificar_documentos.html?message=eliminado_correctamente");
        exit();
    }
} else {
    // Si no se especifica el ID, mostrar un mensaje de error
    die("ID de Documento no especificado.");
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eliminar Documento</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        header {
            background-color: #1a237e;
            color: #fff;
            padding: 1.5em 0;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        section {
            width: 90%;
            max-width: 400px;
            margin: 2em auto;
            padding: 2em;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        button {
            background-color: #e74c3c;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #c0392b;
        }
        a {
            display: inline-block;
            margin-top: 10px;
            text-decoration: none;
            color: #3498db;
            font-size: 16px;
        }
        a:hover {
            color: #2980b9;
        }
    </style>
</head>
<body>
    <header>
        <h1>Eliminar Documento</h1>
    </header>

    <section>
        <h2>¿Estás seguro de que deseas eliminar este documento?</h2>
        <!-- Formulario de eliminación -->
        <form action="eliminar.php?id=<?php echo htmlspecialchars($id); ?>" method="post">
            <button type="submit">Sí, eliminar</button>
        </form>
        <!-- Enlace para cancelar la eliminación -->
        <a href="verificar_documentos.html">Cancelar</a>
    </section>
</body>
</html>
