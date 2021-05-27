import { Container, Col, Row, Button, Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import TravelerList from "../Components/Traveler/TravelerList";

export default function Trip(props) {
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const [isSet, setIsSet] = useState(false);
  const [isCurrentUserTrip, setIsCurrentUserTrip] = useState();
  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [isParticipating, setIsParticipating] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() =>{
    if(trip.travelers && trip.travelers.filter(e => e.userId === jwt(localStorage.getItem("TOKEN"))._id).length > 0){
      setIsParticipating(true)
      if(trip.travelers.filter(e => (e.userId === jwt(localStorage.getItem("TOKEN"))._id) && e.isConfirmed === true).length > 0){
        setIsConfirmed(true)
      }
    }
  },[trip.travelers])

  const cleanAlertState = () => {
    setShowAlert(false);
    setAlertVariant("");
    setAlertHeading("");
    setAlertMsg("");
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/trip/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setTrip(res);
        setIsSet(true);
        if (
          localStorage.getItem("TOKEN") &&
          res.creator.id === jwt(localStorage.getItem("TOKEN"))._id
        ) {
          setIsCurrentUserTrip(true);
        } else {
          setIsCurrentUserTrip(false);
        }
      });
  }, [id]);

  const onDelete = () => {
    fetch(`http://localhost:5000/api/trip/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("TOKEN"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else if (res.status === 401) {
          localStorage.removeItem("TOKEN");
          throw Error("Veiksmas negalimas. Gal pasibaigė jūsų sesija?");
        } else {
          throw Error(res.text());
        }
      })
      .then(
        () => {
          props.setAlertVariant("success");
          props.setAlertHeading("Kelionė ištrinta!");
          history.push("/");
          props.setShowAlert(true);
        },
        (err) => {
          props.setAlertVariant("danger");
          props.setAlertHeading("Klaida:");
          props.setAlertMsg(err);
          history.push("/");
          props.setShowAlert(true);
        }
      );
  };

  const participate = () => {
    fetch(`http://localhost:5000/api/trip/${trip._id}/participate`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem("TOKEN")
      }
    })
    .then(res => {
      if(res.ok){
        return "Užklausa išsiųsta sėkmingai."
      }
      else{
        throw new Error("Įvyko klaida. Apgailėstaujame")
      }
    })
    .then(
      (res) => {
        props.setAlertVariant("success");
        props.setAlertHeading(res);
        setIsParticipating(true)
        props.setShowAlert(true);
      },
      (err) => {
        props.setAlertVariant("danger");
        props.setAlertHeading("Klaida:");
        props.setAlertMsg(err);
        props.setShowAlert(true);
      }
    );
  }

  const cancelParticipation = () => {
    fetch(`http://localhost:5000/api/trip/${trip._id}/unparticipate`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem("TOKEN")
      }
    })
    .then(res => {
      if(res.ok){
        return "Užklausa atšaukta sėkmingai."
      }
      else{
        throw new Error("Įvyko klaida. Apgailėstaujame")
      }
    })
    .then(
      (res) => {
        props.setAlertVariant("success");
        props.setAlertHeading(res);
        setIsParticipating(false)
        props.setShowAlert(true);
      },
      (err) => {
        props.setAlertVariant("danger");
        props.setAlertHeading("Klaida:");
        props.setAlertMsg(err);
        props.setShowAlert(true);
      }
    );
  }

  return (
    <>
      {showAlert ? (
        <Alert variant={alertVariant} onClose={cleanAlertState} dismissible>
          <Alert.Heading>{alertHeading}</Alert.Heading>
          <p>{alertMsg}</p>
        </Alert>
      ) : (
        <></>
      )}
      <Container fluid className="pt-5">
        <div>
          {isSet ? (
            <Row>
              <Col></Col>
              <Col xl={6} lg={8} sm={10} xs={12} className="tripItem mb-3 p-3">
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <h5>Iš:</h5>
                        <strong>Šalis:</strong>
                        <span> {trip.destinationFrom.country.name}</span>
                        <br />
                        <strong>Miestas:</strong>
                        <span> {trip.destinationFrom.city.name}</span>
                        <br />
                        <strong>Adresas:</strong>
                        <span> {trip.destinationFrom.address}</span>
                        <br />
                      </Col>
                      <Col>
                        <h5>Į:</h5>
                        <strong>Šalis:</strong>
                        <span> {trip.destinationTo.country.name}</span>
                        <br />
                        <strong>Miestas:</strong>
                        <span> {trip.destinationTo.city.name}</span>
                        <br />
                        <strong>Adresas:</strong>
                        <span> {trip.destinationTo.address}</span>
                        <br />
                      </Col>
                    </Row>
                    <Row className="pt-4">
                      <Col className="text-center">
                        {isParticipating && isConfirmed ? (
                          <h5>Užklausa patvirtinta</h5>
                        ) : (
                          <></>
                        )}
                        {!isConfirmed && isParticipating ? (
                          <h5>Užklausa nepatvirtinta</h5>
                        ) : (
                          <></>
                        )}
                      </Col>
                      <Col xs={6}>
                        {localStorage.getItem("TOKEN") ? (
                          <>
                            {isCurrentUserTrip ? (
                              <>
                                <Button
                                  type="button"
                                  onClick={onDelete}
                                  variant="danger"
                                  block
                                >
                                  Trinti
                                </Button>
                              </>
                            ) : (
                              <>
                                {isParticipating ? (
                                  <>
                                    <Button variant="danger" block onClick={cancelParticipation}>
                                      Atšaukti užklausą
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button variant="secondary" block onClick={participate}>
                                      Keliauti kartu
                                    </Button>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <strong>
                              <p className="text-center">
                                Prisijunkite kad keliautumėt kartu!
                              </p>
                            </strong>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={6}>
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
                    <Link
                      to={`/user/${trip.creator.id}`}
                      style={{ color: "#000" }}
                    >
                      <span> {trip.creator.name}</span>
                    </Link>
                    <br />
                  </Col>
                </Row>
              </Col>
              <Col></Col>
            </Row>
          ) : (
            "Kraunama..."
          )}
        </div>
      </Container>
      {isCurrentUserTrip ? (
        <>
          <TravelerList
            travelers={trip.travelers}
            tripId={trip._id}
            setAlertVariant={setAlertVariant}
            setAlertHeading={setAlertHeading}
            setAlertMsg={setAlertMsg}
            setShowAlert={setShowAlert}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
