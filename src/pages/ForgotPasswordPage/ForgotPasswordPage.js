import { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../../services/authApi';
import styles from '../AuthPages.module.css';

function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setMessage('');
    try {
      const result = await requestPasswordReset({
        email: formData.get('email'),
      });
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="auth-title">
        <div className={styles.authBrand} aria-label="Store Land">
          <span className={styles.authBrandMark} aria-hidden="true">
            S
          </span>
          <span>Store Land</span>
        </div>

        <div className={styles.authHeading}>
          <p className={styles.authEyebrow}>RECUPERAÇÃO DE ACESSO</p>
          <h1 id="auth-title">Esqueceu a senha?</h1>
          <p className={styles.authDescription}>
            Informe seu e-mail e enviaremos instruções para recuperar o acesso.
          </p>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.authField}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              required
            />
          </div>

          <button className={styles.authSubmit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
          </button>
        </form>

        <p className={styles.authSwitch}>
          Lembrou sua senha?{' '}
          <Link className={styles.authTextButton} to="/login">
            Voltar para entrar
          </Link>
        </p>

        {message && (
          <p className={styles.authMessage} role="status">
            {message}
          </p>
        )}
      </section>
      <p className={styles.authFooter}>Simples, seguro e organizado.</p>
    </main>
  );
}

export default ForgotPasswordPage;
