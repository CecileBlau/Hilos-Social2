const knex = require('knex')

const db = knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        port:'5432',
        user:'postgres',
        password:'cecile',
        database:'users'
    }
})

const getUser = () =>{
    return db('users')
    .select('email', 'password')
    .orderBy('email')
}

const insertUser = (email, password) =>{
return db('users')
.insert({email, password})
.returning('*')

}

module.exports={
    getUser,
    insertUser
}