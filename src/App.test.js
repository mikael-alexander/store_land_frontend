import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

test('renders the sign-in form', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Acesse sua conta' })
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Usuário ou e-mail')).toBeInTheDocument();
  expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
});

test('navigates to the forgot-password route', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Esqueceu a senha?' }));

  expect(
    screen.getByRole('heading', { name: 'Esqueceu a senha?' })
  ).toBeInTheDocument();
  expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Enviar instruções' })
  ).toBeInTheDocument();
});

test('opens the reset-password page and requires a token', () => {
  window.history.pushState({}, '', '/redefinir-senha?token=reset-token');
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Crie uma nova senha' })
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Nova senha')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirme a nova senha')).toBeInTheDocument();
});

test('navigates to the registration route', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Cadastre-se' }));

  expect(
    screen.getByRole('heading', { name: 'Crie sua conta' })
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
  expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirme sua senha')).toBeInTheDocument();
});

test('does not submit sign-up when passwords do not match', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Cadastre-se' }));
  fireEvent.change(screen.getByLabelText('Nome completo'), {
    target: { value: 'Mika Example' },
  });
  fireEvent.change(screen.getByLabelText('Usuário'), {
    target: { value: 'mika' },
  });
  fireEvent.change(screen.getByLabelText('E-mail'), {
    target: { value: 'mika@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: 'password1' },
  });
  fireEvent.change(screen.getByLabelText('Confirme sua senha'), {
    target: { value: 'password2' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Criar conta' }));

  expect(screen.getByRole('status')).toHaveTextContent(
    'As senhas não coincidem.'
  );
});
