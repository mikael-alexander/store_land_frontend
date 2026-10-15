import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import StoreLayout from '../../components/StoreLayout';
import { promotionProducts } from '../../data/products';
import styles from '../../components/StorePages.module.css';

function PromotionsPage() {
  return (
    <StoreLayout>
      <main className={styles.main}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>ESCOLHAS COM DESCONTO</p>
            <h1 className={styles.pageTitle}>Todas as ofertas</h1>
            <p className={styles.subheading}>
              Confira até 10 produtos selecionados em promoção.
            </p>
          </div>
          <Link className={styles.textLink} to="/">Voltar à página inicial</Link>
        </div>
        <section
          aria-label="Produtos em promoção"
          className={styles.promotionsGrid}
          role="region"
        >
          {promotionProducts.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
        <p className={styles.catalogNote}>
          Catálogo demonstrativo: produtos, preços e ofertas são exemplos e
          ainda não vêm do backend.
        </p>
      </main>
    </StoreLayout>
  );
}

export default PromotionsPage;
