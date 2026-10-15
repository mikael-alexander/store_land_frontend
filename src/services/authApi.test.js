import { afterEach, expect, jest, test } from '@jest/globals';
import { login } from './authApi';

afterEach(() => {
  jest.restoreAllMocks();
});

test('fetches a CSRF token and posts login credentials with the session cookie', async () => {
  const fetchMock = jest.spyOn(global, 'fetch');
  fetchMock
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'csrf-token' }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 1, name: 'Test User' } }),
    });

  await login({ username: 'test-user', password: 'test-password' });

  expect(fetchMock).toHaveBeenNthCalledWith(
    1,
    'http://localhost:8080/api/auth/csrf',
    { credentials: 'include' }
  );
  expect(fetchMock).toHaveBeenNthCalledWith(
    2,
    'http://localhost:8080/api/auth/login',
    expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': 'csrf-token',
      },
      body: JSON.stringify({
        username: 'test-user',
        password: 'test-password',
      }),
    })
  );
});

test('surfaces authentication errors returned by the API', async () => {
  const fetchMock = jest.spyOn(global, 'fetch');
  fetchMock
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'csrf-token' }),
    })
    .mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Usuário ou senha inválidos.' }),
    });

  await expect(
    login({ username: 'wrong-user', password: 'wrong-password' })
  ).rejects.toThrow('Usuário ou senha inválidos.');
});
