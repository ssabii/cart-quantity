export default function CartSummary({ totalPrice }: { totalPrice: number }) {
  return <div className="cart-summary">
    <span>총 금액</span>
    <span>{totalPrice.toLocaleString()}원</span>
  </div>
}