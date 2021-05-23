import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "./App.css";
import Home from './Components/Home/Home';
import Navigation from './Components/Navigation/Navbar';
import {useState} from 'react'
import { Alert } from 'react-bootstrap';

function App() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [alertHeading, setAlertHeading] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  const cleanAlertState = () =>{
    setShowAlert(false)
    setAlertVariant('')
    setAlertHeading('')
    setAlertMsg('')
  }

  return (
    <div>
      <Router>
        <Navigation
          setAlertVariant={setAlertVariant}
          setAlertHeading={setAlertHeading}
          setAlertMsg={setAlertMsg}
          setShowAlert={setShowAlert}
        />
        {showAlert ? (
          <Alert
            variant={alertVariant}
            onClose={cleanAlertState}
            dismissible
          >
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>{alertMsg}</p>
            {console.log(showAlert)}
          </Alert>
        ) : (
          ""
        )}
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
