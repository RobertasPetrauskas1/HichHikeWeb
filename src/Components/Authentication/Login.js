import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Login(props){
    const [show, setShow] = useState(false);
    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:5000/api/auth/login', requestOptions)
        .then(res => {
            if(res.ok){
                return res.text()
            }else if(res.status === 401){
                throw Error("Blogas prisijungimo vardas / slaptažodis")
            }else{
                throw Error(res.text())
            }
        })
        .then(res =>{
            localStorage.setItem('TOKEN', res)
                props.setAlertVariant('success')
                props.setAlertHeading("Sveiki sugrįže!")
                props.setIsLoggedIn(true)
        }, err => {
            props.setAlertVariant('danger')
            props.setAlertHeading("Klaida:")
            props.setAlertMsg(err)
        })
        setShow(false);
        props.setShowAlert(true)
    }

    return <>
    <Button className="ml-2" variant="secondary" onClick={() => setShow(true)}>Prisijungti</Button>
    <Modal
    show={show}
    onHide={() => setShow(false)}
    dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-custom-modal-styling-title">
        Prisijungti
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit(onSubmit)} id="LoginForm">
        <Form.Group>
            <Form.Label>El. Paštas</Form.Label>
            <Form.Control type="email" {...register('email')} placeholder="el.paštas" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Slaptažodis</Form.Label>
            <Form.Control type="password" {...register('password')} placeholder="slaptažodis" />
        </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button type="submit" form="LoginForm" variant="secondary">Prisijungti</Button>
    </Modal.Footer>
  </Modal>
    </>;
}