import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import { Link } from 'react-router-dom';

function Header(props) {
  const shopContext = useContext(ShopContext);

  const cartWidget = (props.showCart) ? <div style={{ marginRight: '1rem', position: 'relative', cursor: 'pointer' }} onClick={() => { shopContext.setShow(true) }}>
    <img src={cart} alt='cart' />
    <Badge bg='success' style={{ position: 'absolute', left: '60%', top: '10%' }}>{shopContext.items.length}</Badge>
  </div> : null;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Herbal Shop
        </Navbar.Brand>
      </Container>
      {cartWidget}
    </Navbar>
  );
}

export default Header;