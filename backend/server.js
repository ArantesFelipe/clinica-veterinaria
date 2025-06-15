// backend/// backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());
// Conexão com o banco de dados
const db = new sqlite3.Database('./database/clinica.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Conectado ao banco de dados SQLite.');
});

// Cria as tabelas se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS animais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    especie TEXT,
    raca TEXT,
    idade INTEGER,
    dono TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS servicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    data TEXT,
    observacoes TEXT,
    animal_id INTEGER,
    FOREIGN KEY (animal_id) REFERENCES animais(id)
  )`);
});

// Rotas

// Cadastro de animal
app.post('/animais', (req, res) => {
  const { nome, especie, raca, idade, dono } = req.body;
  const query = `INSERT INTO animais (nome, especie, raca, idade, dono) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [nome, especie, raca, idade, dono], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

// Registro de serviço
app.post('/servicos', (req, res) => {
  const { tipo, data, observacoes, animal_id } = req.body;
  const query = `INSERT INTO servicos (tipo, data, observacoes, animal_id) VALUES (?, ?, ?, ?)`;
  db.run(query, [tipo, data, observacoes, animal_id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

// Consulta histórico por animal
app.get('/animais/:id/servicos', (req, res) => {
  const animalId = req.params.id;
  const query = `SELECT * FROM servicos WHERE animal_id = ?`;
  db.all(query, [animalId], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});

// Listar todos os animais (para exibir em formulários, por ex.)
app.get('/animais', (req, res) => {
  db.all('SELECT * FROM animais', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


