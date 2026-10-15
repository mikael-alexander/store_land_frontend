import { Link } from 'react-router-dom';
import StoreLayout from '../../components/StoreLayout';
import { useCart } from '../../context/CartContext';
import { formatPrice, getProductPrice } from '../../data/products';
import styles from '../../components/StorePages.module.css';

function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const total = items.reduce(
    (sum, item) => sum + getProductPrice(item) * item.quantity,
    0
  );

  return (
    <StoreLayout>
      <main className={styles.main}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>SUAS ESCOLHAS</p>
            <h1 className={styles.pageTitle}>Carrinho de compras</h1>
            <p className={styles.subheading}>
              {items.reduce((count, item) => count + item.quantity, 0)} itens no carrinho.
            </p>
          </div>
          <Link className={styles.textLink} to="/">Continuar comprando</Link>
        </div>

        {items.length === 0 ? (
          <section className={styles.emptyState}>
            <span aria-hidden="true">🛒</span>
            <h2>Seu carrinho está vazio</h2>
            <p>Explore a loja e adicione seus produtos favoritos.</p>
            <Link className={styles.viewAllButton} to="/">Explorar produtos</Link>
          </section>
        ) : (
          <div className={styles.cartLayout}>
            <section aria-label="Itens no carrinho" className={styles.cartItems}>
              {items.map((item) => (
                <article className={styles.cartItem} key={item.id}>
                  <div className={`${styles.cartArt} ${styles[item.color]}`} aria-hidden="true">
                    {item.emoji}
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(getProductPrice(item))} cada</p>
                    <div className={styles.quantityControls}>
                      <button
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        type="button"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.cartItemTotal}>
                    <strong>{formatPrice(getProductPrice(item) * item.quantity)}</strong>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id)}
                      type="button"
                    >
                      Remover
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside aria-label="Resumo do pedido" className={styles.summary}>
              <h2>Resumo do pedido</h2>
              <div className={styles.summaryLine}>
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Frete</span>
                <span>A calcular</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total parcial</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className={styles.catalogNote}>
                Checkout ainda não está integrado.
              </p>
            </aside>
          </div>
        )}
      </main>
    </StoreLayout>
  );
}

export default CartPage;
