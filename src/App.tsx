import { useEffect, useState } from 'react';
import './App.css';
import CartItemComponent from './components/CartItem';
import CartSummary from './components/CartSummary';
import { CartItem, initialCartItems } from './data/cart';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // TODO: 수량 변경 핸들러
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateTotalPrice = () => {
    const total: number = cartItems
      .filter((item: CartItem) => !item.soldOut)
      .reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }

  const handleRemove = (id: number) => {
    setCartItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.id !== id));
    updateTotalPrice();
  };

  const handleClearCart = () => {
    setCartItems([]);
  }

  useEffect(() => {
    updateTotalPrice();
  }, [cartItems]);


  return (
    <div className="app">
      <h1>장바구니</h1>

      <div className="cart-actions">
        <button onClick={handleClearCart}>전체 삭제</button>
      </div>

      <div className="cart-container">
        {/* TODO: 장바구니 아이템 목록 */}
        {cartItems.map((item) => (
          <CartItemComponent key={item.id} item={item} onQuantityChange={handleQuantityChange} handleRemove={handleRemove}/>
        ))}

        {/* TODO: 장바구니가 비었을 때 */}
        {cartItems.length === 0 && <div className="empty-cart">장바구니가 비었습니다.</div>}

        {/* TODO: 총 금액 */}
        <CartSummary totalPrice={totalPrice} />
      </div>
    </div>
  );
}

export default App;
