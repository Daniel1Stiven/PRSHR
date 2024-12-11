import React from 'react';
import { Link } from 'react-router-dom';

const PerfilUsuario = () => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url('./img/diseno-de-casas-modernas-1_0.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#1a237e',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          backgroundColor: '#1a237e',
          padding: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="./img/sh_blanco-removebg-preview.png"
          alt="Logo Inmobiliaria"
          style={{
            height: '110px',
            margin: '10px',
            padding: '100',
          }}
        />
        <ul
          className="menu"
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: '50px',
            padding: 0,
          }}
        >
          <li style={{ marginLeft: '20px' }}>
            <Link
              to="/usuarioregistrado"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2em',
                padding: '10px 15px',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
              }}
            >
              Volver
            </Link>
          </li>
        </ul>
      </header>

      <div
        className="content"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '50px',
          color: '#333',
        }}
      >
        <div
          className="contenedores"
          style={{
            display: 'grid',
            gap: '20px',
            width: '100%',
          }}
        >
          <div
            className="contenedor"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(101, 110, 101, 0.856)',
              textAlign: 'center',
              fontSize: '1.2em',
              cursor: 'pointer',
              color: '#7a7777',
            }}
          >
            <Link
              to="/misdatos"
              style={{
                textDecoration: 'none',
                color: 'rgb(33, 41, 255)',
              }}
            >
              Mis Datos
            </Link>
          </div>

          <div
            className="contenedor"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(101, 110, 101, 0.856)',
              textAlign: 'center',
              fontSize: '1.2em',
              cursor: 'pointer',
              color: '#7a7777',
            }}
          >
            <Link
              to="/CargarDocumentos"
              style={{
                textDecoration: 'none',
                color: 'rgb(33, 41, 255)',
              }}
            >
              Cargar Documentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
