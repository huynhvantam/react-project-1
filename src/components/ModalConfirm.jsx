import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserServie";
import { toast } from 'react-toastify'
function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserFrom } = props;

    const confirmDelete = async (id) => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            toast.success("Delete user succeed!")
            handleClose();
            handleDeleteUserFrom(dataUserDelete)
        } else {
            toast.error("Delete user error!")
        }

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
