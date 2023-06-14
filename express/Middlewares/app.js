const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const PUERTO = 3000

const app = express();
app.use(express.urlencoded({ extended: true }));//obtener los cuerpos de la solicitud cuando es un metodo post

app.use(cookieParser()) //cookie
app.use(session({
    secret: 'secreta'
}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
});

app.post('/formulario', (req, res) => {
    req.session.user = req.body.name;
    res.send(`<h1>Inicio de sesion exitoso</h1>`);
})

app.get('/perfil', (req, res) => {
    if (req.session.user) {
        res.send('Perfil del usuario: ' + req.session.user);
    } else {
        res.send('No se ha iniciado sesión');
    }
});

app.listen(PUERTO, () => {
    console.log(`El servidor está corriendo en http://localhost:${PUERTO}`)
})