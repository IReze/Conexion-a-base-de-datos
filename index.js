const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// Configuración de la base de datos
const database = "cafeData";
const user = "root"
const host = "localhost"
const password = ""

const db = mysql.createConnection({
    host,
    user,
    password,
    database,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

const PORT = process.env.PORT || 60000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send({ status: 200 });
});


app.post('/producto', (req, res) => {
    const nombre_producto = req.body.nombre_producto;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const id_categoria = req.body.id_categoria;  
    const query = INSERT INTO producto (nombre_producto, descripcion, precio, stock, id_categoria) VALUES (?, ?, ?, ?, ?);

    db.query(query, [nombre_producto, descripcion, precio, stock, id_categoria], (err, result) => {
        if (err) {
            console.error('Error al insertar el producto:', err);
            res.status(400).send({ status: 400, message: 'Error al insertar el producto' });
            return;
        }
        res.status(200).send({ status: 200, message: 'Producto insertado con éxito', id: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(Listening on port ${PORT});
});