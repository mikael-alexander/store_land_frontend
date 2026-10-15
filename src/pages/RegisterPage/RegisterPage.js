import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/authApi';
import ThemeToggle from '../../components/ThemeToggle';
import styles from '../AuthPages.module.css';

function RegisterPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get('password') !== formData.get('confirmPassword')) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      await register({
        fullName: formData.get('fullName'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
      });
      setMessage('Conta criada com sucesso. Você já está conectado.');
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
          <p className={styles.authEyebrow}>COMECE AGORA</p>
          <h1 id="auth-title">Crie sua conta</h1>
          <p className={styles.authDescription}>
            Preencha seus dados para começar.
          </p>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.authField}>
            <label htmlFor="full-name">Nome completo</label>
            <input
              id="full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className={styles.authField}>
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Escolha um nome de usuário"
              required
            />
          </div>

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

          <div className={styles.authField}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Crie uma senha com pelo menos 8 caracteres"
              minLength={8}
              required
            />
          </div>

          <div className={styles.authField}>
            <label htmlFor="confirm-password">Confirme sua senha</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Digite sua senha novamente"
              minLength={8}
              required
            />
          </div>

          <button className={styles.authSubmit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className={styles.authSwitch}>
          Já tem uma conta?{' '}
          <Link className={styles.authTextButton} to="/">
            Entrar
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

export default RegisterPage;
