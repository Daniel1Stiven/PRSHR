import React, { useState, useEffect } from 'react';
import { fetchInmuebles, deleteInmueble } from '../services/inmuebleService';
import './Inmuebles.css';  

const InmueblesList = () => {
    const [inmuebles, setInmuebles] = useState([]);

    useEffect(() => {
        const getInmuebles = async () => {
            const data = await fetchInmuebles(); 
            setInmuebles(data);
        };
        getInmuebles();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este inmueble?')) {
            try {
                const response = await deleteInmueble(id);
                if (response.message === 'Inmueble eliminado con éxito') {
                    setInmuebles((prevInmuebles) => prevInmuebles.filter(inmueble => inmueble.idInmueble !== id));
                }
            } catch (error) {
                console.error('Error al eliminar inmueble:', error);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="title">Mis Publicaciones</h1>
            <div className="columns is-multiline">
                {inmuebles.length > 0 ? (
                    inmuebles.map(inmueble => (
                        <div className="column is-one-third" key={inmueble.idInmueble}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img 
                                            src={inmueble.imagen ? inmueble.imagen : 'path_to_default_image.jpg'} 
                                            alt="Imagen del inmueble" 
                                        />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <p><strong>Nombre:</strong> {inmueble.Nombre}</p>
                                        <p><strong>Descripción:</strong> {inmueble.Descripcion}</p>
                                        <p><strong>Localidad:</strong> {inmueble.localidad}</p>
                                        <p><strong>Dirección:</strong> {inmueble.Direccion}</p>
                                        <p><strong>Datos de Contacto:</strong> {inmueble.NumCont}</p>
                                        <p><strong>Precio:</strong> {inmueble.precio} €</p>
                                        <p><strong>Fecha de Publicación:</strong> {inmueble.FechaPubli}</p>
                                        <p><strong>Transacción:</strong> {inmueble.transaccion_desc}</p>
                                        <p><strong>Estado:</strong> {inmueble.estado_desc}</p>
                                        <p><strong>Inmobiliaria:</strong> {inmueble.inmobiliaria_nombre || 'No disponible'}</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <button className="button is-danger is-small card-footer-item" onClick={() => handleDelete(inmueble.idInmueble)}>Eliminar</button>
                                </footer>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron inmuebles.</p>
                )}
            </div>
        </div>
    );
};

export default InmueblesList;
