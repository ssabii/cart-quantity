export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  soldOut: boolean;
  imageUrl?: string;
}

export const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: '나이키 에어맥스 90',
    price: 179000,
    quantity: 1,
    soldOut: false,
  },
  {
    id: 2,
    name: '아디다스 울트라부스트 22',
    price: 229000,
    quantity: 2,
    soldOut: false,
  },
  {
    id: 3,
    name: '뉴발란스 993 그레이',
    price: 269000,
    quantity: 1,
    soldOut: true, // 품절 상품
  },
  {
    id: 4,
    name: '컨버스 척테일러 70s',
    price: 95000,
    quantity: 3,
    soldOut: false,
  },
  {
    id: 5,
    name: '반스 올드스쿨',
    price: 79000,
    quantity: 1,
    soldOut: false,
  },
];

/**
 * 수량 업데이트 API (시뮬레이션)
 * 실제로는 서버에 요청을 보내는 부분
 */
export async function updateQuantity(
  itemId: number,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 10% 확률로 실패 시뮬레이션 (낙관적 업데이트 연습용)
  if (Math.random() < 0.1) {
    return { success: true };
  }

  return { success: true };
}

/**
 * 상품 삭제 API (시뮬레이션)
 */
export async function removeItem(
  itemId: number
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true };
}
