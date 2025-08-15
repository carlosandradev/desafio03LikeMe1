const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "likeme",
  allowExitOnIdle: true
})

app.get("/", (req, res) => {
  res.send("ok")
})

app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts")
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: "error" })
  }
})

app.post("/posts", async (req, res) => {
  try {
    let { titulo, img, descripcion } = req.body
    if (!img || img.trim() === "") {
      img = `https://picsum.photos/seed/${Date.now()}/400`
    }
    await pool.query("INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0)", [titulo, img, descripcion])
    res.send("ok")
  } catch (e) {
    res.status(500).json({ error: "error" })
  }
})

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { rowCount } = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id])
    if (!rowCount) return res.status(404).json({ error: "no existe" })
    res.send("ok")
  } catch (e) {
    res.status(500).json({ error: "error" })
  }
})

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { rowCount } = await pool.query("DELETE FROM posts WHERE id = $1", [id])
    if (!rowCount) return res.status(404).json({ error: "no existe" })
    res.send("ok")
  } catch (e) {
    res.status(500).json({ error: "error" })
  }
})

app.listen(3000, () => {})