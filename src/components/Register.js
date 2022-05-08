import React, { Component } from 'react';
import '../App.css'
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
            caregiver: false
        }


    }

    handleChange = (e) => {
        //Setting each input into whatever the user types in
        this.setState({ [e.target.id]: e.target.value })
    }

    // Once the user clicks submit:
    handleClick = async () => {
        const { email, password, name, lastname, caregiver } = this.state
        if (name.trim().length == 0 || lastname.trim().length == 0) {
            this.setState({ msg: '*Name and last name are required' })
            return;
        } else if (password.length == 0) {
            this.setState({ msg: '*Password must have at least one character' })
            return;
        } else if (email.length == 0) {
            this.setState({ msg: '*Must enter a valid email address' })
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5050/register`, {
                email,
                password,
                name,
                lastname,
                caregiver
            })
            console.log(response.data.message)
            this.setState({ msg: response.data.message })
        } catch (error) {
            console.log(error)
        }

    }
    handleCaregiver = (e)=>{
        this.setState({caregiver:!this.state.caregiver})
    }

    render() {
      
        return (
            <>

                <h1 className='register-login'> Register</h1>

                <div className='register-login'>
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
                        <TextField id="email" label="Email" variant="outlined" color="secondary" onChange={this.handleChange} />
                        <TextField id="password" label="Password" variant="outlined" type='password' color="secondary" onChange={this.handleChange} />
                        <div>
                            <input type="checkbox" onChange={this.handleCaregiver}></input>
                            <label>I am a caregiver</label>
                        </div>
                        <Button color="secondary" onClick={this.handleClick}>Register!</Button>
                        <div className='register-login'>{this.state.msg}</div>
                    </Box>



                </div>
            </>

        );
    }
}



export default Register;


