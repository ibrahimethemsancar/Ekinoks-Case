import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeFromList} from'../redux/movies/moviesSlice'
import './WatchList.css'
function WatchList() {
    const favoriteList=useSelector(state=>state.movies.favoriteList)
    const theme=useSelector(state=>state.movies.theme)
    console.log(favoriteList)
    const dispatch=useDispatch()
    const [remove,setRemove]=useState()
    const handleClick=(remove)=>{
        
        dispatch(removeFromList(remove))
    }
    console.log(remove)
    useEffect(()=>{

    },[])
    return (
       <div className={`bg-${theme}`}>
        <h2 className='head'>Watch List</h2>
        <div class="container">
        <div class="row">
            {
                  favoriteList?.map((item, i) => {
                    return (
                        <div className="col-3" key={i}>
                            <div className="card" >
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt="..."/>
                                <div className ="card-body">
                                <h5 className ="card-title">{item.title}</h5>
                                <p className ="card-text">Popularity :{item.popularity}</p>
                                <p className ="card-text">Release Date :{item.release_date}</p>
                                <button className='btn btn-danger' onClick={()=>{
                                    setRemove(item);
                                    handleClick(item)
                                }}>Remove from Watch List</button>
                                </div>
                               
                            </div>
                        </div>
                    )
                })
            }



        </div>
    </div>
    </div>
    )
}

export default WatchList
