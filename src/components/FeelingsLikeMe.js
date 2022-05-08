import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import '../App.css'


function FeelingsLikeMe(props) {
    const { feelings } = props
    const [otherUsersArr, setOtherUsersArr] = useState([])
    const [otherFeelingsLikeMe, setOtherFeelingsLikeMe] = useState([])
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
            const responseSameFeelings = await axios.post('http://localhost:5050/sameFeelingsAsMe', {
                user_email,
            })
            console.log(responseSameFeelings.data)
            setOtherFeelingsLikeMe(responseSameFeelings.data)
        } catch (error) {
            console.log(error)
        }
    }, [])
    const filterUsers= otherFeelingsLikeMe.map((item,i)=>{ return item.feelings})
    console.log(filterUsers)

    return (
    
        <div style={{ border: '1px solid black' }}>
            <h3>Who is also feeling the same way as me?</h3>
            <h4>I am feeling {feelings}</h4>
            

            

                <div>
                    {otherFeelingsLikeMe.map((item,i)=>{
                        return <div>
                            <h4>{item.name} {item.lastname}</h4>
                            <p>{item.feelings}</p>
                        </div>
                        
                    })}
                </div>
        </div>
    );
}

export default FeelingsLikeMe;