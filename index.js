const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  user: 'carl_andrade13',
  password: '', 
  database: 'likeme',
  allowExitOnIdle: true,
  port: 5432 
});

app.get('/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los posts');
  }
});

app.post('/posts', async (req, res) => {
  try {
    const {titulo, url, descripcion} = req.body;

    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const valores = [titulo, url, descripcion, 0];

    await pool.query(consulta, valores);
    res.send("Post agregado con exito");
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al agregar el post');
  }
});

app.listen(3000, () => {
  console.log('Servidor encendido en el puerto 3000');
});