import { CartItem as CartItemData } from "../../data/cart";

interface CartItemProps {
  item: CartItemData;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  onRemoveAll?: (id: number) => void;
}

function CartItem({ item, onQuantityChange, onRemove, onRemoveAll }: CartItemProps) {
  return (<div
    key={item.id}
    className={item.soldOut ? "cart-item sold-out" : "cart-item"}
  >
    <span>{item.name}</span>
    <span>{item.price}원</span>
    <span>수량: {item.quantity}</span>
    <span>{item.quantity * item.price}원</span>
    <div className="quantity-control">
      <button
        onClick={() => onRemove?.(item.id)}
        className="quantity-button"
        disabled={item.soldOut}
      >
        -
      </button>
      <input
        className="quantity-input"
        type="number"
        value={item.quantity}
        disabled={item.soldOut}
        onChange={(e) => onQuantityChange?.(item.id, Number(e.target.value))}
      />
      <button
        disabled={item.soldOut}
        className="quantity-button"
        onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
      >
        +
      </button>
      <button
        className="remove-button"
        onClick={() => onRemoveAll?.(item.id)}
      >
        삭제
      </button>
    </div>
  </div>
  )
}

export default CartItem;
