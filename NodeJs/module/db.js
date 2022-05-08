const knex = require('knex')
const { max } = require('moment')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'postgres',
        password: 'cecile',
        database: 'users'
    }
})

const getUser = (email) => {
    return db('users')
        .select('email', 'password', 'name', 'lastname', 'caregiver')
        .where({ email: email })
}

const insertUser = (email, password, name, lastname, caregiver) => {
    return db('users')
        .insert({ email, password, name, lastname, caregiver })
        .returning('*')

}

const insertPost = (user_email, tweet) => {
    return db('posts')
        .insert({ tweet, user_email })
        .returning('*')
}


const getPosts = (email) => {
    return db('posts')
        .select('tweet_id', 'user_email', 'tweet', 'created_at').where({ user_email: email })
}

const getOtherUsers = (r) => {
    return db('users')
        .select('*')
        .whereNot({ email: r })
}


const deletePost = (deleteTweet) => {
    return db('posts')
        .del()
        .where({ tweet_id: deleteTweet })
        .returning('*')
}

const insertOtherUsers = (user_to_follow, user_email) => {
    return db('friends')
        .insert({ user_to_follow, user_email })
        .returning('*')
}


const returnFriend = (user_to_follow) => {
    return db('posts')
        .join('users', 'user_email', 'email')
        .select('name', 'lastname', 'tweet', 'tweet_id', 'email', 'created_at')
        .where({ user_email: user_to_follow })


}


const returnName = (user_to_follow) => {
    return db('users')
        .select('name', 'lastname')
        .where({ email: user_to_follow })


}


const displayFollowedFriends = (r) =>{
    return db ('users')
    .distinct('email', 'name', 'lastname', 'user_to_follow')
    .join('friends', 'email', 'user_email')
    .whereNot({email: r})
    .andWhere({user_to_follow: r})

}

const deleteFollow = (r, j) => {
    return db('friends')
        .del()
        .where({ user_to_follow: r })
        andWhere({user_email: j })
        .returning('*')
}

//Shows all of the options to check the feelings
const howIamFeeling = ()=>{
    return db('emotion')
    .select ('emotions_id' , 'emotion', db.raw("'0' as emotion_value") )
}


const sendfeelings = (email, feelings) =>{
    return db('feelings')
    .insert({ email, feelings })
    .returning('*')
}

//This functions returns the emotions of the people who shared their feelings and 
//displays it in the OtherFriendsPosts. AYUDA


const showSharedFeelings = (r)=>{
    //este no es
    return db('feelings')
.distinctOn('feelings.email')
// .select('feelings_id', 'feelings', 'feelings.email')
.join('users', 'users.email', '=', 'feelings.email')
.whereNot({'feelings.email':r})


// .orderBy('email', 'created_at', 'desc')



//     SELECT DISTINCT ON (email) *
//     FROM   feelings
//     WHERE not email = 'hello@gmail.com'
//     ORDER  BY email, created_at DESC 

}



module.exports = {
    getUser,
    insertUser,
    insertPost,
    getPosts,
    getOtherUsers,
    deletePost,
    insertOtherUsers,
    returnFriend,
    returnName,
    displayFollowedFriends,
    deleteFollow,
    howIamFeeling,
    sendfeelings,
    showSharedFeelings
}