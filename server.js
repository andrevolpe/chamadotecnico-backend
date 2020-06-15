const express = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'igqzaployorpwy',
    password: 'ed7ce222b0d00d486d78b8a4a65a631f7a3bba2d036ecee94e64b5f1a8bff92a',
    host: 'ec2-34-194-198-176.compute-1.amazonaws.com',
    database: 'd4not3pvst7vq8',
    port: 5432,
    ssl: { rejectUnauthorized: false }

});

const server = express();

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

server.post('/chamado', async function(request,response){

    const titulo = request.body.titulo;
    
    const sql = `INSERT INTO chamados (Titulo,Data,Concluido) VALUES ($1, $2, $3 )`;
    await pool.query(sql, [titulo, false]);
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
    const { titulo, data, concluido} = request.body;
    const sql = 'UPDATE chamados SET titulo = $1, data = $2, concluido = $3';
    await pool.query(sql, [titulo, data, concluido, id]);
    return response.status(204).send();
})
server.listen(process.env.PORT || 3000);
