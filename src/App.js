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

import Search from './components/Search'
import VinylResults from './components/VinylResults'
import VinylDetail from './components/VinylDetail'
import Bounties from './components/Bounties'


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

  const [data, setData] = useState([])

  useEffect(() => {
      const getData = async() => {
          let searchTerm = "Tana Talk"
          // can also use axios.get instead of fetch
          let response = await fetch("https://api.discogs.com/database/search?release_title=" + searchTerm + "&key=tyUsvIrblYOpTSJKlFiz&secret=dvbIgifMTdHKdtQFwLIYdHZltjfQvyCw")
          response = await response.json()
          console.log(response)
          // if using axios, the following would be response.data
          response = response.results
          console.log("****** API DATA ******")
          console.log(response)
          // setting the array with response from api
          setData(response)
      }
      getData()
  }, [])


  return (
    <div className="App">
      <h1>Vinyl Bazaar</h1>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} /> 
      <div className="container mt-5"> 
        <Switch>
          <Route path='/signup' component={Signup}/> 
          <Route path='/search' component={Search}/>
          <Route path='/bounties' component={Bounties}/>
          <Route 
            path="/login"
            render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}
          />
          <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
          <Route exact path="/" component={Welcome} />
        </Switch>

        <>
        <Route exact path="/search/albums" render={(props)=> <VinylResults {...props} data={data} />} />
        <Route exact path="/vinylDetail" render={(props)=> <VinylDetail {...props} />} />
        </>

      </div>
      <Footer />
    </div>
  );
}

export default App;
