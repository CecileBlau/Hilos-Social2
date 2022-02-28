import './App.css';
// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import axios from 'axios'
import { Route, Link, Routes } from "react-router-dom";
import OtherFriendsPosts from './components/OtherFriendsPosts'
import { useNavigate } from 'react-router-dom'
import { Auth } from './auth/Auth'
import { ToastContainer } from 'react-toastify';

function App() {
  const [post, setPost] = useState('')
  const [text, setText] = useState('')
  const [user_email, setUser_email] = useState(null)
  const [needToLoginMessage, setNeedToLoginMessage] = useState('')
  const [allPosts, setAllPosts] = useState('')
  const [name, setName] = useState(null)
  const [lastname, setLastname] = useState(null)
  let navigate = useNavigate()


  const handleChange = (e) => {
    setPost(e.target.value)

  }

  const setUserEmail = (email, name, lastname) => {
    setUser_email(email)
    setName(name)
    setLastname(lastname)
    console.log('try name', name)

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
        navigate('/profile')
        console.log(response.data[0])
        setNeedToLoginMessage('')
        setText(response.data[0].tweet)
        setAllPosts(response.data[0])

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
      <div >
        {
          user_email ?
            <ul className='navList' >
              <li style={{ listStyleType: "none" }}>
                <Link to="/">Home</Link>
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
        }

        <Routes>
          <Route path="/" element={<Home handleClick={handleClick} handleChange={handleChange} text={text} post={post} user_email={user_email} needToLoginMessage={needToLoginMessage} text={text} />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile text={text} user_email={user_email} name={name} lastname={lastname} />} />
          <Route path="/profileOther/:useremail" element={<OtherFriendsPosts user_email={user_email} />} />
        </Routes>

      </div>
    </>
  );


}



export default App;
