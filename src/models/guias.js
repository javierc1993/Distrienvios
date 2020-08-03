const mongoose = require('mongoose');
const Schema = mongoose.Schema;//propiedad que nos permite definir como van a lucir los datos

const TaskSchema= new Schema({ //aqui van los campos que tendra cada tarea "columnas de las tablas"
    guia: String,
    fecha: Date,
    timestamps: { type: Date, default: Date.now },
    pueblo: String,
    status: {
        type: Boolean,
        default: false
      } 
});
module.exports = mongoose.model('distrienvios2', TaskSchema); 