import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";
function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between">
          <span className="fw-bold">List user:</span>
          <button className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}>Add New User</button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
      />
    </div>
  )
}

export default App;
