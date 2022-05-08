import axios from 'axios';
import React, { useState, useEffect } from 'react';
import OtherFriendsPosts from './OtherFriendsPosts'
import { Route, Link, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FeelingsLikeMe from './FeelingsLikeMe'

function Home(props) {
    const [otherUsersArr, setOtherUsersArr] = useState([])
    const [postsOtherUsers, setPostsOtherUsers] = useState([])
    const [ifFollow, setIfFollow] = useState(null)
    const [deleteFriend, setDeleteFriend] = useState(null)
    const [showFriends, setShowFriends] = useState([])
    const [searchBox, setSearchBox] = useState('')

    let navigate = useNavigate()
    let { feelings } = props
    const { user_email } = props
    //Shows all the users registered
    useEffect(async () => {
        const { user_email } = props
        console.log(user_email)
        try {

            const response = await axios.post('http://localhost:5050/home', {
                user_email,

            })
            console.log(response.data)
            setOtherUsersArr(response.data)
        } catch (error) {
            console.log(error)
        }
        try {

            const response = await axios.post('http://localhost:5050/displayFollow', {
                user_email,

            })
            console.log('setShowFriends', response.data)
            let friends = response.data.map(item => {
                return item['email']
            })
            console.log('QQQQQQQQQQQQQQQQQQQQQQQQQ', friends)
            setShowFriends(friends)
        } catch (error) {
            console.log(error)
        }

    }, [])


    const otherProfile = async (emailOther) => {
        //console.log(emailOther)
        const { user_email } = props
        try {
            const response = await axios.post('http://localhost:5050/otherfriends', {
                emailOther,
                user_email,
            })
            console.log(response.data.message[0].user_to_follow)
            //here im setting ifFollow to the person you clicked "follow"
            setIfFollow(response.data.message[0].user_to_follow)

        } catch (error) {
            console.log(error)

        }

    }



    const deleteFollow = async (emailOther) => {
        const { user_email } = props
        try {

            const response = await axios.post('http://localhost:5050/deleteFollow', {
                user_email,
                emailOther

            })
            console.log('deleteFollow', response.data)
            let friends = response.data.map(item => {
                return item['user_to_follow']
            })
            //console.log('SDSDSDD', deleteFriend, friends)
        } catch (error) {
            console.log(error)
        }
    }




    const handleSearchBox = (e) => {
        setSearchBox(e.target.value)
    }

    const filterUsers = otherUsersArr.filter(item => { return item.name.toLowerCase().includes(searchBox.toLowerCase()) })
    console.log(filterUsers)

    return (

        <div className='homeGeneral'>

            {/* -------------------PEOPLE YOU MAY KNOW-------------------- */}
            <div className='peopleYouMayKnow'>
                <h4 style={{ marginLeft: '38px' }}>People you may know</h4>
                <label>Search</label>
                <input onChange={handleSearchBox}></input>
                {searchBox}
                {searchBox ? <div>{filterUsers.map((item, i) => {
                 

                         let f = showFriends.includes(item.email)
                         console.log(f)
                        return <div>    
                        <div key={item.email} value={item.email} className='otherUsers'>
                        <div style={{ border: "2px solid black", borderRadius: "130px" }}><img src={`https://robohash.org/${item.email}?size=50x50`} /></div>
                        <p>{item.name} {item.lastname} </p>
                        {item.caregiver ? <h5>*Caregiver</h5> : null}
                        
                        <div className='buttonsOthers'>
                            <Button color='secondary' onClick={() => { otherProfile(item.email); }}>{f ? 'Unfollow' : 'Follow'} </Button>

                            {
                                f ?
                                    (<Button>
                                        <Link to={`/profileOther/${item.email}`}>Profile</Link>
                                    </Button>
                                    )
                                    : null
                            }
                        </div>

                    </div></div>
                })}</div> : null}

              


            </div>
            <div className='home'>
                <h1>Home</h1>

                <div className='homeInside'>
                    <h3>What are you thinking?</h3>
                    <div className='homeInsideInside'>
                        <TextField
                            color="secondary"
                            onChange={props.handleChange}
                            id="outlined-multiline-static"
                            label="Type here"
                            multiline
                            rows={8}
                            fullWidth

                        />
                        <Button color="secondary" onClick={props.handleClick}>post</Button>
                    </div>
                </div>





                <div>
                    {props.needToLoginMessage}
                </div>


                <div><h3>Read your friends posts</h3></div>
            </div>











            <FeelingsLikeMe feelings={feelings} user_email={user_email} />

        </div>
    );
}




export default Home;







