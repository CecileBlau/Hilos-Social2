import React, { Component } from 'react';
//import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            lastname: '',
            msg: '',
        }


    }

    handleChange = (e) => {
        //console.log([e.target.id],e.target.value)
        this.setState({ [e.target.id]: e.target.value })
    }
    handleClick = async () => {
        const { email, password, name, lastname } = this.state
        if (name.trim().length == 0 || lastname.trim().length == 0) {
            this.setState({ msg: 'name or last name are require' })
            return;
        }
        //sendint it to the server. the server is in between of the front end and the database
        try {
            const response = await axios.post(`http://localhost:5050/register`, {
                email,
                password,
                name,
                lastname
            })
            console.log(response.data.message)
            this.setState({ msg: response.data.message })
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            <>

               <h1>Register</h1>

                <>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <TextField id="name" label="Name" variant="outlined" color="secondary" onChange={this.handleChange} />
                        <TextField id="lastname" label="Last name" variant="outlined" color="secondary" onChange={this.handleChange} />
                        <TextField id="email" label="Email" variant="outlined"color="secondary" onChange={this.handleChange} />
                        <TextField id="password" label="Password" variant="outlined" type='password' color="secondary" onChange={this.handleChange} />
                        <Button color="secondary" onClick={this.handleClick}>Register!</Button>
                    </Box>
                    
                    <div>{this.state.msg}</div> 
                </>
            </>

        );
    }
}



export default Register;


