import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import axios from 'axios'
import { Route, Link, Routes } from "react-router-dom";
import OtherFriendsPosts from './components/OtherFriendsPosts'
import { useNavigate } from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';


function App() {
  const [post, setPost] = useState('')
  const [text, setText] = useState('')
  const [user_email, setUser_email] = useState(null)
  const [needToLoginMessage, setNeedToLoginMessage] = useState('')
  const [allPosts, setAllPosts] = useState('')
  const [name, setName] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [caregiver, setCaregiver] = useState(null)
  const [feelings, setFeelings] = useState([])
  let navigate = useNavigate()
  const [value, setValue] = React.useState('one');

  const handleChangeNav = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (e) => {
    if (e.target.value.length > 1) {
      setPost(e.target.value)
    }


  }

  const setUserEmail = (email, name, lastname, caregiver) => {
    setUser_email(email)
    setName(name)
    setLastname(lastname)
    setCaregiver(caregiver)
    console.log('try caregiver', caregiver)

  }

  const sendFeelingsToHome = ( feelings) =>{
    setFeelings(feelings)
    console.log('feelings', feelings)
  }


  const handleClick = async (e) => {

    try {
      const response = await axios.post('http://localhost:5050/addTweet', {
        user_email,
        post
      })
      console.log(response.data)
      if (response.data.message == 'You need to login first') {
        setNeedToLoginMessage(response.data.message)

      } else {
        if (response.data[0].tweet.length > 0) {
          navigate('/profile')
          console.log(response.data[0])
          setNeedToLoginMessage('')
          setText(response.data[0].tweet)
          setAllPosts(response.data[0])
        }else{
          console.log('test')}


      }
    } catch (error) {

    }


  }

  const handleLogout = () => {
    setUser_email(null)
    navigate('/login')



  }


  console.log('user_email', user_email)
  return (

    <>
      <ResponsiveAppBar user_email={user_email} />

      {/* <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChangeNav}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Home"  component={Link} to="/" />
          <Tab value="two" label="Login" component={Link} to="/login"/>
          <Tab value="three" label="Register" component={Link} to="/register"/>
          <Tab value="four" label="My Profile" component={Link} to="/profile" />
          <Tab value="five" label="Logout"  component={Link} to="/profileOther/:useremail"/>
          <App/>
        </Tabs>
      </Box> */}





      <div >
        {/* {
          user_email ?
            <ul className='navList' >
              <li style={{ listStyleType: "none" }}>
                <Link to="/home">Home</Link>
              </li>
              <li style={{ listStyleType: "none" }}>
                <Link to="/login">Login</Link>
              </li>
              <li style={{ listStyleType: "none" }}>
                <Link to="/register">Register</Link>
              </li>
              <li style={{ listStyleType: "none" }}>
                <Link to="/profile">My Profile</Link>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
            : <ul>
              <li style={{ listStyleType: "none" }}>
                <Link to="/login">Login</Link>
              </li>
              <li style={{ listStyleType: "none" }}>
                <Link to="/register">Register</Link>
              </li>
            </ul>
        } */}
        <div className='logoutButton'>
          <Button onClick={handleLogout} color='secondary' >Logout</Button>
        </div>
        <Routes>
          <Route path="/home" element={<Home handleClick={handleClick} handleChange={handleChange} text={text} post={post} user_email={user_email} needToLoginMessage={needToLoginMessage} text={text} feelings={feelings}/>} />
          <Route path="/" element={<Home handleClick={handleClick} handleChange={handleChange} text={text} post={post} user_email={user_email} needToLoginMessage={needToLoginMessage} text={text} feelings={feelings} />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile text={text} user_email={user_email} name={name} lastname={lastname} caregiver={caregiver} sendFeelingsToHome={sendFeelingsToHome}/>} />
          <Route path="/profileOther/:useremail" element={<OtherFriendsPosts user_email={user_email} />} />
        </Routes>

      </div>
      <BottomNavigation />
    </>
  );


}



export default App;
