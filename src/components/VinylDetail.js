import React from 'react'

export default function VinylDetail(props) {
    console.log("**** ALBUM passed to VinylDetails****")
    console.log(props.location.state.album)
    // const { album } = props.location.state.album.title;
    return (
        <div>
            <p>Album: {props.location.state.album.title} </p>
        </div>
    )
}
