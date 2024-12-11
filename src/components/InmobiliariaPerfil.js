import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const InmobiliariaPerfil = () => {
  const [inmobiliariaData, setInmobiliariaData] = useState({
    idInmobiliaria: '',
    NombreInmobiliaria: '',
    EmailInmobiliaria: '',
    Telefono: '',
    Direccion: ''
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar los datos de la inmobiliaria
  useEffect(() => {
    fetch('/api/perfilInmobiliaria') 
      .then((response) => response.json())
      .then((data) => {
        setInmobiliariaData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      });
  }, []);

  // Manejar la edición del perfil
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInmobiliariaData({
      ...inmobiliariaData,
      [name]: value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/editarInmobiliaria', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inmobiliariaData)
    })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'Tu perfil se ha actualizado correctamente.',
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar tu perfil.',
      });
      console.error('Error al actualizar:', error);
    });
  };

  // Eliminar la cuenta de la inmobiliaria
  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/eliminarInmobiliaria/${inmobiliariaData.idInmobiliaria}`, {  
          method: 'DELETE',
        })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Cuenta eliminada',
              text: 'Tu cuenta ha sido eliminada.',
            });
            navigate('/');  // Redirige al inicio después de eliminar la cuenta
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar tu cuenta.',
            });
          }
        })
        .catch((error) => {
          console.error('Error al eliminar:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar tu cuenta.',
          });
        });
      }
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/diseno-de-casas-modernas-1_0.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
      }}
    >
      {/* Header Component */}
      <header>
        <img src="/sh_blanco-removebg-preview.png" alt="Logo" className="logo" />
        <Link to="/" className="button">Cerrar Sesión</Link>
      </header>

      <div className="content">
        <div className="contenedores">
          <div className="contenedor">
          <Link to="/Inmuebles"> Mis Publicaciones</Link>
          </div>
          <div className="contenedor">
          <Link to="/VerificarDocumentos">Verificar Documentos</Link>
          </div>
          <div className="contenedor">
            <a href="/publicar">Publicar</a>
          </div>
        </div>

        <div className="container">
          <form onSubmit={handleSubmit} className="form-card">
            <h1 className="form-title">INMOBILIARIA {inmobiliariaData.NombreInmobiliaria}</h1>
            <input type="hidden" name="idInmobiliaria" value={inmobiliariaData.idInmobiliaria} />
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NombreInmobiliaria"
                value={inmobiliariaData.NombreInmobiliaria}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Inmobiliaria:</label>
              <input
                type="email"
                name="EmailInmobiliaria"
                value={inmobiliariaData.EmailInmobiliaria}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input
                type="tel"
                name="Telefono"
                value={inmobiliariaData.Telefono}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Dirección:</label>
              <input
                type="text"
                name="Direccion"
                value={inmobiliariaData.Direccion}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-submit">Editar</button>
            <button type="button" onClick={handleDelete} className="btn btn-danger">Eliminar Cuenta</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InmobiliariaPerfil;
