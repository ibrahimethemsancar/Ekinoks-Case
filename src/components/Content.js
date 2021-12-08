import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMoviesAsync,getMoviesWithPagination } from '../redux/movies/moviesSlice'
import './Content.css'
import ReactPaginate from 'react-paginate'
import {filterMovies} from'../redux/movies/moviesSlice'
import { Link } from 'react-router-dom'
function Content() {
    const theme=useSelector(state=>state.movies.theme)
   // const items = useSelector(state => state.movies.items)
    let paginationList = useSelector(state => state.movies.paginationList)
    const filtereds = useSelector(state => state.movies.filtereds)
    const dispatch = useDispatch()
    //console.log(items)
    //console.log(paginationList)
    const apiPage = [1,2,3,4,5]
    const [pageData,setPageData]=useState(1)
    const [searchValue,setSearchValue]=useState('')

    useEffect(() => {
        apiPage.map((page) => {

            dispatch(getMoviesAsync(page))
            

        })
        dispatch(getMoviesWithPagination(pageData))
    }, [])
    const handlePageClick=(data)=>{
        console.log(data.selected)
        setPageData(data.selected)
        dispatch(getMoviesWithPagination(data.selected+1))
    }
    const handleChange=(e)=>{
        setSearchValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(filterMovies(searchValue))
       console.log(searchValue)
       setSearchValue('')


    }
    if(filtereds.length>0){
        paginationList=[...filtereds]
    }
   
    return (
        <>
        <div className={`bg-${theme} upDiv`}>
        <form onSubmit={handleSubmit} id='form'>
                <input type="text" className='searchInput' value={searchValue} onChange={handleChange} placeholder='Search any movie by titles' />
                <button type='submit' className='searchButton'><p id='searchText'>Search</p></button>
            </form>
            <div class={`container bg-${theme}`}>
                <div class="row">
                    {
                          paginationList?.map((item, i) => {
                            return (
                                <div className="col-3" key={i}>
                                    <div className="card" >
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt="..."/>
                                        <div className ="card-body">
                                        <h5 className ="card-title">{item.title}</h5>
                                        <p className ="card-text">Popularity :{item.popularity}</p>
                                        <p className ="card-text">Release Date :{item.release_date}</p>
                                        <Link to={`/${item.id}`}><a  className ="btn btn-primary">Go about this</a></Link> 
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }



                </div>
            </div>
            <ReactPaginate
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                previousLabel=" Previous"
               pageCount={Math.ceil(paginationList.length/4)}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}

            />
            </div>
        </>

    )
}

export default Content
