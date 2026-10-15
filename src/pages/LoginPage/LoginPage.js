import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/authApi';
import ThemeToggle from '../../components/ThemeToggle';
import styles from '../AuthPages.module.css';

function LoginPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setMessage('');
    try {
      await login({
        username: formData.get('username'),
        password: formData.get('password'),
      });
      setMessage('Login realizado com sucesso.');
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
          <p className={styles.authEyebrow}>
            BEM-VINDO DE VOLTA
          </p>
          <h1 id="auth-title">Acesse sua conta</h1>
          <p className={styles.authDescription}>
            Entre com seus dados para continuar.
          </p>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.authField}>
            <label htmlFor="username">Usuário ou e-mail</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Seu usuário ou e-mail"
              required
            />
          </div>

          <div className={styles.authField}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className={styles.authOptions}>
            <label className={styles.authRemember} htmlFor="remember-me">
              <input id="remember-me" name="rememberMe" type="checkbox" />
              <span>Manter conectado</span>
            </label>
            <Link className={styles.authTextButton} to="/esqueceu-senha">
              Esqueceu a senha?
            </Link>
          </div>

          <button className={styles.authSubmit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className={styles.authSwitch}>
          Ainda não tem uma conta?{' '}
          <Link className={styles.authTextButton} to="/cadastro">
            Cadastre-se
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

export default LoginPage;
