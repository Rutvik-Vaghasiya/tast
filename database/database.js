const { Client } = require('pg');



const client = new Client ({
    host:'127.0.0.1',
    port:5432,
    user:'postgres',
    password:'test*123',
    database:'postgres'
})

// const client = new Client ({
//     host :'127.0.0.1',
//     port :5432,
//     user :"postgres",
//     password :"test*123",
//     database :"postgres"
// });


client.connect((err)=>{
    if(err) throw err;

    console.log("database connecting......")
})


module.exports = { client:client }