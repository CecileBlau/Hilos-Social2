import React, { useState,useEffect } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mesg, setMesg] = useState('')
    
    let navigate = useNavigate()
  
  const  handleClick= async ()=>{

             try { 
                 const response = await axios.post(`http://localhost:5050/login`, {
                     //sending to the server what the user is typing 
                    email,
                    password
                 })
                  if(response.data.message!='OK'){
                     setMesg(response.data.message)
                     
                  }else{
                      console.log(response.data)
                      props.setUserEmail(response.data.email, response.data.name, response.data.lastname)
                      navigate('/')

                  }
             } catch (error) {
                 console.log(error)
             }
        
         }
    return (
        <>
              <div>
                 <h1>Login</h1> 
                 <label>Email</label>
                 <input id='email' type="email" onChange={(e)=>setEmail(e.target.value)}></input>
                 <br/>
                 <label>Password</label>
                 <input id='password' type="password" onChange={(e)=>setPassword(e.target.value)}></input>
                 <br/>
                 <button onClick={handleClick}>Login</button>
            
             </div> 
             <div>{mesg}</div>
        </>
    );
}

export default Login;


