import { useState } from "react";
import { initialCartItems, CartItem } from "./data/cart";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // TODO: 수량 변경 핸들러
  const handleQuantityChange = (id: number, newQuantity: number) => {
    console.log("수량 변경:", id, newQuantity);
  };

  // TODO: 상품 삭제 핸들러
  const handleRemove = (id: number) => {
    console.log("상품 삭제:", id);
  };

  // TODO: 총 금액 계산 (품절 상품 제외)
  const totalPrice = cartItems
    .filter((item) => !item.soldOut)
    .reduce((acc, item) => {
      const itemPrice = item.quantity * item.price;
      return acc + itemPrice;
    }, 0);

  return (
    <div className="app">
      <h1>장바구니</h1>

      <div className="cart-container">
        {/* TODO: 장바구니 아이템 목록 */}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>{item.price}원</span>
            <span>수량: {item.quantity}</span>
            <span>{item.quantity * item.price}원</span>
            <button>-</button>
            <input type="number" value={item.quantity} />
            <button>+</button>
          </div>
        ))}

        {/* TODO: 장바구니가 비었을 때 */}

        {/* TODO: 총 금액 */}
        <div className="cart-summary">
          <span>총 금액</span>
          <span>{totalPrice}원</span>
        </div>
      </div>
    </div>
  );
}

export default App;
