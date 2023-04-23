import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import { useEffect, useState } from 'react';
import { ShopContext } from './ShopContext';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderFailurePage from './pages/OrderFailurePage';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  const shopContextValues = { items: items, show: show, setShow: setShow, setItems: setItems, otherExpenses: [] }

  return (
    <ShopContext.Provider value={shopContextValues}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/summary' element={<OrderSummaryPage />} />
          <Route path='/order_complete' element={<OrderSuccessPage />} />
          <Route path='/order_failure' element={<OrderFailurePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ShopContext.Provider>
  );
}

export default App;
