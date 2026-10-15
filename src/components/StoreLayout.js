import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import styles from './StoreLayout.module.css';

function StoreLayout({ children }) {
  const { itemCount } = useCart();

  return (
    <div className={styles.store}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            aria-label="Store Land - página inicial"
            className={styles.brand}
            to="/"
          >
            <span className={styles.brandMark} aria-hidden="true">S</span>
            <span>store<span className={styles.brandAccent}>land</span></span>
          </Link>

          <nav aria-label="Menu principal" className={styles.navigation}>
            <Link className={styles.navLink} to="/">Início</Link>
            <Link className={styles.navLink} to="/promocoes">Ofertas</Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.loginLink} to="/login">Entrar</Link>
            <Link className={styles.signupLink} to="/cadastro">Criar conta</Link>
            <ThemeToggle />
            <Link
              aria-label={`Carrinho de compras, ${itemCount} itens`}
              className={styles.cartLink}
              to="/carrinho"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L22 8H6" />
                <circle cx="10" cy="20" r="1.3" />
                <circle cx="18" cy="20" r="1.3" />
              </svg>
              <span className={styles.cartCount}>{itemCount}</span>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <span className={styles.footerBrand}>store<span>land</span></span>
        <span>Boas escolhas, todos os dias.</span>
      </footer>
    </div>
  );
}

export default StoreLayout;
