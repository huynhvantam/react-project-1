import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logoApp from '../asssets/images/logo192.png'
import { NavLink } from 'react-router-dom'

function Header() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">              <img src={logoApp} alt="React App"
          className='d-inline-block align-top'
          width='30' height='30' />React-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Manage Users</NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item >
                <NavLink to="/login">Login</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <NavLink to="/logout">Logout</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
