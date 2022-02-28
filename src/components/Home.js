import axios from 'axios';
import React, {useState, useEffect} from 'react';
import OtherFriendsPosts from './OtherFriendsPosts'
import { Route, Link, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

function Home(props){
    const [otherUsersArr, setOtherUsersArr] = useState([])
    const [postsOtherUsers, setPostsOtherUsers] = useState([])
    let navigate = useNavigate()
   

    useEffect (async ()=>{
        const user_email  = props
        try {
            
            const response = await axios.post('http://localhost:5050', {
                user_email,

            })
            console.log(response.data)
            setOtherUsersArr(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [])
  
    const  otherProfile= async (emailOther) =>{
        console.log(emailOther)
        const { user_email } = props
        try {
            const response = await axios.post('http://localhost:5050/otherfriends', {
                emailOther,
                user_email,
            })

            console.log(response.data)
        } catch (error) {
            console.log(error)

        }
    }

    // watch friends profile
    const seeOtherProfile= async (emailOther) => {

        try {
            const response = await axios.post(`http://localhost:5050/emailOther`, {
                emailOther
            })
            setPostsOtherUsers(response.data)

        } catch (error) {
            console.log(error)
        }


    }


        //aca se consologuea los posts del other user
        console.log(postsOtherUsers)
        //const { otherUsersArr } = this.state
        return (


            <div>
                <h1>Home</h1>
                
                <div>
                    <h3>What are you thinking?</h3>
                    <input onChange={props.handleChange} name='input'></input>
                    <button onClick={props.handleClick}>post</button>
                    <div>
                        {props.needToLoginMessage}
                    </div>


                </div>



                <div><h3>Read your friends posts:</h3></div>
                <div>

                </div>
                <div>
                    <h4>People you may know</h4>
                    {otherUsersArr.map((item, i) => {
                        return (
                        <div key={i}>
                            <p>{item.name} {item.lastname}</p>
                            <button onClick={() => this.otherProfile(item.email)}>Follow</button>
                            <Link to={`/profileOther/${item.email}`}>Profile</Link>
                            
                        </div>)
                    })}

                    
                </div>



            </div>
        );
    }




export default Home;







