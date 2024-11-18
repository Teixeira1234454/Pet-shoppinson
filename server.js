const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'petshop'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clientes.html'));
});

app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/clientes', (req, res) => {
    const { nome, telefone, endereco } = req.body;
    db.query('INSERT INTO clientes (nome, telefone, endereco) VALUES (?, ?, ?)', [nome, telefone, endereco], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nome, telefone, endereco });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
