import { formatPrice, getProductPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import styles from './StorePages.module.css';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = getProductPrice(product);

  return (
    <article className={styles.productCard}>
      <div className={`${styles.productArt} ${styles[product.color]}`}>
        {product.promotion && (
          <span className={styles.discountBadge}>
            -{product.promotion.discount}%
          </span>
        )}
        <span aria-hidden="true" className={styles.productEmoji}>
          {product.emoji}
        </span>
      </div>
      <div className={styles.productInfo}>
        <span className={styles.productCategory}>{product.category}</span>
        <h3>{product.name}</h3>
        <div className={styles.priceRow}>
          <strong>{formatPrice(price)}</strong>
          {product.promotion && (
            <del>{formatPrice(product.price)}</del>
          )}
        </div>
        <button
          className={styles.addButton}
          onClick={() => addItem(product)}
          type="button"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
