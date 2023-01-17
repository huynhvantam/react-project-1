import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../services/UserServie';

function ModalEditUser(props) {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        console.log('%c⧭', 'color: #ffcc00', res);
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id

            })
            handleClose();
            toast.success('Update user succeed')
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    return (
        <>
            <Modal show={show} onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <div className="mb-3">
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
                            </div>

                            {/* <Form.Group className="mb-3" >
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
                            </Form.Group> */}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
