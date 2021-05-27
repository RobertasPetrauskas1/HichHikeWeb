import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register(props) {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (d) => {
      const request = {
          name: d.name,
          email: d.email,
          password: d.password,
          phoneNumber: d.phoneNumber,
          country: {
              name: d.country
          },
          city: {
              name: d.city
          },
          address: d.address,
          postalCode: d.postalCode
      }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    };

    fetch("http://localhost:5000/api/auth/register", requestOptions)
      .then((res) => res.text())
      .then(
        (result) => {
          if (result === "Success") {
            props.setAlertVariant("success");
            props.setAlertHeading(
              "Sėkmingai užsiregistravote. Dabar prisijunkite."
            );
            props.setShowAlert(true);
          }
        },
        (error) => {
          props.setAlertVariant("danger");
          props.setAlertHeading("Klaida:");
          props.setAlertMsg(error);
          props.setShowAlert(true);
        }
      );
    setShow(false);
    props.setShowAlert(true);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)}>
        Registruotis
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Registruotis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="RegisterForm">
            <Form.Group>
              <Form.Label>Vardas Pavardė</Form.Label>
              <Form.Control
                type="text"
                {...register("name", {
                  required: "Įveskite savo vardą",
                })}
                placeholder="vardas pavardė"
              />
              {errors.name && (
                <>
                  <span className="text-danger">{errors.name.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>El. Paštas</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "Įveskite El.paštą",
                })}
                placeholder="el.paštas"
              />
              {errors.email && (
                <>
                  <span className="text-danger">{errors.email.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Slaptažodis</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Įveskite slaptažodį",
                })}
                placeholder="slaptažodis"
              />
              {errors.password && (
                <>
                  <span className="text-danger">{errors.password.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Tel.Nr.</Form.Label>
              <Form.Control
                type="text"
                {...register("phoneNumber", {
                  required: "Įveskite tel nr.",
                })}
                placeholder="+37060000000"
              />
              {errors.phoneNumber && (
                <>
                  <span className="text-danger">
                    {errors.phoneNumber.message}
                  </span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Šalis</Form.Label>
              <Form.Control
                type="text"
                placeholder="šalis"
                {...register("country", {
                  required: "Įveskite šalį",
                })}
              />
              {errors.country && (
                <>
                  <span className="text-danger">{errors.country.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Miestas</Form.Label>
              <Form.Control
                type="text"
                placeholder="miestas"
                {...register("city", {
                  required: "Įveskite miestą",
                })}
              />
              {errors.city && (
                <>
                  <span className="text-danger">{errors.city.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresas</Form.Label>
              <Form.Control
                type="text"
                {...register("address", {
                  required: "Įveskite adresą",
                })}
                placeholder="adresas"
              />
              {errors.address && (
                <>
                  <span className="text-danger">{errors.address.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Pašto kodas</Form.Label>
              <Form.Control
                type="text"
                {...register("postalCode", {
                  required: "Įveskite pašto kodą",
                  pattern: {
                    value: /\w{2}-\d{5}/,
                    message: "Netinkamas formatas",
                  },
                  maxLength: {
                      value: 8,
                      message: "Netinkamas formatas"
                  },
                  minLength: {
                    value: 8,
                    message: "Netinkamas formatas"
                }
                })}
                placeholder="LT-00000"
              />
              {errors.postalCode && (
                <>
                  <span className="text-danger">
                    {errors.postalCode.message}
                  </span>
                </>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="RegisterForm" variant="secondary">
            Registruotis
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
