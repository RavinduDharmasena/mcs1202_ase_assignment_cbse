import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShopContext } from '../ShopContext';
import './utilities.css';
import './CartModal.css';
import { useNavigate } from 'react-router-dom';
import CartTable from './CartTable';

function CartModal(props) {
  const shopContext = useContext(ShopContext);
  const navigate = useNavigate();
  const [shouldRender,setShouldRender] = useState(false);

  const goToPayments = () => {
    navigate("/summary");
  }

  useEffect(() => {
    if(shouldRender){
      setShouldRender(false);
    }
  }, [shouldRender]);

  let modalBody = null;
  if(props.body){
    modalBody = props.body;
  }
  else{
    modalBody = (shopContext.items.length > 0) ? <CartTable showOtherExpenses={false} setShouldRender={setShouldRender}/> : <p>No Items Added to the Cart</p>
  }

  return (
    <Modal show={shopContext.show} onHide={() => { shopContext.setShow(false) }}>
      <Modal.Header closeButton>
        <Modal.Title className='uppercase'>Item Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { shopContext.setShow(false) }}>
          <span className='uppercase'>Close</span>
        </Button>
        <Button variant="primary" onClick={() => { shopContext.setShow(false) }}>
          <span className='uppercase' onClick={goToPayments}>Pay Now</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;