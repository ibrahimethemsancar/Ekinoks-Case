import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMoviesAsync=createAsyncThunk('movies/getMoviesAsync', async(num)=>{
    const res=await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=8363d5a227eceb6e9838e16918066751&language=en-US&page=${num}`)
    return await res.json()
})
export const getMoviesWithPagination=createAsyncThunk('movies/getMoviesWithPagination', async(num)=>{
    const res=await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=8363d5a227eceb6e9838e16918066751&language=en-US&page=${num}`)
    return await res.json()
})


export const moviesSlice=createSlice({
    name:'movies',
    initialState:{
        items:[],
        filtereds:[],
        paginationList:[],
        theme:'dark',
        favoriteList:[],
        isLoading:false,
        error:null,
    },
    reducers:{
        filterMovies:(state,action)=>{
            let filterValue=action.payload
            let filtered=state.items.filter(function (item) {
                return item.title.toLowerCase().includes(filterValue)
            })
            
            state.filtereds=filtered
        
            //console.log(watch)
        },
        addWatchList:(state,action)=>{
            let theMovie=action.payload
            state.favoriteList.push(theMovie)
          
        },
        removeFromList:(state,action)=>{
            let removedMovie=action.payload?.id
            console.log(action.payload.id)
            console.log(state.favoriteList)
            const removed=state.favoriteList.filter(function(item){
                return item.id!=removedMovie
            })
            state.favoriteList=removed

        },
        changeTheme:(state,action)=>{
            if(action.payload=='dark'){
                state.theme='light'
            }
            else if(action.payload=='light'){
                state.theme='dark'
            }
        }
      
    },
    extraReducers:{
        [getMoviesAsync.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [getMoviesAsync.fulfilled]:(state,action)=>{
            state.items=state.items.concat(action.payload.results);
            state.isLoading=false;
            
        },
        [getMoviesAsync.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
        },
        [getMoviesWithPagination.fulfilled]:(state,action)=>{   
            state.paginationList=action.payload.results
            
        },
    },
})

export const {filterMovies,addWatchList,removeFromList,changeTheme}=moviesSlice.actions
export default moviesSlice.reducer;