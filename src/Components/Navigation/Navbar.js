import { Navbar, Nav } from "react-bootstrap";
import Login from "../Authentication/Login";
import Logout from "../Authentication/Logout";
import Register from "../Authentication/Register";
import jwt from 'jwt-decode'

export default function Navigation(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Hitchhike</Navbar.Brand>
      <Navbar.Collapse id="responsive-nav-id">
        <Nav className="mr-auto">
          <Nav.Link href="/">Pradžia</Nav.Link>
        </Nav>
        <Nav>
          {props.isLoggedIn ? (
            <>
            {/* Check if current user is ADMIN */}
              {jwt(localStorage.getItem("TOKEN")).role === "ADMIN" ? (
                <Nav.Link href="/admin">Administratoriams</Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/newTrip">Kurti kelionę</Nav.Link>
                  <Nav.Link href="/me">Mano profilis</Nav.Link>
                  <Nav.Link href="/me/trips">Mano kelionės</Nav.Link>
                </>
              )}
              <Logout
                setAlertVariant={props.setAlertVariant}
                setAlertHeading={props.setAlertHeading}
                setAlertMsg={props.setAlertMsg}
                setShowAlert={props.setShowAlert}
                setIsLoggedIn={props.setIsLoggedIn}
              />
            </>
          ) : (
            <>
              <Register
                setAlertVariant={props.setAlertVariant}
                setAlertHeading={props.setAlertHeading}
                setAlertMsg={props.setAlertMsg}
                setShowAlert={props.setShowAlert}
              />
              <Login
                setAlertVariant={props.setAlertVariant}
                setAlertHeading={props.setAlertHeading}
                setAlertMsg={props.setAlertMsg}
                setShowAlert={props.setShowAlert}
                setIsLoggedIn={props.setIsLoggedIn}
              />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
