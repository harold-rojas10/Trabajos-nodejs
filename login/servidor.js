// Importar Express y otros módulos necesarios
const express = require('express');
const cookieParser = require('cookie-parser');

const PUERTO = 3000
const app = express();

// Configurar middleware de cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));//cuerpo de la solicitud

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/login', (req, res) => {
    const nombre = req.body.username
    const contrasenia = req.body.password
    if (nombre === 'desarrollador' && contrasenia === 'backend1234') {
        res.cookie('session', 'exitoso')
        res.redirect('/administracion')
    } else {
        res.send('credenciales incorrectas')
    }
})

app.get('/administracion', (req, res) => {
    if (req.cookies.session === 'exitoso') {
        res.send('Bienvenido al panel de adminitración')
    } else {
        res.send('Debes iniciar sesión para acceder')
    }
})

app.use((error, req, res, next) => {
    res.status(500).send('Ha ocurrido un error interno en el servidor.');
});
app.get('*',(req, res) => {
    //Envio con estado
    res.status(404).sendFile(__dirname + '/404.html')
})


// Iniciar el servidor
app.listen(3000, () => {
    console.log(`El servidor está corriendo en http://localhost:${PUERTO}`)
});