const express = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'gmttykaxjjcadz',
    password: '38f7578d956485d37653bfa0560e47916de9e7b7ccee155e1fb971fe1a0d1d7b',
    host: 'ec2-34-200-72-77.compute-1.amazonaws.com',
    database: 'dbg23a9vo6hig0',
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
