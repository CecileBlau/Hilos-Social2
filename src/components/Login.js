import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mesg, setMesg] = useState('')

    let navigate = useNavigate()

    const handleClick = async () => {

        try {
            const response = await axios.post(`http://localhost:5050/login`, {
                //Sends to the database
                email,
                password
            })
            if (response.data.message != 'OK') {
                setMesg(response.data.message)

            } else {
                console.log(response.data)
                props.setUserEmail(response.data.email, response.data.name, response.data.lastname, response.data.caregiver)
                navigate('/home')

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>

            <h1 className='register-login'>Login</h1>
            <div className='register-login'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="on"
                >
                    <TextField id="email" label="Email" variant="outlined" color="secondary" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="lastname" label="Password" variant="outlined" color="secondary" type="password" onChange={(e) => setPassword(e.target.value)} />

                    <Button color="secondary" onClick={handleClick} >Login</Button>
                    <div className='register-login'>{mesg}</div>
                </Box>

                
            </div>

                   
        </>
    );
}

export default Login;


