import CartItem from './features/cart/CartItem';
import { useCartActions, useCartItems, useTotalPrice } from './features/cart/useCart';
import { useEffect } from 'react';
import { initialCartItems } from './data/cart';

import './App.css';

function App() {
  const cartItems = useCartItems();
  const totalPrice = useTotalPrice();
  const { setItems } = useCartActions();
  const isCartEmpty = cartItems.length === 0;

  useEffect(() => {
    setItems(initialCartItems);
  }, []);

  return (
    <div className="app">
      <h1>장바구니</h1>

      <div className="cart-container">
        {cartItems.map((item) => (
          <CartItem key={item.id} id={item.id} />
        ))}

        {isCartEmpty && (
          <div className="empty-cart">
            장바구니가 비었어요. <br />
            상품을 추가해보세요!
          </div>
        )}

        <div className="cart-summary">
          <span>총 금액</span>
          <span>{totalPrice}원</span>
        </div>
      </div>
    </div>
  );
}

export default App;
