

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'wkzepifqwvjbyg',
    password: 'f50e96d1227e92c1ef1e4910c9d27de5020598a16aa07130451a78104cf572a7',
    host: 'ec2-34-197-141-7.compute-1.amazonaws.com',
    database: 'dagu9nlr0kl9el',
    port: 5432,
    ssl: { rejectUnauthorized: false }

});

//const sql = `
//    CREATE TABLE IF NOT EXISTS chamados
//    (
//        ID serial primary key,
//        Chamado int,
//        Descricao varchar(300),
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
