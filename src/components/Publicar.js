import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Publicar = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    descripcion: '',
    localidad: '',
    direccion: '',
    numCont: '',
    precio: '',
    fechaPubli: '',
    estado_id_estado: '',
    tipo_idtipo: '',
    transaccion_idtransaccion: '',
    imagen: null,
  });

  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0],
    });
  };

  const validarFormulario = () => {
    const { Nombre, descripcion, localidad, direccion, numCont, precio, fechaPubli, estado_id_estado, tipo_idtipo, transaccion_idtransaccion, imagen } = formData;
    if (!Nombre || !descripcion || !localidad || !direccion || !numCont || !precio || !fechaPubli || !estado_id_estado || !tipo_idtipo || !transaccion_idtransaccion || !imagen) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost/API/Publicar.php', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        await Swal.fire('Publicación exitosa', 'El inmueble se ha publicado correctamente.', 'success');
        navigate('/perfil');
      } else {
        Swal.fire('Error', response.data.error || 'Error desconocido.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema con el registro.', 'error');
      console.error('Error al registrar:', error);
    }
  };

  useEffect(() => {
    fetch('http://localhost/API/Variantes.php')
      .then((response) => {
        console.log('Respuesta de Variantes:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log('Texto recibido de Variantes:', text);
        try {
          const data = JSON.parse(text);
          console.log('Datos de transacciones recibidos:', data);
          setTransacciones(data);
        } catch (error) {
          console.error('Error al parsear JSON:', error);
          throw new Error('Received data is not valid JSON');
        }
      })
      .catch((error) => {
        console.error('Error al cargar las transacciones de los inmuebles:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost/API/tipos.php')
      .then((response) => {
        console.log('Respuesta de Tipos:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log('Texto recibido de Tipos:', text);
        try {
          const data = JSON.parse(text);
          console.log('Datos de tipos recibidos:', data);
          setTipos(data);
        } catch (error) {
          console.error('Error al parsear JSON:', error);
          throw new Error('Received data is not valid JSON');
        }
      })
      .catch((error) => {
        console.error('Error al cargar tipos de inmuebles:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost/API/estados.php')
      .then((response) => {
        console.log('Respuesta de Estados:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log('Texto recibido de Estados:', text);
        try {
          const data = JSON.parse(text);
          console.log('Datos de estados recibidos:', data);
          setEstados(data);
        } catch (error) {
          console.error('Error al parsear JSON:', error);
          throw new Error('Received data is not valid JSON');
        }
      })
      .catch((error) => {
        console.error('Error al cargar los estados de los inmuebles:', error);
      });
  }, []);
  return (
    <div>
      {/* Header */}
      <header className="header">
        <img src="/sh_blanco-removebg-preview.png" alt="Logo" className="logo" />
        <h1 className="title">Publicar Inmueble</h1>
        <Link to="/Perfil" className="button">Volver</Link>
      </header>

      {/* Formulario de Publicación */}
      <div className="containerpub">
        <div className="form-container">
          <h2 className="title is-4">Añadir Inmueble</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Nombre">Nombre del Inmueble:</label>
              <input
                type="text"
                id="Nombre"
                name="Nombre"
                className="input"
                value={formData.Nombre}
                onChange={handleChange}
                placeholder="Ingrese el Nombre del Inmueble"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagen">Imagen del Inmueble:</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                className="input"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción del Inmueble:</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                className="input"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción del inmueble"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="localidad">Localidad:</label>
              <input
                type="text"
                id="localidad"
                name="localidad"
                className="input"
                value={formData.localidad}
                onChange={handleChange}
                placeholder="Ingrese la localidad donde está ubicado el inmueble"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="input"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección del inmueble"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="numCont">Número de Contacto:</label>
              <input
                type="text"
                id="numCont"
                name="numCont"
                className="input"
                value={formData.numCont}
                onChange={handleChange}
                placeholder="Número de contacto"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio del Inmueble:</label>
              <input
                type="number"
                id="precio"
                name="precio"
                className="input"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ingrese el precio del inmueble"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaPubli">Fecha de Publicación:</label>
              <input
                type="date"
                id="fechaPubli"
                name="fechaPubli"
                className="input"
                value={formData.fechaPubli}
                onChange={handleChange}
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado_id_estado">Estado:</label>
              <div className="select">
                <select
                  id="estado_id_estado"
                  name="estado_id_estado"
                  value={formData.estado_id_estado}
                  onChange={handleChange}
                  
                >
                  <option value="">Seleccione un estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.id_estado}>
                      {estado.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tipo_idtipo">Tipo:</label>
              <div className="select">
                <select
                  id="tipo_idtipo"
                  name="tipo_idtipo"
                  value={formData.tipo_idtipo}
                  onChange={handleChange}
                  
                >
                  <option value="">Seleccione un tipo</option>
                  {tipos.map((tipo) => (
                    <option key={tipo.idtipo} value={tipo.idtipo}>
                      {tipo.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="transaccion_idtransaccion">Transacción:</label>
              <div className="select">
                <select
                  id="transaccion_idtransaccion"
                  name="transaccion_idtransaccion"
                  value={formData.transaccion_idtransaccion}
                  onChange={handleChange}
                  
                >
                  <option value="">Seleccione una transacción</option>
                  {transacciones.map((transaccion) => (
                    <option key={transaccion.idtransaccion} value={transaccion.idtransaccion}>
                      {transaccion.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="button is-primary">
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <img src="/sh_blanco-removebg-preview.png" alt="Logo2" className="logo2" />
        <p>&copy; 2024 Inmobiliaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Publicar;