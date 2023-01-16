import _, { debounce } from "lodash";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllUse } from "../services/UserServie";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import { CSVLink, CSVDownload } from "react-csv";
import "./TableUser.scss"
import Papa from 'papaparse'
import { toast } from "react-toastify";
function TableUsers() {
  const [listUsers, setListUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)

  const [dataUserEdit, setDataUserEdit] = useState({})
  const [dataUserDelete, setDataUserDelete] = useState({})
  const [dataExport, setDataExport] = useState([])

  const [sortBy, setSortBy] = useState("asc")
  const [sortField, setSortField] = useState("id")


  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers])
  }

  const handleClose = () => {
    setIsShowModalEdit(false)
    setIsShowModalAddNew(false)
    setIsShowModalDelete(false)
  }

  useEffect(() => {
    getUsers(1);
  }, [])

  const getUsers = async (page) => {
    let res = await fetchAllUse(page);
    if (res && res.data) {
      setListUsers(res.data)
      setTotalUsers(res.total)
      setTotalPages(res.total_pages)
    }
  }

  const handlePageClick = (event) => {
    getUsers(event.selected + 1)
  }

  const handleEditUser = (user) => {
    setDataUserEdit(user)
    setIsShowModalEdit(true)
  }

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    let index = listUsers.findIndex(item => item.id === user.id)
    cloneListUsers[index].first_name = user.first_name
    setListUsers(cloneListUsers)
  }

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true)
    setDataUserDelete(user)
  }

  const handleDeleteUserFrom = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setListUsers(cloneListUsers)
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)

    let cloneListUsers = _.cloneDeep(listUsers)
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
    setListUsers(cloneListUsers)
  }

  const handleSearch = debounce((event) => {
    let term = event.target.value
    console.log("%c⧭", "color: #994d75", term);
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers)
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
      setListUsers(cloneListUsers)

    } else {
      getUsers(1);
    }
  }, 1000)


  const getUsersExport = (event, done) => {
    let result = []
    if (listUsers && listUsers.length > 0) {
      result.push(["email", "first_name", "last_name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.email
        arr[1] = item.first_name
        arr[2] = item.last_name
        result.push(arr)
      })
      setDataExport(result)
      done()
    }
  }

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0]
      if (file.type !== "text/csv") {
        toast.error('Only accept csv file')
        return;
      }
      Papa.parse(file, {
        //header: true
        complete: function (results) {
          let rawCSV = results.data
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (rawCSV[0][0] !== "email"
                || rawCSV[0][1] !== "first_name"
                || rawCSV[0][2] !== "last_name"
              ) {
                toast.error("wrong fomat header csv file")
              } else {
                let result = []
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {}
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj)
                  }
                })
                setListUsers(result)
              }
            } else {
              toast.error("Not found data on CSV file!")
            }
          } else
            toast.error("Not found data on CSV file!")
        }
      }
      )

    }


  }

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span className="fw-bold">List user:</span>
        <div className="group-btns">
          <label htmlFor="test" className="btn btn-secondary mx-3">
            <i className="fa-solid fa-file-import"></i> &nbsp;
            Import</label>
          <input type="file" id="test" hidden
            onChange={(event) => handleImportCSV(event)}
          />
          <CSVLink
            filename={"user.csv"}
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-download"></i>&nbsp;
            Export</CSVLink>
          <button className="btn btn-success mx-3"
            onClick={() => setIsShowModalAddNew(true)}>
            <i className="fa-solid fa-plus"></i>&nbsp;
            Add New User
          </button>
        </div>
      </div>
      <div className="col-6 my-3">
        <input
          type="text"
          className="form-control "
          placeholder="Search user by email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i className="fa-sharp fa-solid fa-arrow-down"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                  <i className="fa-sharp fa-solid fa-arrow-up"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th> <div className="sort-header">
              <span>First Name</span>
              <span>
                <i className="fa-sharp fa-solid fa-arrow-down"
                  onClick={() => handleSort("acs", "first_name")}
                ></i>
                <i className="fa-sharp fa-solid fa-arrow-up"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
              </span>
            </div></th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >Edit</button>
                    <button className="btn btn-danger mx-3"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"

        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFrom={handleDeleteUserFrom}
      />
    </>)
}

export default TableUsers;