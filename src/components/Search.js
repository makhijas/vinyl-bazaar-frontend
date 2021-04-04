import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import VinylResults from './VinylResults'

const { REACT_APP_SERVER_URL } = process.env;

export default function Search(req, res) {
    const [data, setData] = useState([])
    //this is setting an empty state where the user input will be 
    const [userInput, setUserInput] = useState("")
    
    
    // useEffect(() => {
    //     const getData = async() => {
    //         // let searchTerm = "Tana Talk"
    //         // can also use axios.get instead of fetch
    //         let response = await fetch("https://api.discogs.com/database/search?release_title=" + userInput + "&key=tyUsvIrblYOpTSJKlFiz&secret=dvbIgifMTdHKdtQFwLIYdHZltjfQvyCw")
    //         response = await response.json()
    //         // console.log(response)
    //         // if using axios, the following would be response.data
    //         response = response.results
    //         // response = response.values(response.results['data'])
    //         console.log("****** API DATA ******")
    //         console.log(response)
    //         // setting the array with response from api
    //         setData(response)
    //     }
    //     getData()
    // }, [])

    // const [searchTerm, setSearchTerm] = useState("");

    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }
    // capitalize H when adding useeffect 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInput); 
        axios.post(`${REACT_APP_SERVER_URL}/search/albums`, {"term" : userInput})
        .then(response => {
            console.log(response.data.results);
            setData(response.data.results)
            // let discogsData = response.data
            // this.setState({
            //     discogsData: discogsData
        })
            // response is res.send from backend
        .catch(error => {
            console.log("====> Error searching", error) //this error is only visible on the developer's side so we must still handle the user and let them know that there is an error
        }) 
    }
    // render()
        return (
            <div>
                <form onSubmit = {handleSubmit}>
                    <input type="search" name="search" onChange={handleUserInput}/>
                    <button className="btn" type="submit">GO</button>
                    <VinylResults data={ data }/>
                </form>
            </div>
        )
}
