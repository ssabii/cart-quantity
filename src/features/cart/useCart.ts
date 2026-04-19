import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { CartItem, updateQuantity } from '../../data/cart';
import { useShallow } from 'zustand/shallow';

interface CartStore {
  items: CartItem[];
}

const MAX_QUANTITY = 99;

const initialState: CartStore = {
  items: [],
};

const useCartStore = create(
  combine(initialState, (set) => ({
    setItems: (items: CartItem[]) => set({ items }),
    addItem: (item: CartItem) => set(({ items }) => ({ items: [...items, item] })),
    removeItem: (id: number) =>
      set(({ items }) => ({ items: items.filter((item) => item.id !== id) })),
    increaseQuantity: (id: number) =>
      set(({ items }) => ({
        items: items.map<CartItem>((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, MAX_QUANTITY),
              }
            : item,
        ),
      })),
    decreaseQuantity: (id: number) =>
      set(({ items }) => ({
        items: items
          .map<CartItem>((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      })),
    updateQuantity: (id: number, quantity: number) => {
      set(({ items }) => ({
        items: items
          .map<CartItem>((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: quantity,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }));
    },
  })),
);

export const useCartItems = () => useCartStore((store) => store.items);

export const useCartItem = (id: number) =>
  useCartStore((store) => store.items.find((item) => item.id === id));

export const useTotalPrice = () =>
  useCartStore((store) =>
    store.items.filter((item) => !item.soldOut).reduce((acc, item) => acc + item.price, 0),
  );

export const useCartActions = () =>
  useCartStore(
    useShallow((state) => ({
      setItems: state.setItems,
      addItem: state.addItem,
      removeItem: state.removeItem,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
      updateQuantity: state.updateQuantity,
    })),
  );
