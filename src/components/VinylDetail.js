import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function VinylDetail(props) {
    console.log("**** ALBUM passed to VinylDetails****")
    console.log(props.location.state.album)
    // const { album } = props.location.state.album.title;
    const [userInput, setUserInput] = useState("")

    const saveBounty = (e) => {
        setUserInput(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div>
            <p>Album: {props.location.state.album.title} </p>
            <label for="bounty">Enter a bounty in USD</label>
            <input type="number" name="bounty" onChange={saveBounty}/>
            <Link to="/bounties" className="btn btn-primary">Set my bounty</Link>
            {/* <button className="btn" type="submit">Set my bounty</button> */}
        </div>
    )
}
