import { useEffect } from 'react';
import { useCartActions, useCartItems } from './useCart';
import { initialCartItems } from '../../data/cart';
import CartItem from './CartItem';

function CartList() {
  const cartItems = useCartItems();
  const { setItems } = useCartActions();
  const isCartEmpty = cartItems.length === 0;

  useEffect(() => {
    setItems(initialCartItems);
  }, []);

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.id} id={item.id} />
      ))}

      {isCartEmpty && (
        <div className="empty-cart">
          장바구니가 비었어요. <br />
          상품을 추가해보세요!
        </div>
      )}
    </div>
  );
}

export default CartList;
