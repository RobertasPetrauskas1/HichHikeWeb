import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TripList from "../Components/Trip/TripList";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/trip")
      .then((res) => res.json())
      .then((res) => {
        setTrips(res);
        setIsSet(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid className="pt-5 home">
        <Row className="pb-5">
          <Col></Col>
          <Col xl={6} lg={8} sm={10} xs={12}><h3 className='text-center'>Visos kelionės</h3></Col>
          <Col></Col>
        </Row>
        {isSet ? <TripList trips={trips} /> : "Kraunama..."} 
      </Container>
    </>
  );
}
