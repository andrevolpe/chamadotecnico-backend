

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'gmttykaxjjcadz',
   password: '38f7578d956485d37653bfa0560e47916de9e7b7ccee155e1fb971fe1a0d1d7b',
   host: 'ec2-34-200-72-77.compute-1.amazonaws.com',
   database: 'dbg23a9vo6hig0',
   port: 5432,
    ssl: { rejectUnauthorized: false }

});

//const sql = `
//    CREATE TABLE IF NOT EXISTS chamados
//    (
//        ID serial primary key,
 //       Titulo varchar(200),
//        Data varchar(50),
//        Concluido boolean
//    )
//`;
//pool.query(sql, function(error, result) {
//    if(error)
//        throw error
    
//console.log('Tabela criada com sucesso.')
//})

const sql_insert = `
    INSERT INTO chamados(Titulo,Data,Concluido)
    VALUES
    ('Impressora com defeito', 05-05, true),
    ('Impressora com defeito', 05-05, true)
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