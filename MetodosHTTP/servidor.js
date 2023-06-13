const express = require('express')

const app = express();
const PUERTO = 3000;

app.use(express.urlencoded({ extended: true }));//obtiene los datos del formulario en este caso

app.get('/',(req, res) => {
    //Envio con estado
    res.status(200).sendFile(__dirname + '/index.html')
})

app.post('/login',(req, res) => {
    //recolectar datos del body
    const nombre = req.body.username
    const apellido = req.body.descripcion
    const pass  = req.body.password
    res.status(200).send(`<h1>Bienvenido ${nombre} ${apellido}</h1> <h2> su contrasena es ${pass}</h2>`)
})
//Manejo error 500
app.get('*',(req, res) => {
    //Envio con estado
    res.status(404).sendFile(__dirname + '/404.html')
})

app.use((error, req, res, next) => {
    res.status(500).send('Ha ocurrido un error interno en el servidor.');
});

app.listen(PUERTO,()=>{
    console.log(`El servidor está corriendo en http://localhost:${PUERTO}`)
})