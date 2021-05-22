import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Register(){
    const [show, setShow] = useState(false);
    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        //TODO: call login service
        setShow(false);
    }

    return (
        <>
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
                <Form.Control type="text" name="name" ref={register} placeholder="Vardas Pavardė"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>El. Paštas</Form.Label>
                <Form.Control type="email" name="email" ref={register} placeholder="el.paštas"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Slaptažodis</Form.Label>
                <Form.Control type="password" name="password" ref={register} placeholder="slaptažodis"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Tel.Nr.</Form.Label>
                <Form.Control type="text" name="phoneNumber" ref={register} placeholder="+37060000000"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Šalis</Form.Label>
                <Form.Control type="text" name="country" ref={register} placeholder="Pasirinkite..."/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Miestas</Form.Label>
                <Form.Control type="text" name="city" ref={register} placeholder="Pasirinkite..."/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Adresas</Form.Label>
                <Form.Control type="text" name="address" ref={register} placeholder=""/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Pašto kodas</Form.Label>
                <Form.Control type="number" name="postalCode" ref={register} placeholder=""/>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" form="RegisterForm" variant="secondary">Registruotis</Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}