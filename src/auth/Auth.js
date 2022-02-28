import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const Auth = (props) => {
  const [redirect, setRedirect] = useState(null);
  let navigate = useNavigate();

  useEffect(async ()=>{
    try {
      let response = await axios.get('http://localhost:5050/token',{
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      console.log('auth response', response);
      setRedirect(1)
    } catch (e) {
      navigate('/login')
    }
  },[])

  return (
    redirect ? props.children : null
  )
}