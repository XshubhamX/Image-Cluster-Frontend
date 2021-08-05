import React from "react"
import { Form, Button } from "react-bootstrap"


const UniversalForm = (props) => {
    return (
        <React.Fragment>
            <Form onSubmit={props.upload} >
                <Form.Group controlId="file" className="mb-3">
                    <Form.Label>Select File </Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="keywords">
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control type="text" placeholder="Add Relevant Keywords" />
                </Form.Group>

                {/* <Form.Group controlId="type" className="mb-3">
                    <Form.Select aria-label="Floating label select example">
                        <option value="image">Image</option>
                        <option value="vector">Vector</option>
                        <option value="illustration">Illustration</option>
                    </Form.Select>
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default UniversalForm