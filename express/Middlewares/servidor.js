const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PUERTO = 3000;

const app = express();

app.use(morgan('dev'))//anailisis de solicitudes
app.use(helmet())//protegernos

app.get('/',(req,res)=>{
res.send('¡Pagina de inicio!')
});

app.listen(PUERTO,()=>{
    console.log(`El servidor está corriendo en http://localhost:${PUERTO}`)
})