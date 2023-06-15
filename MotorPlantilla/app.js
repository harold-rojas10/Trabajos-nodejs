// Importar Express y otros módulos necesarios
const express = require('express');

const PUERTO = 3000
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));//cuerpo de la solicitud


//RUTA
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/login', (req, res) => {
    const nombre = req.body.name
    const email = req.body.email

    res.render('enviado', { nombre,email })//envio datos a la plantilla
})


app.get('/contacto', (req, res) => {
    const data = {
        tituloEncabezado: 'Contacto',
        titulo: 'Información de contacto',
        cuerpo: 'Nuevo usuario registrado'
    }
    res.render('index', { data }) //envio datos a la plantilla
})

// Iniciar el servidor
app.listen(3000, () => {
    console.log(`El servidor está corriendo en http://localhost:${PUERTO}`)
});