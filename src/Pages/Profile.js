import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserTrips from "./UsersTrips";
import { useParams } from "react-router";

export default function Profile(props) {
  const [user, setUser] = useState();
  const { id } = useParams();
  useEffect(() => {
    var userId;
    if (props.id) {
      userId = props.id;
    } else {
      userId = id;
    }

    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid className="pt-5">
        <div>
          {user ? (
            <>
              <Row>
                <Col></Col>
                <Col xl={6} lg={8} sm={10} xs={12} className="mb-3 p-3 profile">
                  <Row>
                    <Col>
                      <strong>Vardas: </strong>
                      <br />
                      <span>{user.name}</span>
                    </Col>
                    <Col>
                      <strong>Šalis: </strong>
                      <br />
                      <span>{user.country.name}</span>
                    </Col>
                    <Col></Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <strong>El. Paštas: </strong>
                      <br />
                      <span>{user.email}</span>
                    </Col>
                    <Col>
                      <strong>Miestas: </strong>
                      <br />
                      <span>{user.city.name}</span>
                    </Col>
                    <Col></Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <strong>Tel.Nr: </strong>
                      <br />
                      <span>{user.phoneNumber}</span>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </>
          ) : (
            <>Kraunama...</>
          )}
        </div>
      </Container>
      <Container fluid>
        <UserTrips id={props.id || id} />
      </Container>
    </>
  );
}
