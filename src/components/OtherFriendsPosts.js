import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

//imp
// const params = useParams()
// console.log(params.useremail)
// 'localchost 5005/ profileOther/ {params.useremail}' 

function OtherFriendsPosts(props) {
    const [display, setDisplay] = useState([])
    const [name, setName] = useState([])
    const [img, setImg] = useState('')
    const params = useParams()
    useEffect( async ()=>{
    try {
        const responseName =  await axios.get(`http://localhost:5050/profileName/${params.useremail}`)
        const response =  await axios.get(`http://localhost:5050/profileOther/${params.useremail}`)
        const img = await (`https://robohash.org/${params.useremail}?set=set1&size=200x200`);
        setImg(img)
        console.log(response.data)
        console.log('response name', responseName.data)
        if(response.data){
            setDisplay(response.data)
            setName(responseName.data)
            
        }
        
    } catch (error) {
        console.log(error)
    }
    },[])
    console.log(display)
    return(
        <>
        
        {name.length>0 ? <h1>{name[0].name} {name[0].lastname}</h1>: null}
        <div style={{ border: "1px solid black", height: '200px', width: '200px' }}> <img src= {`${img}`} style={{ height: '200px', width: '200px' }}></img></div> 
        {display.map((item, i)=>{
            return <div><p>{item.tweet}</p></div>
        })}
        </>
        
    )
        
}

export default OtherFriendsPosts;