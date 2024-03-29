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
    /*     idLibro: { type: Number, required: true },
     */    cantidad: {
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

// Creación del modelo usando el esquema
const Libro = mongoose.model("Libro", libroSchema);

// Ruta para obtener todos los productos
app.get('/integradora/libros', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
});;


app.listen(PORT, () => {
  console.log(`La Biblioteca se está ejecutando en: http://localhost:${PORT}`);
});