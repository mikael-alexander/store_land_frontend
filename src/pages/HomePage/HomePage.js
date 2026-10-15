import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import StoreLayout from '../../components/StoreLayout';
import { products, promotionProducts } from '../../data/products';
import styles from '../../components/StorePages.module.css';

function HomePage() {
  const carouselRef = useRef(null);

  const moveCarousel = useCallback((direction) => {
    const track = carouselRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const amount = card ? card.getBoundingClientRect().width + 16 : 250;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const track = carouselRef.current;
      if (!track) return;

      const reachedEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (reachedEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        moveCarousel(1);
      }
    }, 4500);
    return () => window.clearInterval(timer);
  }, [moveCarousel]);

  return (
    <StoreLayout>
      <main className={styles.main}>
        <section aria-labelledby="welcome-title" className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>SUA LOJA, SUAS ESCOLHAS</p>
            <h1 className={styles.pageTitle} id="welcome-title">
              Encontre algo que combina com você.
            </h1>
            <p className={styles.subheading}>
              Produtos selecionados para deixar sua rotina ainda melhor.
            </p>
          </div>
        </section>

        <section aria-labelledby="carousel-title" className={styles.carouselShell}>
          <div className={styles.carouselHeader}>
            <h2 id="carousel-title">Descubra nossos produtos</h2>
            <div className={styles.carouselControls}>
              <button
                aria-label="Produtos anteriores"
                className={styles.carouselButton}
                onClick={() => moveCarousel(-1)}
                type="button"
              >
                ‹
              </button>
              <button
                aria-label="Próximos produtos"
                className={styles.carouselButton}
                onClick={() => moveCarousel(1)}
                type="button"
              >
                ›
              </button>
            </div>
          </div>
          <div
            aria-label="Carrossel de produtos"
            className={styles.carouselTrack}
            ref={carouselRef}
            role="region"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section aria-labelledby="promotions-title" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="promotions-title">Ofertas para aproveitar</h2>
              <p>Descontos especiais por tempo limitado.</p>
            </div>
            <Link className={styles.textLink} to="/promocoes">
              Ver todas
            </Link>
          </div>
          <div
            aria-label="Produtos em promoção"
            className={styles.promotionsGrid}
            role="region"
          >
            {promotionProducts.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.viewAllWrap}>
            <Link className={styles.viewAllButton} to="/promocoes">
              Ver todas as ofertas
            </Link>
          </div>
        </section>

        <p className={styles.catalogNote}>
          Catálogo demonstrativo: produtos, preços e ofertas são exemplos e
          ainda não vêm do backend.
        </p>
      </main>
    </StoreLayout>
  );
}

export default HomePage;
