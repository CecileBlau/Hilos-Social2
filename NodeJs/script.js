const exp = require('express')
const app = exp()
const axios = require('axios')
const cors = require('cors')
app.use(cors())
app.use(exp.json())
const DB = require('./module/db')
const bcrypt = require('bcrypt')




// receving the email and password from the user and sendint it to the database
app.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    let insert = await DB.insertUser(req.body.email, hashPassword, req.body.name, req.body.lastname, req.body.caregiver)
    res.json({ message: 'The registration was succesfull, please log in now' })
  } catch (error) {
    res.json({ message: 'Oops something went wrong, please try again' })
  }
})

app.post('/login', async (req, res) => {
  //req.body is what the you sent from the front end in the login handleClick
  console.log('req.body', req.body)
  try {
    let user = await DB.getUser(req.body.email);
    if (user.length == 0) {
      res.json({ message: '*Wrong email' })
    } else {
      //check the password if it is correct
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (match) {
        res.json({ message: 'OK', email: req.body.email, name: user[0].name, lastname: user[0].lastname, caregiver:user[0].caregiver })
      } else {
        res.json({ message: '*Wrong password' })
      }
    }

  }
  catch (e) {
    console.log(e)
  }


})

//sending post to the data base
app.post('/addTweet', async (req, res) => {
  try {
    if (req.body.user_email.length == 0) {
      res.json({ message: 'You need to login first' })
    } else {

      console.log('prueba post post post', req.body.post, 'fin')
      let post = await DB.insertPost(req.body.user_email, req.body.post)
      res.json(post)
      console.log(post)


    }

  } catch (error) {
    res.json({ error: error })
  }

})


//get the posts
app.post('/profile', async (req, res) => {
  //console.log('try tweetSSSSSSSSSSSS', req.body)
  try {

    if (req.body.user_email.length == 0) {
      res.json({ message: 'Login to see your posts' })
    } else {
      let getPost = await DB.getPosts(req.body.user_email)
      console.log('OOOOOO', req.body, getPost, 'PPPPPP', typeof (req.body.tweet_id))
      res.json(getPost)


    }

  }

  catch (error) {
    console.log(error)
  }


})

// app.post('/profileupdate', async (req,res)=>{
//     if(req.body.tweet_id){
//       let deletePost = await DB.deletePost(req.body.tweet_id)
//       res.json(deletePost)
//     } 
// })



app.post('/delete', async (req, res) => {
  console.log(req.body.id)
  let deletePost = await DB.deletePost(req.body.id)
  console.log(deletePost)
  res.json(deletePost)
})




//get other users to be friends with that displays at Home
app.post('/home', async (req, res) => {
  try {
    let otherUsers = await DB.getOtherUsers(req.body.user_email)
    //let displayFollowedFriends = await DB.displayFollowedFriends(req.body.user_email)
    //console.log('AAAAAAAAAAAAAAAAAA', otherUsers)
    res.json(otherUsers)
  } catch (error) {
    console.log(error)
  }
})


app.post('/displayFollow', async (req, res) => {
  try {

    let displayFollowedFriends = await DB.displayFollowedFriends(req.body.user_email)
    console.log('AAAAAAAAAAAAAAAAAA', req.body.user_email, displayFollowedFriends)
    res.json(displayFollowedFriends)
  } catch (error) {
    console.log(error)
  }
})




//insert email_user and user_to_follow into new table called friends
app.post('/otherfriends', async (req, res) => {
  try {
    //console.log('JEJEJEJEJ', req.body.emailOther )
    let otherUsersFriends = await DB.insertOtherUsers(req.body.emailOther, req.body.user_email)
    res.json({ message: otherUsersFriends })
  } catch (error) {
    console.log(error)
  }
})


// watch other friends profile
app.post(`/emailOther`, async (req, res) => {
  try {
    let watchOtherProfile = await DB.returnFriend(req.body.emailOther)
    res.json({ message: watchOtherProfile })
  } catch (error) {
    console.log(error)
  }
})



//go to friends' profile link
app.get(`/profileOther/:useremail`, async (req, res) => {
  try {
    let friend = await DB.returnFriend(req.params.useremail)
    res.send(friend)
  } catch (error) {
    console.log(error)
  }

})



app.get(`/profileName/:useremail`, async (req, res) => {
  try {
    let friend = await DB.returnName(req.params.useremail)
    res.send(friend)
  } catch (error) {
    console.log(error)
  }

})

app.get(`/profileOtherFeelings/:useremail`, async (req, res) => {
  try {
    let feelings = await DB.showSharedFeelings(req.params.useremail)
    console.log('SCRIPT 182', feelings)
    res.send(feelings)
  } catch (error) {
    console.log(error)
  }

})



app.post('/deleteFollow', async (req, res) => {
  console.log(req.body)
  let deleteFollow = await DB.deleteFollow(req.body.emailOther)
  console.log('deleteFollow', deleteFollow)
  res.json(deleteFollow)
})


app.post('/howIamFeeling', async (req, res) =>{
  let howIamFeeling =  await DB.howIamFeeling()
  res.json(howIamFeeling)
})


app.post('/sendfeelings', async(req, res)=>{
  let sendfeelings = await DB.sendfeelings(req.body.user_email, req.body.displayEmotionsArr)
  res.json(sendfeelings)
})

app.post('/sameFeelingsAsMe', async (req,res)=>{
  let sameFeelingsAsMe = await DB.showSharedFeelings(req.body.user_email)
  res.json(sameFeelingsAsMe)
})












app.listen(5050)
