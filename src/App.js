import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navigation from "./Components/Navigation/Navbar";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Trip from "./Pages/Trip";
import TripForm from "./Pages/TripForm";
import Profile from "./Pages/Profile";
//import ProfileForm from "./Pages/ProfileForm"
import UserList from "./Pages/UserList";
import jwt from "jwt-decode";
import UserTrips from "./Pages/UsersTrips";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cleanAlertState = () => {
    setShowAlert(false);
    setAlertVariant("");
    setAlertHeading("");
    setAlertMsg("");
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/validate", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("TOKEN"),
      },
    })
      .then((res) => res.status)
      .then(
        (res) => {
          if (res === 200) {
            setIsLoggedIn(true);
          } else {
            if (localStorage.getItem("TOKEN")) {
              localStorage.removeItem("TOKEN");
              setAlertVariant("warning");
              setAlertHeading("Jūsų sesija baigėsi. Prisijunkite išnaujo");
              setShowAlert(true);
              setIsLoggedIn(false);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  return (
    <div>
      <Router>
        <Navigation
          setAlertVariant={setAlertVariant}
          setAlertHeading={setAlertHeading}
          setAlertMsg={setAlertMsg}
          setShowAlert={setShowAlert}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {showAlert ? (
          <Alert variant={alertVariant} onClose={cleanAlertState} dismissible>
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>{alertMsg}</p>
          </Alert>
        ) : (
          <></>
        )}
        <div className="content">
          <Switch>
            <Route exact strict path="/">
              <Home />
            </Route>
            <Route exact strict path="/trip/:id">
              <Trip
              setAlertVariant={setAlertVariant}
              setAlertHeading={setAlertHeading}
              setAlertMsg={setAlertMsg}
              setShowAlert={setShowAlert}
              />
            </Route>
            {isLoggedIn ? (
              <>
                <Route exact strict path="/newTrip">
                  <TripForm
                    setAlertVariant={setAlertVariant}
                    setAlertHeading={setAlertHeading}
                    setAlertMsg={setAlertMsg}
                    setShowAlert={setShowAlert}
                  />
                </Route>
                <Route exact strict path="/me">
                  <Profile id={jwt(localStorage.getItem("TOKEN"))._id} />
                </Route>
                <Route
                  exact
                  strict
                  path="/me/trips"
                >
                  <UserTrips 
                  id={jwt(localStorage.getItem("TOKEN"))._id}
                  setAlertVariant={setAlertVariant}
                  setAlertHeading={setAlertHeading}
                  setAlertMsg={setAlertMsg}
                  setShowAlert={setShowAlert}
                  />
                </Route>
                <Route exact strict path="/user/:id">
                  <Profile />
                </Route>
                {jwt(localStorage.getItem("TOKEN")).role === "ADMIN" ? (
                  <>
                    <Route exact strict path="/user/list">
                      <UserList />
                    </Route>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <Route>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
