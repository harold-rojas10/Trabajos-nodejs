const express = require('express')

const app = express();
const PUERTO = 3000;

/*RUTA CON SOLO UN MENSAJE
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la pagina de inicio!')
})
app.get('/contacto',(req, res) => {
    res.send('Esta es la pagina de contacto')
})
app.get('/registro',(req, res) => {
    res.send('Esta es la pagina de registro')
})
app.get('/pqr',(req, res) => {
    res.send('Esta es la pagina de pqr')
})
app.get('/ciencia-tecnologia',(req, res) => {
    res.send('Esta es la pagina de tecnologia')
})
app.get('*',(req, res) => {
    res.send('Pagina no encontrada')
})*/

//RUTA HACIA UN HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/contacto',(req, res) => {
    res.sendFile(__dirname + '/contacto.html')
})
app.get('/registro',(req, res) => {
    res.sendFile(__dirname + '/registro.html')
})
app.get('/pqr',(req, res) => {
    res.sendFile(__dirname + '/pqr.html')
})
app.get('/ciencia-tecnologia',(req, res) => {
    res.sendFile(__dirname + '/ciencia.html')
})
app.get('/servidor',(req, res) => {
    res.sendFile('/Users/haroldrojas/Documents/VSCODE/Trabajos-nodejs/8-Servidor/index.html')
})
//Manejo error 500
app.use((error, req, res, next) => {
    res.status(500).send('Ha ocurrido un error interno en el servidor.');
});
app.get('*',(req, res) => {
    //Envio con estado
    res.status(404).sendFile(__dirname + '/404.html')
})

app.listen(PUERTO,()=>{
    console.log(`El servidor está corriendo en http://localhost:${PUERTO}`)
})