import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TripList from "../Components/Trip/TripList";
import jwt from "jwt-decode";

export default function UserTrips(props) {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/api/trip/creator/${props.id}`)
      .then((res) => res.json())
      .then((res) => setTrips(res));

      fetch(`http://localhost:5000/api/user/${props.id}`)
      .then((res) => res.json())
      .then((res) => setUser(res));

  }, [props.id]);

  
  return (
    <>
      <Container fluid className="pt-5">
        <Row className="pb-5">
          <Col></Col>
          <Col xl={6} lg={8} sm={10} xs={12}>
              {jwt(localStorage.getItem("TOKEN"))._id === props.id ? (
                  <>
                    <h3 className="text-center">Mano kelionės</h3>
                  </>
              ) : (
                  <>
                    <h3 className="text-center">{user ? user.name : "Vartotojo"}</h3>
                    <h3 className="text-center">Kelionės</h3>
                  </>
              )}
          </Col>
          <Col></Col>
        </Row>
        <TripList trips={trips} />
      </Container>
    </>
  );
}
