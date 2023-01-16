import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete } = props;

    const confirmDelete = () => {

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            This action can't be undone!
                            Do want to delete this user?<br />
                            Emai="<b>{dataUserDelete.email}</b>"
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
