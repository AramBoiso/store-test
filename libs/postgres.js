const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'devtest',
    database: 'zeus_api_development'
  });

  await client.connect(function (err){
    if(err)
        console.log('ERROR -> ',err);
    else
        console.log("Connected!");
  });

  return client;
}

module.exports = getConnection;