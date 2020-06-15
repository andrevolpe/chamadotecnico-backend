

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'igqzaployorpwy',
    password: 'ed7ce222b0d00d486d78b8a4a65a631f7a3bba2d036ecee94e64b5f1a8bff92a',
    host: 'ec2-34-194-198-176.compute-1.amazonaws.com',
    database: 'd4not3pvst7vq8',
    port: 5432,
    ssl: { rejectUnauthorized: false }

});

//const sql = `
//    CREATE TABLE IF NOT EXISTS chamados
//    (
//        ID serial primary key,
//        Chamado int,
 //       Descricao varchar(300),
//        Concluido boolean
//    )
//`;
//pool.query(sql, function(error, result) {
//    if(error)
//        throw error
    
//console.log('Tabela criada com sucesso.')
//})

const sql_insert = `
    INSERT INTO chamados(Chamado,Descricao,Concluido)
    VALUES
    (1234,'Impressora com defeito', true),
    (1235, 'Impressora com defeito', true)
    `;

 pool.query(sql_insert, function(error, result){
    if(error)
        throw error;
console.log(result.rowCount);
});

//SELECT 
//const sql_select = `SELECT * FROM chamados`;

//pool.query(sql_select, function(error,result){
//    if(error)
 //       throw error;
//    console.log(result.rows);
//});
