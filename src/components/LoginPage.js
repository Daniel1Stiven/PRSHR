import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const LoginForm = () => {
  const [loginType, setLoginType] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Validación de formulario
  const validateForm = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // Validar si el correo electrónico y la contraseña están vacíos
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Si la validación pasa, podrías enviar el formulario aquí
    Swal.fire({
      icon: 'success',
      title: 'Formulario validado',
      text: 'Los datos son válidos.',
    });
    // Aquí podrías redirigir o enviar el formulario de manera efectiva
  };

  return (
    <div className="login-container">
      <header>
        <Link to="/"><button className="volverindex">Volver a la pagina Principal</button></Link>
      </header>
      <h2>Iniciar sesión</h2>

      <div className="form-group">
        <label htmlFor="login-type">Iniciar sesión como:</label>
        <select id="login-type" value={loginType} onChange={handleLoginTypeChange}>
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="user">Usuario</option>
          <option value="inmobiliaria">Inmobiliaria</option>
        </select>
      </div>

      {loginType === "user" && (
        <form id="user-form" className="login-form" onSubmit={validateForm}>
          <fieldset>
            <legend>Iniciar sesión como Usuario</legend>
            <div className="form-group">
              <label htmlFor="user-email">Correo electrónico:</label>
              <input type="email" id="user-email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="user-password">Contraseña:</label>
              <input type="password" id="user-password" name="password" />
            </div>
            <Link to="/IndexUsu"><button className="buttoninicio">Iniciar Sesión</button></Link>
          </fieldset>
          <a href="./ResContraseña.html" className="restore-password-link">
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      )}

      {/* Formulario para "Inmobiliaria" */}
      {loginType === "inmobiliaria" && (
        <form id="inmobiliaria-form" className="login-form" onSubmit={validateForm}>
          <fieldset>
            <legend>Iniciar sesión como Inmobiliaria</legend>
            <div className="form-group">
              <label htmlFor="inmobiliaria-email">Correo electrónico:</label>
              <input type="email" id="inmobiliaria-email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="inmobiliaria-password">Contraseña:</label>
              <input type="password" id="inmobiliaria-password" name="password" />
            </div>
            <Link to="/perfil"><button className="buttoninicio">Iniciar Sesión</button></Link>
          </fieldset>
          <a href="./ResContraseña.html" className="restore-password-link">
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      )}

      {/* Botón para abrir el popup */}
      <div class="register-container">
        <button class="register-button" onClick={openPopup}>
          Registrarse
        </button>

        {/* Condicional para mostrar el popup */}
        {showPopup && (
          <>
            <div id="popup" className="popup">
              <h3>Registrarse como:</h3>
              <Link to="/registerInm"><button className="dropbtn">Inmobiliaria</button></Link>
              <Link to="/registerCli"><button className="dropbtn">Cliente</button></Link>
              <div className="popup-close" onClick={closePopup}>
                Cerrar
              </div>
            </div>

            {/* Overlay que también cierra el popup al hacer clic */}
            <div
              id="popup-overlay"
              className="popup-overlay"
              onClick={closePopup}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
