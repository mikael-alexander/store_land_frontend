import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
  window.localStorage.removeItem('store-land-theme');
  delete document.documentElement.dataset.theme;
});

test('renders the home page, product carousel, and no more than ten promotions', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Encontre algo que combina com você.' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('region', { name: 'Carrossel de produtos' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ver todas as ofertas' })).toHaveAttribute(
    'href',
    '/promocoes'
  );
  expect(
    screen.getByRole('link', { name: 'Store Land - página inicial' })
  ).toHaveAttribute('href', '/');

  const promotions = screen.getByRole('region', {
    name: 'Produtos em promoção',
  });
  expect(within(promotions).getAllByText(/-\d+%/)).toHaveLength(8);
});

test('adds a product to the cart and displays its total', () => {
  render(<App />);
  fireEvent.click(
    screen.getAllByRole('button', { name: 'Adicionar ao carrinho' })[0]
  );
  fireEvent.click(
    screen.getByRole('link', { name: 'Carrinho de compras, 1 itens' })
  );

  expect(
    screen.getByRole('heading', { name: 'Carrinho de compras' })
  ).toBeInTheDocument();
  expect(screen.getByText('Cafeteira Compacta')).toBeInTheDocument();
  expect(screen.getAllByText('R$ 149,90')).toHaveLength(3);
});

test('toggles and persists the color theme', () => {
  render(<App />);
  const themeButton = screen.getByRole('button', { name: 'Ativar modo escuro' });

  fireEvent.click(themeButton);

  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(window.localStorage.getItem('store-land-theme')).toBe('dark');
  expect(
    screen.getByRole('button', { name: 'Ativar modo claro' })
  ).toHaveAttribute('aria-pressed', 'true');

  fireEvent.click(screen.getByRole('button', { name: 'Ativar modo claro' }));

  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(window.localStorage.getItem('store-land-theme')).toBe('light');
});

test('renders the sign-in form', () => {
  window.history.pushState({}, '', '/login');
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Acesse sua conta' })
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Usuário ou e-mail')).toBeInTheDocument();
  expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
});

test('navigates to the forgot-password route', () => {
  window.history.pushState({}, '', '/login');
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
  window.history.pushState({}, '', '/login');
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
  window.history.pushState({}, '', '/login');
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
