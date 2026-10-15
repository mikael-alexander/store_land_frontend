const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

async function readResponse(response) {
  let body;
  try {
    body = await response.json();
  } catch {
    if (response.ok) {
      throw new Error('O servidor retornou uma resposta inválida.');
    }
    body = {};
  }
  if (!response.ok) {
    throw new Error(
      body.detail || body.message || body.error || 'Não foi possível concluir a solicitação.'
    );
  }
  return body;
}

async function getCsrfToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/csrf`, {
    credentials: 'include',
  });
  const body = await readResponse(response);
  return body.token;
}

async function post(path, data) {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE_URL}/api/auth/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': csrfToken,
    },
    body: JSON.stringify(data),
  });
  return readResponse(response);
}

export function register(data) {
  return post('register', data);
}

export function login(data) {
  return post('login', data);
}

export function requestPasswordReset(data) {
  return post('forgot-password', data);
}

export function resetPassword(data) {
  return post('reset-password', data);
}

export async function logout() {
  return post('logout', {});
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    credentials: 'include',
  });
  return readResponse(response);
}
