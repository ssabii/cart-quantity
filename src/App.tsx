import { useState } from "react";
import { initialCartItems, CartItem as CartItemData } from "./data/cart";
import CartItem from "./features/cart/CartItem";

import "./App.css";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

function App() {
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialCartItems);
  const isCartEmpty = cartItems.length === 0;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const newCartItems = cartItems.map<CartItemData>((item) => {
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
    const newCartItems = cartItems.map<CartItem>((item) =>
      item.id === id
        ? {
          ...item,
          quantity: Math.max(item.quantity - 1, MIN_QUANTITY),
        }
        : item,
    );

    setCartItems(newCartItems);
  };

  const handleRemoveAll = (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);

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
          <CartItem item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemove} onRemoveAll={handleRemoveAll} />
        ))}

        {/* TODO: 장바구니가 비었을 때 */}
        {isCartEmpty && (
          <div className="empty-cart">
            장바구니가 비었어요. <br />
            상품을 추가해보세요!
          </div>
        )}

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
