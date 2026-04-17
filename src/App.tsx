import { useState } from "react";
import { initialCartItems, CartItem } from "./data/cart";
import "./App.css";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const newCartItems = cartItems.map<CartItem>((item) => {
      const maxQuantity = Math.max(MIN_QUANTITY, newQuantity);
      const quantity = Math.min(maxQuantity, MAX_QUANTITY);

      return item.id === id
        ? {
            ...item,
            quantity,
          }
        : item;
    });

    setCartItems(newCartItems);
  };

  const handleRemove = (id: number) => {
    const newCartItems = cartItems
      .map<CartItem>((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, MIN_QUANTITY),
            }
          : item,
      )
      .filter(Boolean);

    setCartItems(newCartItems);
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
            <button
              onClick={() => handleRemove(item.id)}
              disabled={item.soldOut}
            >
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, Number(e.target.value))
              }
              disabled={item.soldOut}
            />
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              disabled={item.soldOut}
            >
              +
            </button>
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
