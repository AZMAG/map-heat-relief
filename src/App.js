import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import MapPage from './Pages/MapPage';
import ListingPage from './Pages/ListingPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/listing">
            <ListingPage />
          </Route>
          <Route path="/">
            <WelcomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
