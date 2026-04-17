
import { CartItem } from '../data/cart';
import { formatPrice } from '../utill';

export default function CartItemComponent({ item, onQuantityChange, handleRemove }: { item: CartItem, onQuantityChange?: (id: number, newQuantity: number) => void, handleRemove?: (id: number) => void }) {
  function handleDecrease() {
    if (item.quantity > 1 && !item.soldOut) {
      onQuantityChange?.(item.id, item.quantity - 1);
    }
  }

  function handleIncrease() {
    if (item.quantity < 99 && !item.soldOut) {
      onQuantityChange?.(item.id, item.quantity + 1);
    }
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 99 && !item.soldOut) {
      onQuantityChange?.(item.id, newQuantity);
    }
  }

  return  <div key={item.id} className={`cart-item ${item.soldOut ? 'sold-out' : ''}`}>
    <span className='item-name'>{item.name}</span>
    <span className='item-price'>{formatPrice(item.price)}원</span>
    <span className='item-quantity'>수량:
      <button className='quantity-button' onClick={handleDecrease}>
        -
      </button>
      <input className="quantity-input" type="number" value={item.quantity} onChange={handleQuantityChange} />
      <button className='quantity-button' onClick={handleIncrease}>
        +
      </button>
    </span>
    <span className='item-total'>소계: {formatPrice(item.price * item.quantity)}원</span>
    <button className='remove-button' onClick={() => handleRemove?.(item.id)}>
      x
    </button>
  </div>
}