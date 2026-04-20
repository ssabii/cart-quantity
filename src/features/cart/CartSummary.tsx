import { formatPrice } from './format';
import { useTotalPrice } from './useCart';

function CartSummary() {
  const totalPrice = useTotalPrice();

  return (
    <div className="cart-summary">
      <span>총 금액</span>
      <span>{formatPrice(totalPrice)}</span>
    </div>
  );
}

export default CartSummary;
