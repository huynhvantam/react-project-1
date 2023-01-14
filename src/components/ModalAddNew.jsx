import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { postCreateUser } from '../services/UserServie'
import { toast } from 'react-toastify';

function ModalAddNew(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job)
    if (res && res.id) {
      handleClose()
      setName('')
      setJob('')
      toast.success("A user is created succeed")
      handleUpdateTable({ first_name: name, id: res.id })
    } else {
      toast.error('An erorr...')
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div>
              {/* <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />

              </div>
              <div className="mb-3">
                <label className="form-label">Job</label>
                <input type="text" className="form-control"
                  value={job}
                  onChange={(event) => setJob(event.target.value)}
                />
              </div> */}

              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Job</Form.Label>
                <Form.Control type="text"
                  value={job}
                  onChange={(event) => setJob(event.target.value)}
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
