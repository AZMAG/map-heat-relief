import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import MainMap from './Pages/Map';
import Listing from './Pages/Listing';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/map">
            <MainMap />
          </Route>
          <Route path="/listing">
            <Listing />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
