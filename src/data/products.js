export const products = [
  {
    id: 'coffee-maker',
    name: 'Cafeteira Compacta',
    category: 'Cozinha',
    emoji: '☕',
    price: 189.9,
    color: 'lavender',
    promotion: { price: 149.9, discount: 21 },
  },
  {
    id: 'headphones',
    name: 'Fone Bluetooth',
    category: 'Eletrônicos',
    emoji: '🎧',
    price: 249.9,
    color: 'peach',
    promotion: { price: 199.9, discount: 20 },
  },
  {
    id: 'backpack',
    name: 'Mochila Urbana',
    category: 'Acessórios',
    emoji: '🎒',
    price: 219.9,
    color: 'mint',
    promotion: { price: 169.9, discount: 23 },
  },
  {
    id: 'smart-lamp',
    name: 'Luminária Smart',
    category: 'Casa',
    emoji: '💡',
    price: 159.9,
    color: 'blue',
    promotion: { price: 119.9, discount: 25 },
  },
  {
    id: 'water-bottle',
    name: 'Garrafa Térmica',
    category: 'Acessórios',
    emoji: '🥤',
    price: 89.9,
    color: 'yellow',
    promotion: { price: 69.9, discount: 22 },
  },
  {
    id: 'speaker',
    name: 'Caixa de Som Mini',
    category: 'Eletrônicos',
    emoji: '🔊',
    price: 199.9,
    color: 'pink',
    promotion: { price: 159.9, discount: 20 },
  },
  {
    id: 'plant-pot',
    name: 'Vaso Decorativo',
    category: 'Casa',
    emoji: '🪴',
    price: 79.9,
    color: 'mint',
  },
  {
    id: 'watch',
    name: 'Relógio Clássico',
    category: 'Acessórios',
    emoji: '⌚',
    price: 299.9,
    color: 'lavender',
  },
  {
    id: 'desk-organizer',
    name: 'Organizador de Mesa',
    category: 'Escritório',
    emoji: '🗂️',
    price: 69.9,
    color: 'peach',
    promotion: { price: 49.9, discount: 29 },
  },
  {
    id: 'wireless-mouse',
    name: 'Mouse sem Fio',
    category: 'Eletrônicos',
    emoji: '🖱️',
    price: 129.9,
    color: 'blue',
    promotion: { price: 99.9, discount: 23 },
  },
  {
    id: 'sunglasses',
    name: 'Óculos de Sol',
    category: 'Acessórios',
    emoji: '🕶️',
    price: 149.9,
    color: 'yellow',
  },
  {
    id: 'keyboard',
    name: 'Teclado Compacto',
    category: 'Eletrônicos',
    emoji: '⌨️',
    price: 279.9,
    color: 'pink',
  },
];

export const promotionProducts = products
  .filter((product) => product.promotion)
  .slice(0, 10);

export function getProductPrice(product) {
  return product.promotion ? product.promotion.price : product.price;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
