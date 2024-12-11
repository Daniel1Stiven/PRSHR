const API_URL = 'http://localhost:5000/api/inmuebles'; // Asegúrate de que esta URL sea correcta

// Función para obtener los inmuebles
export const fetchInmuebles = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los inmuebles');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Función para crear un inmueble con imagen
export const createInmueble = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData, // Enviamos el FormData que contiene los datos y la imagen
    });

    if (!response.ok) {
      throw new Error('Error al crear el inmueble');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Error al crear inmueble' };
  }
};

// Función para eliminar un inmueble
export const deleteInmueble = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el inmueble');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Error al eliminar inmueble' };
  }
};
