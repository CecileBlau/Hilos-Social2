import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import axios from 'axios'
// import { getPosts } from '../../NodeJs/module/db';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            allPostsProfile: [],
            loginToSeePosts: '',
            deletePost: ''


        }

    }

    componentDidMount() {
        this.getPosts();
    

    }
    async getPosts() {
        const { user_email, name } = this.props
        const { allPostsProfile } = this.state
        try {
            const response = await axios.post('http://localhost:5050/profile', {
                user_email,

            })
            if (response.data.message == 'Login to see your posts') {
                this.setState({ loginToSeePosts: 'Login to see your posts' })
                this.setState({ allPostsProfile: [] })
            } else {
                //console.log(response.data)
                if (user_email === null) {
                    this.setState({ loginToSeePosts: 'Login to see your posts' })
                    this.setState({ allPostsProfile: [] })
                } else {
                    this.setState({ loginToSeePosts: '' })
                    this.setState({ allPostsProfile: response.data })
                }


            }


        } catch (error) {
            console.log(error)
        }
    }




    async deletePost(id) {

        const { user_email } = this.props
        try {

            const response = await axios.post(`http://localhost:5050/delete`, {
                id,

            })
            console.log(response.data)
            // this.setState({allPostsProfile:response.data})
            this.getPosts();

        } catch (error) {
            console.log(error)
        }

    }




    render() {
        console.log('qoejfqejf', this.props.user_email)
        console.log(this.state.deletePost)
        const Input = styled('input')({
            display: 'none',
        })
        return (
            <>
                <h1>My Profile</h1>

                <h2>{this.props.name} {this.props.lastname}</h2>

                <div style={{ border: "1px solid black", height: '200px', width: '200px' }}> <img src= {`https://robohash.org/${this.props.user_email}?set=set1&size=200x200`} style={{ height: '200px', width: '200px' }}></img></div>

                <h3>Select your picture</h3>
                <div><Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <IconButton color="primary" aria-label="upload picture" component="span">

                        </IconButton>
                    </label>
                </Stack></div>
                <button>Select pic from the Internet</button>
                <h3>Read your previous posts:</h3>
                {this.state.loginToSeePosts}

                <div>
                    {
                        this.state.allPostsProfile.map((item, i) => {
                            return <div><p>{item.tweet} <button onClick={() => this.deletePost(item.tweet_id)} value={item.tweet_id}>Delete</button></p></div>
                        })
                    }
                </div>

            </>
        );
    }
}



export default Profile;