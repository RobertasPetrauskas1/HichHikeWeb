import { Navbar, Nav } from "react-bootstrap";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Hitchhike</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Pradžia</Nav.Link>
      <Nav.Link href="/newTrip">Kurti kelionę</Nav.Link>
      <Nav.Link href="/admin">Administratoriams</Nav.Link>
    </Nav>
    <Nav>
      <Register />
      <Login />
    </Nav>
  </Navbar>
  );
}
