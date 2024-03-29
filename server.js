const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const PORT = 3000;

app.use(cors());

mongoose.connect('mongodb://localhost/integradora', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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


// Ruta para obtener todos los productos
app.get('/integradora/libros', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
});;
// Ruta para obtener los prestamos
app.get('/integradora/prestamos', async (req, res) => {
    try {
        const prestamos = await Prestamo.find();
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los prestamos' });
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

app.listen(PORT, () => {
  console.log(`La Biblioteca se está ejecutando en: http://localhost:${PORT}`);
});