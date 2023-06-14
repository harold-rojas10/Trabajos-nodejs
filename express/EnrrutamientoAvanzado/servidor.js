const express = require('express')
const {infoCursos} = require('./cursos.js')//importacion con variable de deconstruccion
const app = express();
const PUERTO = 3000;

// Definir la plantilla HTML para la tabla
function tablaHtml(data) {
    let htmlTable = '<table border=1>';
    htmlTable += '<tr><th>Titulo</th><th>Descripción</th><th>Nivel</th></tr>';

    data.forEach((item) => {
        htmlTable += `<tr><td>${item.titulo}</td><td>${item.descripcion}</td><td>${item.nivel}</td></tr>`;
    });

    htmlTable += '</table>';
    return htmlTable
}

app.use(express.static('public'));//uso de archivos estaticos

//Enrrutamiento
app.get('/',(req, res) => {
    //Envio con estado
    res.status(200).sendFile(__dirname + '/index.html')
})

//cursos backend
app.get('/cursos/programacion-web-backend',(req, res) => {
    let cursosBackend = infoCursos.programacionWebBackend
    if (req.query.ordenar === 'nivel') //Pregunta por lo que recibe en la URL
    {
        cursosBackend = cursosBackend.sort((a, b) => (b.nivel > a.nivel) ? 1 : (b.nivel < a.nivel) ? -1 : 0)
        res.status(200).send(tablaHtml(cursosBackend))
    } else if (req.query.ordenar === 'id') {
        cursosBackend = cursosBackend.sort((a, b) => a.id - b.id)
        res.status(200).send(tablaHtml(cursosBackend))
    } else {
        res.status(200).send(tablaHtml(cursosBackend))
    }
})
//cursos frontend
app.get('/cursos/programacion-web-frontend',(req, res) => {
    let cursosFrontend = infoCursos.programacionWebFrontend
    if (req.query.ordenar === 'nivel') //Pregunta por lo que recibe en la URL
    {
        cursosFrontend = cursosFrontend.sort((a, b) => (b.nivel < a.nivel) ? 1 : (b.nivel > a.nivel) ? -1 : 0)
        res.status(200).send(tablaHtml(cursosFrontend))
    } else if (req.query.ordenar === 'id') {
        cursosFrontend = cursosFrontend.sort((a, b) => a.id - b.id)
        res.status(200).send(tablaHtml(cursosFrontend))
    } else {
        res.status(200).send(tablaHtml(cursosFrontend))
    }
})
app.get('/cursos', (req, res) => {
    let datos = infoCursos.programacionWebBackend.concat(infoCursos.programacionWebFrontend)//concat: union de arreglos
    res.send(tablaHtml(datos))
})
app.get('/cursos/programacion-web-backend/:titulo',(req, res) => {
    const titulo = req.params.titulo
    const cursosFiltrados = infoCursos.programacionWebBackend.filter(cursos => cursos.titulo ===titulo)
    if(cursosFiltrados.length === 0){
        res.status(404).send(`no se encontraron los cursos de ${titulo}`)
    }  
    res.send(tablaHtml(cursosFiltrados))
})

app.get('/cursos/programacion-web-frontend/:titulo',(req, res) => {
    const titulo = req.params.titulo
    const cursosFiltrados = infoCursos.programacionWebFrontend.filter(cursos => cursos.titulo ===titulo)
    if(cursosFiltrados.length === 0){
        res.status(404).send(`no se encontraron los cursos de ${titulo}`)
    }  
    res.send(tablaHtml(cursosFiltrados))
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