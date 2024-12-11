import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CargarDocumentos = () => {
  const [formData, setFormData] = useState({
    Nombre_Usuario: '',
    Correo_Usuario: '',
    Numero_Documento: '',
    Cargar_Documento: null,
    Certificado_Laboral: null,
    Ultimos_Extractos_Bancarios: null,
    Certificados_de_ingresos: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const validarFormulario = () => {
    const {
      Nombre_Usuario,
      Correo_Usuario,
      Numero_Documento,
      Cargar_Documento,
      Certificado_Laboral,
      Ultimos_Extractos_Bancarios,
      Certificados_de_ingresos,
    } = formData;

    if (
      !Nombre_Usuario ||
      !Correo_Usuario ||
      !Numero_Documento ||
      !Cargar_Documento ||
      !Certificado_Laboral ||
      !Ultimos_Extractos_Bancarios ||
      !Certificados_de_ingresos
    ) {
      Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
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

      const response = await axios.post('http://localhost/API/guardar.php', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Swal.fire('Éxito', 'Los documentos se han cargado correctamente.', 'success');
      } else {
        Swal.fire('Error', response.data.error || 'Error desconocido.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al cargar los documentos.', 'error');
      console.error('Error al cargar documentos:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">
          <img src="../img/sh_blanco-removebg-preview.png" alt="Logo Inmobiliaria" />
        </div>
        <div className="menu-bar">
          <nav>
            <Link to="./perfilusuario.html">Volver</Link>
          </nav>
        </div>
      </header>

      {/* Formulario de Cargar Documentos */}
      <section className="publish-section">
        <h1>Cargar Documentos</h1>
        <form id="subir-form" className="publish-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Nombre_Usuario">Nombre Completo del Solicitante</label>
            <input
              type="text"
              id="Nombre_Usuario"
              name="Nombre_Usuario"
              placeholder="Ingrese su Nombre"
              value={formData.Nombre_Usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Correo_Usuario">Correo Electrónico</label>
            <input
              type="email"
              id="Correo_Usuario"
              name="Correo_Usuario"
              placeholder="Ingrese el Correo Electrónico"
              value={formData.Correo_Usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Numero_Documento">Número de Documento</label>
            <input
              type="text"
              id="Numero_Documento"
              name="Numero_Documento"
              placeholder="Ingrese el número de los documentos"
              value={formData.Numero_Documento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Cargar_Documento">Cargar Documento (PDF)</label>
            <input
              type="file"
              id="Cargar_Documento"
              name="Cargar_Documento"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Certificado_Laboral">Certificación Laboral (PDF)</label>
            <input
              type="file"
              id="Certificado_Laboral"
              name="Certificado_Laboral"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Ultimos_Extractos_Bancarios">Últimos Extractos Bancarios (PDF)</label>
            <input
              type="file"
              id="Ultimos_Extractos_Bancarios"
              name="Ultimos_Extractos_Bancarios"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Certificados_de_ingresos">Certificados de Ingresos (PDF)</label>
            <input
              type="file"
              id="Certificados_de_ingresos"
              name="Certificados_de_ingresos"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <button className="dropbtn" type="submit">
            Subir Documentos
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Inmobiliaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default CargarDocumentos;
