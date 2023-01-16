import _ from 'lodash';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllUse } from '../services/UserServie';
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
function TableUsers() {
  const [listUsers, setListUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)

  const [dataUserEdit, setDataUserEdit] = useState({})
  const [dataUserDelete, setDataUserDelete] = useState({})

  const [sortBy, setSortBy] = useState('asc')
  const [sortField, setSortField] = useState('id')

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
  }
  console.log('%c⧭', 'color: #00ff88', sortBy, sortField);


  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span className="fw-bold">List user:</span>
        <button className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}>Add New User</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i className="fa-sharp fa-solid fa-arrow-down"
                    onClick={() => handleSort('desc', 'id')}
                  ></i>
                  <i className="fa-sharp fa-solid fa-arrow-up"
                    onClick={() => handleSort('asc', 'id')}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th> <div className="sort-header">
              <span>First Name</span>
              <span>
                <i className="fa-sharp fa-solid fa-arrow-down"
                  onClick={() => handleSort('desc', 'firs_name')}
                ></i>
                <i className="fa-sharp fa-solid fa-arrow-up"
                  onClick={() => handleSort('asc', 'firs_name')}
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
                    <button className='btn btn-warning mx-3'
                      onClick={() => handleEditUser(item)}
                    >Edit</button>
                    <button className='btn btn-danger mx-3'
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