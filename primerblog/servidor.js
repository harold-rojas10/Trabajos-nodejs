const express = require('express')

const app = express();
const PUERTO = 3000;

app.use(express.static('public'));//uso de archivos estaticos

app.get('/',(req, res) => {
    //Envio con estado
    res.status(200).sendFile(__dirname + '/index.html')
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