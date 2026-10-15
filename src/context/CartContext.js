import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, quantity) {
    setItems((currentItems) =>
      quantity < 1
        ? currentItems.filter((item) => item.id !== productId)
        : currentItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
    );
  }

  function removeItem(productId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart precisa ser usado dentro de CartProvider.');
  }
  return context;
}
