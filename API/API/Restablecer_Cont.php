<?php
if (isset($_GET['codigo'])) {
    $codigo = $_GET['codigo'];
} else {
    die("Código no proporcionado");
}


require_once(__DIR__ . '/conexion.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $codigo = $_POST['codigo']; 
        $new_password = $_POST['ContrasenaCliente'];
        $confirm_password = $_POST['ContrasenaClienteConfirm']; 

        
        if ($new_password !== $confirm_password) {
            echo '<script>
                alert("Las contraseñas NO coinciden.");
                window.location = "./restablecer_contra.php";
            </script>';
        }

        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

        $sql = "SELECT * FROM password_resets WHERE codigo = :codigo";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':codigo', $codigo);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $email = $result['CorreoElectronico']; // Recuperar el email asociado con el código

            // Actualizar la contraseña del cliente en la base de datos
            $sql = "UPDATE clientes SET ContrasenaCliente = :password WHERE Email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":password", $hashed_password);
            $stmt->bindValue(":email", $email);
            $stmt->execute();

            // Si la actualización fue exitosa, eliminar el código de restablecimiento
            if ($stmt->rowCount() > 0) {
                $sql = "DELETE FROM password_resets WHERE codigo = :codigo";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':codigo', $codigo);
                $stmt->execute();

                // Mensaje de éxito
                echo "<script>
                    alert('Contraseña actualizada correctamente.');
                    window.location.href= '../Iniciar Sesión.html';
                </script>";
            } else {
                echo "<script>
                    alert('Error al actualizar la contraseña. Por favor, intenta de nuevo.');
                    window.location.href = '../PHP/index.php';
                </script>";
            }
        } else {
            echo "<script>
                alert('El enlace de restablecimiento es inválido o ha expirado.');
                window.location = '../ResContraseña.html';
            </script>";
        }

    } catch (PDOException $e) {
        // Manejo de errores
        echo '<script>
            alert("Error: ' . $e->getMessage() . '");
            window.location.reload();
        </script>';
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Contraseña</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .button {
            background-color: #3949ab;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            text-decoration: none;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #283593;
        }

        .login-container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .login-container h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.8em;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 1em;
        }

        .form-group input:focus {
            border-color: #FFB300;
            box-shadow: 0 0 5px rgba(255, 179, 0, 0.5);
            outline: none;
        }

        button {
            background-color: #FFB300;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%;
        }

        button:hover {
            background-color: #e67e22;
        }

        .back-link,
        .restore-password-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            text-decoration: none;
        }

        .back-link {
            color: #dcdde6;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .restore-password-link {
            color: #1a237e;
            margin-top: 15px;
        }

        .restore-password-link:hover {
            text-decoration: underline;
        }

        .register-container {
            margin-top: 20px;
            text-align: center;
        }

        .register-container .register-button {
            background-color: #3949ab;
            padding: 10px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            font-weight: bold;
            margin-top: 10px;
        }

        .register-container .register-button:hover {
            background-color: #283593;
        }

        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .popup h3 {
            margin-bottom: 20px;
            font-size: 1.5em;
            text-align: center;
        }

        .popup button {
            background-color: #FFB300;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%;
            margin-bottom: 10px;
        }

        .popup button:hover {
            background-color: #e67e22;
        }

        .popup-close {
            background-color: #e74c3c;
            color: white;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .popup-close:hover {
            background-color: #c0392b;
        }

        .popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 500;
        }
    </style>
</head>
<body>
    <header>
        <a href="../index.html" class="button">Volver a la página principal</a>
    </header>
    <div class="login-container">
        <h2>Recuperar Contraseña</h2>

        <!-- Formulario de recuperación de contraseña -->
        <form class="login-form" action="" method="post">
            <input type="hidden" name="codigo" value="<?php echo htmlspecialchars($codigo); ?>">
            <fieldset>
                <legend>Cree una nueva contraseña</legend>
                <div class="form-group">
                    <label for="user-password">Nueva Contraseña:</label>
                    <input type="password" id="user-password" name="ContrasenaCliente" required>
                </div>
                <div class="form-group">
                    <label for="user-password-confirm">Verifique su Contraseña:</label>
                    <input type="password" id="user-password-confirm" name="ContrasenaClienteConfirm" required>
                </div>
                <button type="submit">Cambiar Contraseña</button>
            </fieldset>
        </form>
    </div>
</body>
</html>
