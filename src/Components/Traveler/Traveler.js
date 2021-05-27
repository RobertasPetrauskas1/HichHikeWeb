import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Traveler(props) {
  const [user, setUser] = useState();
  const [traveler, setTraveler] = useState(props.traveler);

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${traveler.userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res));
  }, [traveler.userId]);

  const removeParticipant = () => {
    fetch(
      `http://localhost:5000/api/trip/${props.tripId}/remove/${traveler.userId}`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("TOKEN"),
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return "Keliautojo užklausa atšaukta sėkmingai!";
        } else {
          throw Error("Ivyko klaida. Apgailėstaujame.");
        }
      })
      .then(
        (res) => {
          props.setAlertVariant("success");
          props.setAlertHeading(res);
          props.setShowAlert(true);
          props.setTravelers(props.travelers.filter(obj =>{
              return obj.userId !== traveler.userId
          }))
        },
        (err) => {
          props.setAlertVariant("danger");
          props.setAlertHeading("Klaida:");
          props.setAlertMsg(err);
          props.setShowAlert(true);
        }
      );
  };

  const confirmParticipant = () => {
    fetch(
      `http://localhost:5000/api/trip/${props.tripId}/confirm/${traveler.userId}`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("TOKEN"),
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return "Keliautojas patvirtintas sėkmingai!";
        } else {
          throw Error("Ivyko klaida. Apgailėstaujame.");
        }
      })
      .then(
        (res) => {
          props.setAlertVariant("success");
          props.setAlertHeading(res);
          props.setShowAlert(true);
          setTraveler({ ...traveler, isConfirmed: true });
        },
        (err) => {
          props.setAlertVariant("danger");
          props.setAlertHeading("Klaida:");
          props.setAlertMsg(err);
          props.setShowAlert(true);
        }
      );
  };

  return (
    <>
      <Row>
        <Col></Col>
        <Col
          xl={6}
          lg={8}
          sm={10}
          xs={12}
          className="travelerItem text-center p-4"
        >
          {user ? (
            <>
              <Row>
                <Col>
                  <Link to={`/user/${user._id}`} style={{ color: "#000" }}>
                    <h5>
                      {user.name}{" "}
                      <span>
                        {traveler.isConfirmed ? "(patvirtintas}" : ""}
                      </span>
                    </h5>
                  </Link>
                </Col>
                <Col>
                  {traveler.isConfirmed ? (
                    <>
                      <Button
                        variant="danger"
                        block
                        onClick={removeParticipant}
                      >
                        Atšaukti
                      </Button>
                    </>
                  ) : (
                    <>
                      <Row>
                        <Col>
                          <Button
                            variant="success"
                            block
                            onClick={confirmParticipant}
                          >
                            Patvirtinti
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="danger"
                            block
                            onClick={removeParticipant}
                          >
                            Atšaukti
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
