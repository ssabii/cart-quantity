import { ChangeEvent, KeyboardEvent, memo, useEffect, useState } from 'react';
import { MAX_QUANTITY, useCartActions, useCartItem } from './useCart';

interface CartItemProps {
  id: number;
}

function CartItem({ id }: CartItemProps) {
  const item = useCartItem(id);
  const { removeItem, increaseQuantity, decreaseQuantity, updateQuantity } = useCartActions();
  const [input, setInput] = useState('');

  useEffect(() => {
    if (item?.quantity) {
      setInput(item.quantity.toString());
    }
  }, [item?.quantity]);

  if (!item) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const replacedValue = value.replace(/\D/g, '');

    setInput(replacedValue);
  };

  const commitQuantity = () => {
    const quantity = Number(input);

    if (quantity) {
      updateQuantity(id, quantity);
    } else {
      setInput('1');
    }
  };

  const handleBlur = () => {
    commitQuantity();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitQuantity();
  };

  return (
    <div key={item.id} className={item.soldOut ? 'cart-item sold-out' : 'cart-item'}>
      <span>{item.name}</span>
      <span>{item.price}원</span>
      <span>수량: {item.quantity}</span>
      <span>{item.quantity * item.price}원</span>
      <div className="quantity-control">
        <button
          onClick={() => decreaseQuantity(id)}
          className="quantity-button"
          disabled={item.soldOut || item.quantity === 1}
        >
          -
        </button>

        <input
          className="quantity-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={input}
          disabled={item.soldOut}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <button
          disabled={item.soldOut || item.quantity === MAX_QUANTITY}
          className="quantity-button"
          onClick={() => increaseQuantity(id)}
        >
          +
        </button>
        <button className="remove-button" onClick={() => removeItem(id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default memo(CartItem);
