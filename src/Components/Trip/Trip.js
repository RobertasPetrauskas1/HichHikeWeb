import { Col, Row } from "react-bootstrap";

export default function Trip(props) {
  const trip = props.trip;
  return (
    <Row>
      <Col></Col>
      <Col xl={6} lg={8} sm={10} xs={12} className="tripItem mb-3 p-3">
        <Row>
          <Col>
            <Row>
              <Col>
                <h5>Iš:</h5>
                <Row>
                  <Col></Col>
                  <Col xs={10}>
                    <strong>Šalis:</strong>
                    <span> {trip.destinationFrom.country.name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col xs={10}>
                    <strong>Miestas:</strong>
                    <span> {trip.destinationFrom.city.name}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Į:</h5>
                <Row>
                  <Col></Col>
                  <Col xs={10}>
                    <strong>Šalis:</strong>
                    <span> {trip.destinationTo.country.name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col xs={10}>
                    <strong>Miestas:</strong>
                    <span> {trip.destinationTo.city.name}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={8}>
            <h5>Papildoma informacija:</h5>
            <strong>Laisvų vietų skaičius:</strong>
            <span> {trip.availableSeatCount}</span>
            <br />
            <strong>Data:</strong>
            <span> {trip.date.split("T")[0]}</span>
            <br />
            <strong>Laikas:</strong>
            <span> {trip.time}</span>
            <br />
            <strong>Aprašymas:</strong>
            <span> {trip.description}</span>
            <br />
            <strong>Kūrėjas:</strong>
            <span> {trip.creator.name}</span>
            <br />
          </Col>
        </Row>
      </Col>
      <Col></Col>
    </Row>
  );
}
