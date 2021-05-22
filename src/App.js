import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "./App.css";
import Home from './Components/Home/Home';
import Navigation from './Components/Navigation/Navbar';

function App() {
  return (
    <div>
     <Router>
       <Navigation />
       <div className="contect">
        <Switch>
        <Route exact strict path="/">
            <Home />
          </Route>
        </Switch>
       </div>
     </Router>
    </div>
  );
}

export default App;
