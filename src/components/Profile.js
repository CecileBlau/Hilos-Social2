import React, { Component } from 'react';
import '../App.css'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import moment, { calendarFormat } from 'moment'


// const [allPostsProfile, setAllPostsProfile] = useState([])
// const [loginToSeePosts, setLoginToSeePosts] = useState('')
// const [deletePost, setDeletePost] = useState('')
// const [emotionsArr, setEmotionsArr] = useState([])
// const [displayEmotionsArr, setDisplayEmotionsArr] = useState([])



class Profile extends Component {
    constructor() {
        super();
        this.state = {
            allPostsProfile: [],
            loginToSeePosts: '',
            deletePost: '',
            emotionsArr: [],
            displayEmotionsArr: [],
            myFeelingsStatus: {},
            displaySharedNotification: ''



        }

    }

    componentDidMount() {
        this.getPosts();
        this.howIamFeeling();


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
                this.setState({ loginToSeePosts: '' })
                this.setState({ allPostsProfile: response.data })
                console.log(response.data)
            }


        } catch (error) {
            console.log(error)
        }
    }

    async howIamFeeling() {
        try {
            const response = await axios.post('http://localhost:5050/howIamFeeling')
            this.setState({ emotionsArr: response.data })
            console.log('TTTTTTTT',response.data)
        } catch (error) {

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

    handleClickEmotions = (e) => {

        this.setState({ displayEmotionsArr: [ ...this.state.displayEmotionsArr, e.target.name + ' '] });
            


        // let newArr = [...this.state.displayEmotionsArr, e.target.value + ' ']
        console.log(e.target.value )
        //filtrar if e.target.value es esta incluido en todo lo de arriba, entonces borralo
        //setNames((names) => names.filter((_, i) => i !== names.length - 1))


    }
    // ---------SHARE FEELINGS ----------
    shareMyFeelings = async () => {
        const { user_email } = this.props
        const { displayEmotionsArr } = this.state
        try {
            const response = await axios.post(`http://localhost:5050/sendfeelings`, {
                user_email,
                displayEmotionsArr,
            })
            this.setState({myFeelingsStatus:response.data[0].feelings})
            this.props.sendFeelingsToHome(response.data[0].feelings)
            console.log('gggg')
            this.setState({displaySharedNotification:'Shared!'})
            

        } catch (error) {
            console.log(error)
        }
    }
    //------SHOW NEWEST OR OLDEST POSTS------
    handleNewest = async (e) => {
        if (this.state.allPostsProfile) {
            if (e.target.value == 'newest') {
                this.state.allPostsProfile.sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
                this.setState({ allPostsProfile: [...this.state.allPostsProfile] })
            } else if (e.target.value == 'oldest') {
                this.state.allPostsProfile.sort((a, b) => (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0))
                this.setState({ allPostsProfile: [...this.state.allPostsProfile] })
            }

        }
    }
    handleReset = async (e)=>{
        console.log('test reset')
        this.setState({displayEmotionsArr: []})
    }

    render() {
        const Input = styled('input')({
            display: 'none',
        })
        let sendFeelings = this.state.displayEmotionsArr.length
        console.log(this.state.myFeelingsStatus)
        return (

            <div className='profile'>
                <h1>My Profile</h1>

                <h2>{this.props.name} {this.props.lastname}</h2>
                {this.props.caregiver ?  <h3 style={{color:'brown'}}>Caregiver</h3>: null}

                <div style={{ border: "3px solid black", borderRadius: "100px", height: '200px', width: '200px' }}> <img src={`https://robohash.org/${this.props.user_email}?set=set1`} style={{ height: '200px', width: '200px' }} className={'photo'}></img></div>

                <h3>Select your picture</h3>
                <div><Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" component="span" color="secondary">
                            Upload
                        </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <IconButton color="primary" aria-label="upload picture" component="span">

                        </IconButton>
                    </label>
                </Stack></div>




                {/* --------EMOTIONS-------- */}
                <h2>This is how I am feeling</h2>
                <h3>{this.state.displayEmotionsArr}</h3>
              
                {
                    sendFeelings ?  (<div>
                         <Button color='secondary' onClick={this.shareMyFeelings}>Share my feelings</Button> <Button onClick={this.handleReset}>reset</Button>
                    </div>
                   )  : null
                }

                {this.state.displaySharedNotification.length > 0 ? <h5 style={{color:'green'}}>Shared! Go Home to see who is also feeling the same way as you!</h5> : null}

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.emotionsArr.map((item, i) => {
                        return (
                            <div >
                                <input name={item.emotion} type="checkbox" value={item.emotion_value} onChange={this.handleClickEmotions} ></input>
                                <label >{item.emotion}</label>
                            </div>



                        )



                    })}
                </div>







                    {/* TextBox to update info about caregiver */}
                {this.props.caregiver ?  <div style={{border:'1px solid black'}}><label>Tell everyone about the person you are looking after</label>
                <div>
                        <TextField
                            color="secondary"    
                            id="outlined-multiline-static"
                            label="Type here"
                            multiline
                            rows={8}
                            fullWidth

                        />
                        <Button color="secondary">Update</Button>
                    </div>
                </div>: null}






                {/* --------PREVIOUS POSTS -------- */}
                <h3>Read your previous posts</h3>
                {this.state.loginToSeePosts}
                <div>
                    <select name='orderBy' id='orderBy' onChange={this.handleNewest}>
                        <option value=''>Sort</option>
                        <option value='newest'>Newest</option>
                        <option value='oldest'>Oldest</option>
                    </select>
                </div>

                <div className='divGeneralProfile'>
                    {
                        this.state.allPostsProfile.map((item, i) => {

                            return <div className='divPosts'>
                                <p>
                                    {item.tweet}
                                    <div>
                                        {moment(item.created_at).format("Do MMM YYYY HH:mm")}
                                    </div>

                                    <Button size="small" variant="outlined" color='secondary' onClick={() => this.deletePost(item.tweet_id)} value={item.tweet_id}>
                                        Delete
                                    </Button>
                                    <button>Like</button> <button>Comment</button>

                                </p>

                            </div>
                        })
                    }
                </div>


               

            </div>
        );
    }
}



export default Profile;