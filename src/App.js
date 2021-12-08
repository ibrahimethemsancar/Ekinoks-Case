import Content from "./components/Content";
import Head from "./components/Head";
import WatchList from "./components/WatchList";
import MovieDetail from "./components/MovieDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' >
            <Head />
            <Content />
          </Route>
         

          <Route path="/Watchlist">
          <Head />
            <WatchList />
          </Route>

      <Route path='/:id'>
        <Head/>
        <MovieDetail/>
      </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;


