import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
//    const {} = props;
    const { handleLogout, user } = props
    const { id, name, email, exp } = user
    const expirationTime = Date.now()

    //make a condition that compares exp and current time
    if (currentTime >= expirationTime) { 
        handleLogout()
        alert("Session has ended. Please login to continue")
    }

    //if data is available, display whats in the div tag 
    //else show "loading..."
    //ternary:
    const userData = user ? 
    (<div>
        <h1>Profile</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>ID: {id}</p>
    </div>) : <h2>Loading...</h2>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    //if there is a user, then show user data, else show errorDiv
    //also ternary setup in between div tags
    return (
        <div>
            <div className="text-center pt-4">
                {user ? userData : errorDiv()}
            </div>
        </div>
    );

}

export default Profile;