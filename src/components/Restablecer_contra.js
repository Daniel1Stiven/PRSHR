import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RecuperacionContraseña = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('./PHP_Contrase/solicitud.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Correo Enviado',
          text: 'Se ha enviado un correo para la recuperación de la contraseña.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el correo.',
        });
        console.error('Error al enviar el correo:', error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: '#e8eaf6',
        fontFamily: 'Arial, sans-serif',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <header
        style={{
          backgroundColor: '#1a237e',
          color: 'white',
          padding: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          textAlign: 'left',
        }}
      >
        <Link
          to="/Iniciar Sesión"
          className="button"
          style={{
            backgroundColor: '#3949ab',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            textDecoration: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Volver
        </Link>
      </header>

      <section
        style={{
          maxWidth: '400px',
          margin: '50px auto',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#1a237e',
          }}
        >
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div
            className="form-group"
            style={{ marginBottom: '15px' }}
          >
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#34495e',
              }}
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FFB300',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Enviar correo de recuperación
          </button>
        </form>
      </section>

      <footer
        style={{
          backgroundColor: '#1a237e',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <p>&copy; 2024 Inmobiliaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default RecuperacionContraseña;

