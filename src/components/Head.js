import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink
} from "react-router-dom";
import "./Head.css"
import { useSelector, useDispatch } from 'react-redux'
import {changeTheme} from'../redux/movies/moviesSlice'
function Head() {
  const dispatch=useDispatch()
  const theme=useSelector(state=>state.movies.theme)
    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Movies</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        
         <NavLink exact to='/' className='navLink'><li className="nav-item"><a className="nav-link active " aria-current="page" >Home</a></li></NavLink> 
        
        
        <NavLink exact to='/Watchlist' className='navLink' ><li className="nav-item"><a className="nav-link  " >Watch List</a></li></NavLink>  
        
        
        
        
      </ul>
      
    </div>
    <button className={`btn btn-dark ${theme} `}  onClick={()=>{dispatch(changeTheme(theme))}} >{theme.toUpperCase()}</button>
  </div>
</nav>
    )
}

export default Head
