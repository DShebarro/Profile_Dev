const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app,
  use(
    cors({
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    })
  );

// Conexão com PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("erro", (err) =>
  console.error("Erro na conexão com Banco de Dados:", err)
);

// ROTAS

// health check - 1°

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend Rodando..." });
});

// Salva a mensagem - 2°

app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    //Validação
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Inserir no banco
    const result = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at",
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: "Mensagem salva com sucesso!",
      data: result.rows,
    });
  } catch (error) {
    console.error("Erro ao salvar mensagem", error);
    res.status(500).json({ error: "Erro aos salvar mensagem" });
  }
});

// 3. Listar todas as mensagens (Para a minha visualização)
app.get('/api/message', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC' );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        res.status(500).json({ error: 'Erro ao salvar mensagem' });
    }
});

// 4. Deletar mensagem
app.get('/api/messages:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM message WHERE id = $1', [id]);
        res.json({ success: true, message: 'Mensagem deletada' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar' });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});