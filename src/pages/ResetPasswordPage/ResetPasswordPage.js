import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/authApi';
import ThemeToggle from '../../components/ThemeToggle';
import styles from '../AuthPages.module.css';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = searchParams.get('token') || '';

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = formData.get('password');
    if (password !== formData.get('confirmPassword')) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      const result = await resetPassword({ token, password });
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="auth-title">
        <div className={styles.authBrandRow}>
          <div className={styles.authBrand} aria-label="Store Land">
            <span className={styles.authBrandMark} aria-hidden="true">S</span>
            <span>Store Land</span>
          </div>
          <ThemeToggle />
        </div>

        <div className={styles.authHeading}>
          <p className={styles.authEyebrow}>RECUPERAÇÃO DE ACESSO</p>
          <h1 id="auth-title">Crie uma nova senha</h1>
          <p className={styles.authDescription}>
            Escolha uma senha nova com pelo menos 8 caracteres.
          </p>
        </div>

        {!token ? (
          <p className={styles.authMessage} role="alert">
            O link de redefinição está incompleto ou inválido. Solicite um novo link.
          </p>
        ) : (
          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.authField}>
              <label htmlFor="password">Nova senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                required
              />
            </div>
            <div className={styles.authField}>
              <label htmlFor="confirm-password">Confirme a nova senha</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                required
              />
            </div>
            <button
              className={styles.authSubmit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Redefinir senha'}
            </button>
          </form>
        )}

        <p className={styles.authSwitch}>
          <Link className={styles.authTextButton} to="/login">
            Voltar para entrar
          </Link>
        </p>
        {message && <p className={styles.authMessage} role="status">{message}</p>}
      </section>
      <p className={styles.authFooter}>Simples, seguro e organizado.</p>
    </main>
  );
}

export default ResetPasswordPage;
