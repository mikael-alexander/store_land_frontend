import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/esqueceu-senha" element={<ForgotPasswordPage />} />
        <Route path="/redefinir-senha" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
