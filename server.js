const express = require('express');

const Pool = require('pg').Pool;

const cors = require('cors');

const pool = new Pool({
    user: 'wkzepifqwvjbyg',
    password: 'f50e96d1227e92c1ef1e4910c9d27de5020598a16aa07130451a78104cf572a7',
    host: 'ec2-34-197-141-7.compute-1.amazonaws.com',
    database: 'dagu9nlr0kl9el',
    port: 5432,
    ssl: { rejectUnauthorized: false }

});

const server = express();

server.use(cors());

server.use(express.json());

server.get('/chamado', async function(request, response) {
    const result = await pool.query('SELECT * FROM chamados'); 
    return response.json(result.rows);

})

server.get('/chamado/:id',async function(request, response){
    const id = request.params.id;
    const sql = 'SELECT * FROM chamados WHERE id = $1'
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
} )


server.post('/chamado', async function(request, response) {
    const chamado = request.body.chamado; 
    const descricao = request.body.descricao;
    const sql = `INSERT INTO chamados (chamado, descricao, concluido) VALUES ($1, $2, $3)`;
    await pool.query(sql, [chamado, descricao, true]);
    return response.status(204).send(); 
})

server.delete('/chamado/:id', async function(request,response){
    const id = request.params.id;
    const sql = 'DELETE FROM chamados WHERE id = $1';
    await pool.query(sql, [id]);
    return response.status(204).send();

})

server.put('/chamado/:id', async function(request, response){
    const id = request.params.id;
    const { chamado, descricao, concluido} = request.body;
    const sql = 'UPDATE chamados SET chamado = $1, descricao = $2, concluido = $3';
    await pool.query(sql, [chamado, descricao, concluido, id]);
    return response.status(204).send();
})

server.patch('/chamado/:id/done', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE chamados SET concluido = true WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.patch('/chamado/:id/undone', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE chamados SET concluido = false WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})
server.listen(process.env.PORT || 3000);
