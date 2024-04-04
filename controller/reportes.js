/* import {libroSchema, prestamoSchema, visitaSchema} from '../server.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';


//funcion de reporte de libros disponibles del campo cantidad

//funcion de reporte de prestamos con la fecha de entrega vencida
export const reportePrestamosVencidos = async (req, res) => {
    try {
        const prestamos = await prestamoSchema.find({fechaEntrega: {$lt: new Date()}});
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//reporte de visitas totales del dia
export const reporteVisitas = async (req, res) => {
    try {
        const visitas = await visitaSchema.find();
        res.status(200).json(visitas);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//reporte del motivo de las visitas
export const reporteMotivoVisitas = async (req, res) => {
    try {
        const visitas = await visitaSchema.find();
        const motivo = visitas.map(visita => visita.motivo);
        res.status(200).json(motivo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// Función para generar un PDF con todos los reportes
const generarReportesPDF = async (librosDisponibles, prestamosVencidos, visitas, motivosVisitas) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('reportes.pdf'));

    // Reporte de libros disponibles
    doc.fontSize(16).text('Reporte de Libros Disponibles', { align: 'center' }).moveDown();
    librosDisponibles.forEach((libro, index) => {
        doc.fontSize(12).text(`${index + 1}. Título: ${libro.titulo}, Cantidad Disponible: ${libro.cantidad}`);
        doc.moveDown();
    });
    doc.addPage(); // Agrega una nueva página para el siguiente reporte

    // Reporte de préstamos vencidos
    doc.fontSize(16).text('Reporte de Préstamos Vencidos', { align: 'center' }).moveDown();
    prestamosVencidos.forEach((prestamo, index) => {
        doc.fontSize(12).text(`${index + 1}. Libro: ${prestamo.libro}, Fecha de Entrega: ${prestamo.fechaEntrega}`);
        doc.moveDown();
    });
    doc.addPage(); // Agrega una nueva página para el siguiente reporte

    // Reporte de visitas totales del día
    doc.fontSize(16).text('Reporte de Visitas Totales del Día', { align: 'center' }).moveDown();
    visitas.forEach((visita, index) => {
        doc.fontSize(12).text(`${index + 1}. Fecha: ${visita.fecha}, Motivo: ${visita.motivo}`);
        doc.moveDown();
    });
    doc.addPage(); // Agrega una nueva página para el siguiente reporte

    // Reporte de motivo de visitas
    doc.fontSize(16).text('Reporte de Motivo de Visitas', { align: 'center' }).moveDown();
    motivosVisitas.forEach((motivo, index) => {
        doc.fontSize(12).text(`${index + 1}. Motivo: ${motivo}`);
        doc.moveDown();
    });

    doc.end();
};

// Llamada a la función para generar el PDF con todos los reportes
generarReportesPDF(libros, prestamos, visitas, motivos); */