import React, { useState, useEffect } from 'react';
// import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

export default function VinylDetail(props) {
    console.log("**** ALBUM passed to VinylDetails****")
    console.log(props.location.state.album)
    // const { album } = props.location.state.album.title;
    const [userInput, setUserInput] = useState("")
    
    const saveAlbum = (e) => {
            e.preventDefault()
            console.log("****in saveAlbum FUNCTION****" + props.location.state.album.title)
            axios.post(`${REACT_APP_SERVER_URL}/album/save`, {"record" : props.location.state.album})
            .then(() => {
                console.log("****ALBUM DEETS SENT TO BACK****")
                saveBounty()
            })
        }
    const saveBounty = () => {
        console.log("****BOUNTY****" + userInput)
        // const userData = { email, password }
        axios.post(`${REACT_APP_SERVER_URL}/bounty`, {"bounty" : userInput})
        .then(() => {
            console.log("sending to backend")
        }  
        )}


    return (
        <div>
            <form onSubmit={saveAlbum}>
                <p>Album: {props.location.state.album.title} </p>
                <p>Year: {props.location.state.album.year} </p>
                <img src={props.location.state.album.thumb}></img>
                <p>Format: {props.location.state.album.format[0]} </p>
                <label for="bounty">Enter a bounty in USD</label>
                <input type="number" name="bounty" onChange={e => {
                setUserInput(e.target.value)
                }}/>
                {/* <Link to="/bounties" className="btn btn-primary">Set my bounty</Link> */}
                <button className="btn" type="submit">Set my bounty</button>
            </form>
            
        </div>
    )
}
