import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Traveler from "./Traveler";

export default function TravelerList(props) {
    const [travelers, setTravelers] = useState(props.travelers)
  return (
    <Container fluid className="pt-5">
      {travelers?.length > 0 ? (
        <>
          {travelers.map((traveler) => {
            return (
              <Traveler
                traveler={traveler}
                tripId={props.tripId}
                key={traveler.userId}
                setAlertVariant={props.setAlertVariant}
                setAlertHeading={props.setAlertHeading}
                setAlertMsg={props.setAlertMsg}
                setShowAlert={props.setShowAlert}
                travelers={travelers}
                setTravelers={setTravelers}
              />
            );
          })}
        </>
      ) : (
        <>
          <Row>
            <Col></Col>
            <Col
              className="tripItem text-center p-4"
              xl={6}
              lg={8}
              sm={10}
              xs={12}
            >
              <h4>Keliautojų dar nėra</h4>
            </Col>
            <Col></Col>
          </Row>
        </>
      )}
    </Container>
  );
}
