import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from "react-icons/fa";
import { useEffect,useState } from 'react';


function NavBar() {
  const[username,setUsername]=useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('name'));
  }, [localStorage.getItem('token')]);
  
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Notebook-X</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav className="me-right">
            {localStorage.getItem('token') ? (
              <>
<NavDropdown title={<><FaUserCircle/> {username}</>} id="basic-nav-dropdown">
  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
</NavDropdown>

              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
