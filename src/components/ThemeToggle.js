import { useTheme } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      className={styles.themeToggle}
      onClick={toggleTheme}
      title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      type="button"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        {isDark ? (
          <circle cx="12" cy="12" r="4" />
        ) : (
          <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.6 8.6 0 1 0 20.2 15.4Z" />
        )}
        {!isDark && (
          <>
            <path d="M12 2v1.5M12 20.5V22M4.9 4.9 6 6m12 12 1.1 1.1M2 12h1.5m17 0H22M4.9 19.1 6 18m12-12 1.1-1.1" />
            <circle cx="12" cy="12" r="4" />
          </>
        )}
      </svg>
    </button>
  );
}

export default ThemeToggle;
