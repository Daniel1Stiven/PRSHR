<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $Nombre_Usuario = $_POST['Nombre_Usuario'];
    $Correo_Usuario = $_POST['Correo_Usuario'];
    $Numero_Documento = $_POST['Numero_Documento'];

    if (empty($Nombre_Usuario) || empty($Correo_Usuario) || empty($Numero_Documento)) {
        echo "Por favor, complete todos los campos obligatorios.";
        exit();
    }

    $Cargar_Documento = $_FILES['Cargar_Documento'];
    $Certificado_Laboral = $_FILES['Certificado_Laboral'];
    $Ultimos_Extractos_Bancarios = $_FILES['Ultimos_Extractos_Bancarios'];
    $Certificados_de_ingresos = $_FILES['Certificados_de_ingresos'];

    $target_dir = "uploads/";

    $Cargar_Documento_Path = $target_dir . basename($Cargar_Documento['name']);
    $Certificado_Laboral_Path = $target_dir . basename($Certificado_Laboral['name']);
    $Ultimos_Extractos_Bancarios_Path = $target_dir . basename($Ultimos_Extractos_Bancarios['name']);
    $Certificados_de_ingresos_Path = $target_dir . basename($Certificados_de_ingresos['name']);

    if (!move_uploaded_file($Cargar_Documento['tmp_name'], $Cargar_Documento_Path)) {
        echo "Error al subir el archivo de Cargar Documento.";
        exit();
    }

    if (!move_uploaded_file($Certificado_Laboral['tmp_name'], $Certificado_Laboral_Path)) {
        echo "Error al subir el archivo de Certificado Laboral.";
        exit();
    }

    if (!move_uploaded_file($Ultimos_Extractos_Bancarios['tmp_name'], $Ultimos_Extractos_Bancarios_Path)) {
        echo "Error al subir el archivo de Últimos Extractos Bancarios.";
        exit();
    }

    if (!move_uploaded_file($Certificados_de_ingresos['tmp_name'], $Certificados_de_ingresos_Path)) {
        echo "Error al subir el archivo de Certificados de Ingresos.";
        exit();
    }


    try {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO doc_cliente (Nombre_Usuario, Correo_Usuario, Numero_Documento, Cargar_Documento, Certificado_Laboral, Ultimos_Extractos_Bancarios, Certificados_de_ingresos)
                VALUES (:Nombre_Usuario, :Correo_Usuario, :Numero_Documento, :Cargar_Documento, :Certificado_Laboral, :Ultimos_Extractos_Bancarios, :Certificados_de_ingresos)";

        // Preparar la consulta
        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':Nombre_Usuario' => $Nombre_Usuario,
            ':Correo_Usuario' => $Correo_Usuario,
            ':Numero_Documento' => $Numero_Documento,
            ':Cargar_Documento' => $Cargar_Documento_Path,
            ':Certificado_Laboral' => $Certificado_Laboral_Path,
            ':Ultimos_Extractos_Bancarios' => $Ultimos_Extractos_Bancarios_Path,
            ':Certificados_de_ingresos' => $Certificados_de_ingresos_Path
        ]);

        echo '<script>
        alert("Su carga de documentos ha sido enviada correctamente.");
        window.location.href = "../Perfilusuario.html";
        </script>';

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
