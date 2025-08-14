const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",         
  password: "tu_password",  
  database: "likeme",
  allowExitOnIdle: true
});

app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0)";
    const values = [titulo, img, descripcion];
    await pool.query(consulta, values);
    res.send("Post agregado con éxito");
  } catch (err) {
    res.status(500).json({ error: "Error al agregar post" });
  }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));