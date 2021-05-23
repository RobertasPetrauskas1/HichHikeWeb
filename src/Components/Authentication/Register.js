import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Register(props){
    const [show, setShow] = useState(false);
    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:5000/api/auth/register', requestOptions)
        .then(res => res.text())
        .then(
            (result) => {
                if(result === "Success"){
                    props.setAlertVariant('success')
                    props.setAlertHeading("Sėkmingai užsiregistravote. Dabar prisijunkite.")
                    props.setShowAlert(true)
                }
            },
            (error) =>{ 
                props.setAlertVariant('danger')
                props.setAlertHeading("Klaida:")
                props.setAlertMsg(error)
                props.setShowAlert(true)
            }
        )
        setShow(false);
        props.setShowAlert(true)
    }

    return <>
    <Button variant="secondary" onClick={() => setShow(true)}>Registruotis</Button>
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
            <Form.Control type="text" {...register('name')} placeholder="Vardas Pavardė" />
        </Form.Group>
        <Form.Group>
            <Form.Label>El. Paštas</Form.Label>
            <Form.Control type="email" {...register('email')} placeholder="el.paštas" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Slaptažodis</Form.Label>
            <Form.Control type="password" {...register('password')} placeholder="slaptažodis" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Tel.Nr.</Form.Label>
            <Form.Control type="text" {...register('phoneNumber')} placeholder="+37060000000" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Šalis</Form.Label>
            <Form.Control type="text" {...register('country')} placeholder="Pasirinkite..." />
        </Form.Group>
        <Form.Group>
            <Form.Label>Miestas</Form.Label>
            <Form.Control type="text" {...register('city')} placeholder="Pasirinkite..." />
        </Form.Group>
        <Form.Group>
            <Form.Label>Adresas</Form.Label>
            <Form.Control type="text" {...register('address')} placeholder="" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Pašto kodas</Form.Label>
            <Form.Control type="number" {...register('postalCode')} placeholder="" />
        </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button type="submit" form="RegisterForm" variant="secondary">Registruotis</Button>
    </Modal.Footer>
  </Modal>
    </>;
}