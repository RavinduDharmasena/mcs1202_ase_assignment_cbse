import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/payment_logo.jpg';

function Header() {
  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="80"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Payment Gateway
          </Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default Header;