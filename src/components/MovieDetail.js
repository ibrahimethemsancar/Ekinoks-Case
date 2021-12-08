import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    NavLink
  } from "react-router-dom";
  import { useSelector, useDispatch } from 'react-redux'
  import './MovieDetail.css'
  import {addWatchList,getMoviesAsync,filterMovies} from'../redux/movies/moviesSlice'
function MovieDetail() {
    const dispatch=useDispatch()
    const items = useSelector(state => state.movies.items)
    const theme = useSelector(state => state.movies.theme)
    let {id}=useParams()
    console.log(id)
    let  theMovie=items.filter(function(item){
       return item.id==id
    })
    let title=theMovie[0].title
    const apiPage = [1,2,3,4,5]
    useEffect(()=>{
        apiPage.map((page) => {

            dispatch(filterMovies(page))
            

        })
    },[])
   // console.log(theMovie)
   const handleClick=(e)=>{
    e.preventDefault()
    dispatch(addWatchList(theMovie[0]))
   }
    return (
        <div className={`bg-${theme} topDiv`}>
        <div className={`container bg-${theme}`}>
        <div id='detailDiv' className='bg-dark'>
            <div className="col-3 sa" >
                                    <div className="card" style={{width:'300px'}}>
                                        <img src={`https://image.tmdb.org/t/p/w500${theMovie[0]?.poster_path}`} className="card-img-top" alt="..."/>
                                        <div className ="card-body">
                                        <h5 className ="card-title">{theMovie[0]?.title}</h5>
                                        <h5 className ="card-title">Original Title :{theMovie[0]?.original_title}</h5>
                                        <p className ="card-text">{theMovie[0]?.overview}</p>
                                        <p className ="card-text">Release Date :{theMovie[0]?.release_date}</p>
                                        <p className ="card-text">Vote Average:{theMovie[0]?.vote_average}</p>
                                       <button className='btn btn-primary'onClick={handleClick}>Add Watch List</button>
                                        </div>
                                    </div>
                                </div>
        </div>
        </div>
        </div>
    )
}

export default MovieDetail
