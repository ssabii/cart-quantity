import CartSummary from './features/cart/CartSummary';
import CartList from './features/cart/CartList';

import './App.css';

function App() {
  return (
    <div className="app">
      <h1>장바구니</h1>

      <div className="cart-container">
        <CartList />

        <CartSummary />
      </div>
    </div>
  );
}

export default App;
