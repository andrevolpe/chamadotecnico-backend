const express = require('express');

const Pool = require('pg').Pool;

const cors = require('cors');

const pool = new Pool({
    user: 'qcuejfnrsieljl',
    password: '0ffdac5b0725a681f819ce8d0a48cb417fc9d1201c5dad86bc622150623e0396',
    host: 'ec2-3-216-129-140.compute-1.amazonaws.com',
    database: 'dbe0rnodu6vf43',
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
    await pool.query(sql, [chamado, descricao, false]);
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
