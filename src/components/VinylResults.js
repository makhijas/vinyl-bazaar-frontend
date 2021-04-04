import React from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import VinylDetail from './VinylDetail'



function VinylResults(props) {
    console.log("**** PROPS DATA passed into vinylresults****")
    console.log(props.data)
    const { data } = props;
    
    // const handleSelect = (e) => {
    //     e.preventDefault();
    //     <Redirect
    //         to={{    
    //         pathname: "./VinylDetail",
    //         state: { album: album.title }
    //       }}
    //     />
    // }   

    const results = data.map((album, index) => {
        // map takes 2 parameters (include index for react) 
        //destructuring - can also use as album.title instead 
        
        <VinylDetail album={album} key={index} />
        // const { title, year, } = album
 
        return (<div>
                        <p>Album: {album.title}</p>
                        <p>Year: {album.year}</p>
                        <Link to={{
                            pathname: "/vinylDetail",
                            state: { album: album }
                            }}> SELECT </Link>
               </div>)
        // <button className="btn" type="submit" onSubmit= { handleSelect } >SELECT</button>
        //send detail components to vinylDetail 
        //return <VinylDetail key={`album-${index}`} title={title} year={year} />
    })


    //map over data
    //include index arguement so each component is unique
    return (
        <div>
            <p>Vinyl results component</p>
            <div className="results">{results}</div>
        </div>
    )
}


export default VinylResults;

