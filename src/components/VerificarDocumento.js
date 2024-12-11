import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VerificarDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    // Aquí es donde obtendremos los documentos desde el servidor
    axios.get('http://localhost/API/documentos.php') // Cambiar la URL según sea necesario
      .then(response => {
        setDocumentos(response.data); // Suponiendo que la respuesta es un array de documentos
      })
      .catch(error => {
        console.error('Error al obtener los documentos', error);
      });
  }, []); 

  return (
    <div>
      <header>
        <img src="./img/sh_blanco-removebg-preview.png" alt="Logo Inmobiliaria" />
        <div className="menu-bar">
          <Link to="/Perfilinmobiliario" className="button">Volver</Link>
        </div>
      </header>

      <div className="content">
        <div className="form-wrapper">
          <h2>Verificar Documentos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo Electrónico</th>
                <th>Número de Documento</th>
                <th>Documento</th>
                <th>Certificación Laboral</th>
                <th>Últimos Extractos Bancarios</th>
                <th>Certificados de Ingresos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.Nombre_Solicitante_Completo}</td>
                  <td>{doc.Correo_Electronico}</td>
                  <td>{doc.Numero_Doc}</td>
                  <td>
                    <a href={doc.ruta_documento} target="_blank" rel="noopener noreferrer">Ver Documento</a>
                  </td>
                  <td>
                    <a href={doc.ruta_certificacion} target="_blank" rel="noopener noreferrer">Ver Certificación</a>
                  </td>
                  <td>
                    <a href={doc.ruta_extractos} target="_blank" rel="noopener noreferrer">Ver Extractos</a>
                  </td>
                  <td>
                    <a href={doc.ruta_certificados} target="_blank" rel="noopener noreferrer">Ver Certificados</a>
                  </td>
                  <td>


                    <Link to={`/eliminar/${doc.id}`} className="button-delete">Eliminar</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Inmobiliaria</p>
      </footer>
    </div>
  );
};

export default VerificarDocumentos;
