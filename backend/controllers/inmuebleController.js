const Inmueble = require('../models/inmueble'); // Asumiendo que tienes un modelo de inmueble

// Función para crear un nuevo inmueble
exports.createInmueble = async (req, res) => {
  const { Nombre, descripcion, localidad, direccion, numCont, precio, fechaPubli, estado_id_estado, tipo_idtipo, transaccion_idtransaccion, imagen } = req.body;

  try {
    const nuevoInmueble = new Inmueble({
      Nombre,
      descripcion,
      localidad,
      direccion,
      numCont,
      precio,
      fechaPubli,
      estado_id_estado,
      tipo_idtipo,
      transaccion_idtransaccion,
      imagen,
    });

    await nuevoInmueble.save();
    res.status(201).json({ message: 'Inmueble creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear inmueble', error });
  }
};

// Función para obtener todos los inmuebles
exports.getInmuebles = async (req, res) => {
  try {
    const inmuebles = await Inmueble.find();
    res.status(200).json(inmuebles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inmuebles', error });
  }
};
