import React, { useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

const { REACT_APP_SERVER_URL } = process.env;



export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm); 
        axios.post(`${REACT_APP_SERVER_URL}/search/albums`, {"term" : searchTerm})
        .then(response => {
            console.log(response);
            // response is res.send from backend
        })
        .catch(error => {
            console.log("====> Error searching", error) //this error is only visible on the developer's side so we must still handle the user and let them know that there is an error
        }) 
    }
    render()
        return (
            <div>
                <form onSubmit = {handleSubmit}>
                    <input type="search" name="search" onChange={handleSearchTerm}/>
                    <button class="btn" type="submit">GO</button>
                </form>
            </div>
        )
}
