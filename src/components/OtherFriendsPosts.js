import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import '../App.css'


function OtherFriendsPosts(props) {
    const [display, setDisplay] = useState([])
    const [name, setName] = useState([])
    const [img, setImg] = useState('')
    const [statusFeelings, setStatusFeelings] = useState('')
    // hacer un fetch de los feelings asi como se hizo del nombre y apellido
    const params = useParams()
    useEffect( async ()=>{
    try {
        const responseName =  await axios.get(`http://localhost:5050/profileName/${params.useremail}`)
        const response =  await axios.get(`http://localhost:5050/profileOther/${params.useremail}`)
        const img = await (`https://robohash.org/${params.useremail}?set=set1&size=200x200`)
        const responseFeelings =  await axios.get(`http://localhost:5050/profileOtherFeelings/${params.useremail}`)
        setImg(img)
        console.log(response.data)
        //console.log(responseFeelings.data[0].feelings)
        console.log('response name', responseName.data)
        if(response.data){
            setDisplay(response.data)
            setName(responseName.data)
            setStatusFeelings(responseFeelings.data[0].feelings)
        }
     
        
    } catch (error) {
        console.log(error)
    }
    },[])
    console.log(display)
    // async howIamFeeling() {
    //     try {
    //         const response = await axios.post('http://localhost:5050/howIamFeeling')
    //         this.setState({ emotionsArr: response.data })
    //     } catch (error) {

    //     }
    // }

    const handleLike = ()=>{
        
    }
    return(
        <div className='profile'>
        
        {name.length>0 ? <h1>{name[0].name} {name[0].lastname}</h1>: null}
        {statusFeelings.length>0 ? <h5>{statusFeelings}</h5> : null}
        <div style={{ border: "3px solid black",borderRadius: "100px", height: '200px', width: '200px' }}> <img src= {`${img}`} style={{ height: '200px', width: '200px' }} className={'photo'}></img></div> 
        {display.map((item, i)=>{
            return <div className='divPostsOther'><p>{item.tweet} </p>
            <p>{moment(item.created_at).format("Do MMM YYYY HH:mm")}</p>
            Send: <button onClick={handleLike}>Love</button> <button>Hope</button> <button>Strength</button> <button>Comment</button>
            </div>
        })}
        </div>
        
    )
        
}

export default OtherFriendsPosts;