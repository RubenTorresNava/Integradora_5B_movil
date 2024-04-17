const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rubenbebe145rt:contraseña@integradora.gffe3xo.mongodb.net/biblioteca?retryWrites=true&w=majority&appName=Integradora', {
  
});

// Creación del esquema del producto
const libroSchema = new mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    apartado: {
        type: String,
        required: true
    },
    clasificacion: {
        type: String,
        required: true
    }

});

const alumnoSchema = new mongoose.Schema({
    noCtrl: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidoP: {
        type: String,
        required: true
    },
    apellidoM: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    CURP: {
        type: String,
    }
});

const empleadoSchema = new mongoose.Schema({
    noEmpleado: {
        type: Number,
        required: true,
        unique: true
    },
    usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const visitaSchema = new mongoose.Schema({
    noCtrl: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    horaEntrada: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    }
});

const PrestamoSchema = new mongoose.Schema({
    idPrestamo: { type: Number, required: true },
    idLibro: { type: Number, required: true },
    noEmpleado: { type: Number, required: true },
    fechaPrestamo: { type: String, required: true },
    fechaEntrega: { type: String, required: true },
    estado: { type: String, required: true }
});
// Creación del modelo usando el esquema
const Libro = mongoose.model("Libro", libroSchema);
const Alumno = mongoose.model("Alumno", alumnoSchema);
const Prestamo = mongoose.model("Prestamo", PrestamoSchema);
const Empleado = mongoose.model("Empleado", empleadoSchema);
const Visita = mongoose.model("Visita", visitaSchema);

// Ruta para obtener todos los productos
app.get('/integradora/libros', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
});
// Ruta para obtener los prestamos
app.get('/integradora/prestamos', async (req, res) => {
    try {
        const prestamos = await Prestamo.find();
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los prestamos' });
    }
});

//Ruta para obtener los motivos de las visitas del dia
app.get('/integradora/visitas/motivo-visitas', async (req, res) => {
    try {
        const visitas = await Visita.find();
        const motivo = visitas.map(visita => visita.motivo);
        res.status(200).json(motivo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para obtener todos los alumnos
app.get('/integradora/alumnos', async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los alumnos' });
    }
});

//Ruta para obtener los prestamos con fecha de entrega despues de la fecha de entrega
app.get('/integradora/prestamos/prestamos-vencidos', async (req, res) => {
    try {
        const prestamos = await Prestamo.find({ fechaEntrega: { $lt: new Date() } });
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//Ruta para obtener el total de visitas que van del dia
app.get('/integradora/visitas/visitas', async (req, res) => {
    try {
        const visitas = await Visita.find();
        res.status(200).json(visitas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//Ruta para contar los libros
app.get('/integradora/libros/count', async (req, res) => {
    try {
        const resultado = await Libro.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$cantidad" }
                }
            }
        ]);
        if (resultado.length > 0) {
            const total = resultado[0].total;
            res.json({ total });
        } else {
            res.json({ total: 0 });
        }
    } catch (error) {
        console.error("Error al calcular la sumatoria de la cantidad de libros:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

//Ruta para contar los alumnos
app.get('/integradora/alumnos/count', async (req, res) => {
    try {
        const total = await Alumno.countDocuments();
        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ message: 'Error al contar los alumnos' });
    }
});

//ruta para iniciar sesion y uso de token
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
  
    try {
      let empleado = await Empleado.findOne({ usuario });
  
      if (!empleado) {
        return res.status(400).json({ msg: 'Usuario no encontrado' });
      }
  
      const isMatch = await bcrypt.compare(password, empleado.password);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
      }
  
      const payload = {
        empleado: {
          id: empleado.id
        }
      };
  
      jwt.sign(payload, 'secretKey', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Error del servidor');
    }
  });

app.listen(PORT, () => {
    console.log(`La Biblioteca se está ejecutando en: http://localhost:${PORT}`);
});