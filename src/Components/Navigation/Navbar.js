import { Navbar, Nav } from "react-bootstrap";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

export default function Navigation(props) {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Hitchhike</Navbar.Brand>
    <Navbar.Collapse id="responsive-nav-id">
    <Nav className="mr-auto">
      <Nav.Link href="/">Pradžia</Nav.Link>
      <Nav.Link href="/newTrip">Kurti kelionę</Nav.Link>
      <Nav.Link href="/admin">Administratoriams</Nav.Link>
    </Nav>
    <Nav>
      <Register setAlertVariant={props.setAlertVariant} setAlertHeading={props.setAlertHeading} setAlertMsg={props.setAlertMsg} setShowAlert={props.setShowAlert} />
      <Login setAlertVariant={props.setAlertVariant} setAlertHeading={props.setAlertHeading} setAlertMsg={props.setAlertMsg} setShowAlert={props.setShowAlert} />
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}
