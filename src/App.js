// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// Components
import Signup from './components/Signup'
import About from './components/About'
import Footer from './components/Footer'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Welcome from './components/Welcome'

const PrivateRoute = ({ component: Component, ...rest}) => {
  let token = localStorage.getItem("jwtToken")
  console.log("====> Hitting a PRIVATE ROUTE")
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> :<Redirect to="/login" />
  }}/>
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  
  useEffect(() => {
    let token;

    if(!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false)
      console.log("====> authenticated is now FALSE")
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.getItem('jwtToke'))
      setCurrentUser(token)
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log("====> nowCurrent is HERE")
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    //check to see if there is a jwt token
    //if there is, remove it from local storage
    //
    if (localStorage.getItem('jwtToken')) {
      //remove token from localStorage
      localStorage.removeItem("jwtToken")
      setCurrentUser(null)
      setIsAuthenticated(false)
    }


  }


  return (
    <div className="App">
      <h1>MERN Authentication</h1>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} /> 
      <div className="container mt-5"> 
        <Switch>
          <Route path='/signup' component={Signup}/> 
          <Route 
            path="/login"
            render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}
          />
          <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
          <Route exact path="/" componen={Welcome} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
