import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

export default function TripForm(props) {
  const [countries, setCountries] = useState([]);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);

  const history = useHistory()

  const [fromCountrySelection, setFromCountrySelection] = useState();
  const [toCountrySelection, setToCountrySelection] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("http://localhost:5000/api/util/country")
      .then((res) => res.json())
      .then((res) => setCountries(res));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/util/city/country/${fromCountrySelection}`)
      .then((res) => res.json())
      .then((res) => setFromCities(res));
  }, [fromCountrySelection]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/util/city/country/${toCountrySelection}`)
      .then((res) => res.json())
      .then((res) => setToCities(res));
  }, [toCountrySelection]);

  const onFromCountryChange = (event) => {
    setFromCountrySelection(event.target.value);
  };

  const onToCountryChange = (event) => {
    setToCountrySelection(event.target.value);
  };

  const onFormSubmit = (values) => {
    const request = {
      availableSeatCount: values.seatCount,
      destinationFrom: {
        country: {
          id: values.fromCountry,
        },
        city: {
          id: values.fromCity,
          countryId: values.fromCountry,
        },
        address: values.fromAddress,
      },
      destinationTo: {
        country: {
          id: values.toCountry,
        },
        city: {
          id: values.toCity,
          countryId: values.toCountry,
        },
        address: values.toAddress,
      },
      date: values.date,
      time: values.time,
      description: values.description,
    };

    fetch("http://localhost:5000/api/trip", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("TOKEN"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => {
        if (res.ok) {
          return "Kėlionė sėkmingai sukurta!";
        } else if (res.status === 401) {
          localStorage.removeItem("TOKEN")
          throw Error("Jūsų sesija pasibaigė. Prisijunkite ir bandykite dar kartą");
        } else {
          throw Error(res.text());
        }
      })
      .then(
        (res) => {
          props.setAlertVariant("success");
          props.setAlertHeading(res);
        },
        (err) => {
          props.setAlertVariant("danger");
          props.setAlertHeading("Klaida:");
          props.setAlertMsg(err);
        }
      );
    props.setShowAlert(true);
    history.push("/")
    history.go(0)
  };

  var fromCountry = register("fromCountry", {
    required: "Pasirinkite šalį",
    validate: (val) => val !== "" || "Pasirinkite šalį",
  });

  var toCountry = register("toCountry", {
    required: "Pasirinkite šalį",
  });

  return (
    <>
      <div className="pt-5">
        <Container fluid>
          <Row>
            <Col></Col>
            <Col xl={6} lg={8} sm={10} xs={12} className="form">
              <Form className="m-3" onSubmit={handleSubmit(onFormSubmit)}>
                <Row>
                  <h5>Kelionė iš:</h5>
                </Row>
                <Row className="pt-2">
                  <Col>
                    <Form.Group controlId="fromCountry">
                      <Form.Label>Šalis</Form.Label>
                      <Form.Control
                        as="select"
                        name="fromCountry"
                        onChange={(e) => {
                          fromCountry.onChange(e);
                          onFromCountryChange(e);
                        }}
                        onBlur={fromCountry.onBlur}
                        ref={fromCountry.ref}
                      >
                        <option value="">Pasirinkite...</option>
                        {countries.map((country) => {
                          return (
                            <option value={country?._id} key={country?._id}>
                              {country?.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                      {errors.fromCountry && (
                        <>
                          <span className="text-danger">
                            {errors.fromCountry.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="fromCity">
                      <Form.Label>Miestas</Form.Label>
                      <Form.Control
                        as="select"
                        {...register("fromCity", {
                          required: "Pasirinkite miestą",
                        })}
                      >
                        <option value="">Pasirinkite...</option>
                        {fromCities.map((city) => {
                          return (
                            <option value={city?._id} key={city?._id}>
                              {city?.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                      {errors.fromCity && (
                        <>
                          <span className="text-danger">
                            {errors.fromCity.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="fromAddress">
                      <Form.Label>Adresas</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Adresas"
                        {...register("fromAddress", {
                          required: "Įveskite adresą",
                        })}
                      />
                      {errors.fromAddress && (
                        <>
                          <span className="text-danger">
                            {errors.fromAddress.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row className="pt-2">
                  <h5>Kelionė į:</h5>
                </Row>
                <Row className="pt-2">
                  <Col>
                    <Form.Group controlId="toCountry">
                      <Form.Label>Šalis</Form.Label>
                      <Form.Control
                        as="select"
                        name="toCountry"
                        onChange={(e) => {
                          toCountry.onChange(e);
                          onToCountryChange(e);
                        }}
                        onBlur={toCountry.onBlur}
                        ref={toCountry.ref}
                      >
                        <option value="">Pasirinkite...</option>
                        {countries.map((country) => {
                          return (
                            <option value={country?._id} key={country?._id}>
                              {country?.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                      {errors.toCountry && (
                        <>
                          <span className="text-danger">
                            {errors.toCountry.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="toCity">
                      <Form.Label>Miestas</Form.Label>
                      <Form.Control
                        as="select"
                        {...register("toCity", {
                          required: "Pasirinkite miestą",
                        })}
                      >
                        <option value="">Pasirinkite...</option>
                        {toCities.map((city) => {
                          return (
                            <option value={city?._id} key={city?._id}>
                              {city?.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                      {errors.toCity && (
                        <>
                          <span className="text-danger">
                            {errors.toCity.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="fromAddress">
                      <Form.Label>Adresas</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Adresas"
                        {...register("toAddress", {
                          required: "Įveskite adresą",
                        })}
                      />
                      {errors.toAddress && (
                        <>
                          <span className="text-danger">
                            {errors.toAddress.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row className="pt-2">
                  <h5>Informacija apie kelionę:</h5>
                </Row>
                <Row className="pt-2">
                  <Col>
                    <Form.Group controlId="time">
                      <Form.Label>Išvykimo data</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        {...register("date", {
                          required: "Pasirinkite datą",
                          //validate: val => val <= new Date() || "Praeities datos negalimos"
                        })}
                      />
                      {errors.date && (
                        <>
                          <span className="text-danger">
                            {errors.date.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="time">
                      <Form.Label>Numatomas išvykimo laikas</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Numatomas laikas"
                        {...register("time", {
                          required: "Įveskite laiką",
                        })}
                      />
                      {errors.time && (
                        <>
                          <span className="text-danger">
                            {errors.time.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="seatCount">
                      <Form.Label>Laisvų vietų skaičius</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        {...register("seatCount", {
                          required: "Įveskite vietų skaičių",
                          validate: (val) =>
                            val > 0 || "Vietų skaičius turi būti didesnis už 0",
                        })}
                      />
                      {errors.seatCount && (
                        <>
                          <span className="text-danger">
                            {errors.seatCount.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>
                        Kelionės aprašymas / papildoma informacija keliautojams
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        {...register("description", {
                          required: "Aprašykite savo kelionę",
                        })}
                      />
                      {errors.description && (
                        <>
                          <span className="text-danger">
                            {errors.description.message}
                          </span>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col></Col>
                  <Col>
                    <Button block size="lg" variant="secondary" type="submit">
                      Kurti kelionę!
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
