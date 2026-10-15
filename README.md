# Store Land — Frontend

Aplicação web do Store Land, construída com React e Create React App. Inclui a
vitrine demonstrativa de produtos, promoções, carrinho em memória e telas de
login, cadastro e recuperação/redefinição de senha.

## Requisitos

- Node.js e npm.
- Backend Spring Boot disponível em `http://localhost:8080` para usar os
  formulários de autenticação.

## Instalação e execução

No terminal, entre nesta pasta (`frontend/store_land`) e execute:

```bash
npm ci
npm start
```

A aplicação abre em [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm test -- --watchAll=false --runInBand` | Executa os testes uma vez. |
| `npm run build` | Gera os arquivos otimizados em `build/`. |

## Rotas

| Caminho | Tela |
| --- | --- |
| `/` | Página inicial com carrossel e ofertas |
| `/login` | Login |
| `/cadastro` | Criar conta |
| `/esqueceu-senha` | Solicitar recuperação de senha |
| `/redefinir-senha?token=...` | Definir uma nova senha pelo link enviado por e-mail |
| `/promocoes` | Ver produtos em promoção |
| `/carrinho` | Ver e alterar o carrinho demonstrativo |

## Integração com o backend

Por padrão, as chamadas de API usam `http://localhost:8080`. Para mudar o
endereço, crie `.env.local` nesta pasta:

```dotenv
REACT_APP_API_URL=http://localhost:8080
```

Reinicie `npm start` depois de alterar essa variável. O frontend inclui cookies
nas requisições e obtém um token CSRF de `GET /api/auth/csrf` antes de cada
requisição `POST`.

Para permitir autenticação, mantenha o backend configurado com a origem do
frontend (`FRONTEND_URL=http://localhost:3000` por padrão). Os dois serviços
precisam estar acessíveis pelo navegador.

## Estrutura principal

```text
src/
├── pages/
│   ├── LoginPage/
│   ├── RegisterPage/
│   ├── ForgotPasswordPage/
│   ├── ResetPasswordPage/
│   ├── HomePage/
│   ├── PromotionsPage/
│   ├── CartPage/
│   └── AuthPages.module.css
├── components/
├── context/
├── data/
├── services/
│   └── authApi.js
├── App.js
└── App.test.js
```

Os estilos das páginas de autenticação usam CSS Modules. As chamadas HTTP e o
tratamento das respostas da API ficam em `src/services/authApi.js`.

## Observações

- O backend valida os dados novamente; validações do navegador não substituem
  validação no servidor.
- O envio real de e-mail para recuperação depende da configuração SMTP no
  backend.
- Não coloque senhas, tokens privados ou credenciais em variáveis `REACT_APP_*`:
  essas variáveis são incluídas no bundle público do navegador.
