

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'qcuejfnrsieljl',
    password: '0ffdac5b0725a681f819ce8d0a48cb417fc9d1201c5dad86bc622150623e0396',
    host: 'ec2-3-216-129-140.compute-1.amazonaws.com',
    database: 'dbe0rnodu6vf43',
    port: 5432,
    ssl: { rejectUnauthorized: false }

});

const sql = `
    CREATE TABLE IF NOT EXISTS chamados
    (
        ID serial primary key,
        Chamado varchar(200),
        Descricao varchar(300),
        Concluido boolean
    )
`;
pool.query(sql, function(error, result) {
    if(error)
        throw error
    
console.log('Tabela criada com sucesso.')
})

//const sql_insert = `
 //   INSERT INTO chamados(Chamado,Descricao,Concluido)
//    VALUES
//    (1234,'Impressora com defeito', true),
//    (1235, 'Impressora com defeito', true)
 //   `;

// pool.query(sql_insert, function(error, result){
//    if(error)
//        throw error;
//console.log(result.rowCount);
//});

//SELECT 
//const sql_select = `SELECT * FROM chamados`;

//pool.query(sql_select, function(error,result){
//    if(error)
 //       throw error;
//    console.log(result.rows);
//});
