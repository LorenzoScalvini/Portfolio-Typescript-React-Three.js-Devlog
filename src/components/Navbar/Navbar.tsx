import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';
import ItalianFlag from '../../assets/language/italian.svg';
import EnglishFlag from '../../assets/language/english.svg';

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.menuIcon}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.menuIcon}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = (): void => {
    const newLang = i18n.language === 'eng' ? 'it' : 'eng';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className={`${styles.navbar} ${isLoaded ? styles.loaded : ''}`}>
      <nav className={styles.container}>
        <NavLink to="/home" className={styles.logo}>
          LS.dev
        </NavLink>

        <button
          className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? t('close_menu') : t('open_menu')}
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li>
            <NavLink
              to="/home"
              onClick={toggleMenu}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              {t('home')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              {t('about')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              onClick={toggleMenu}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              {t('projects')}
            </NavLink>
          </li>
          <li>
            <button className={styles.langButton} onClick={toggleLanguage}>
              <div className={styles.flagContainer}>
                {i18n.language === 'it' ? (
                  <img
                    src={EnglishFlag}
                    alt="Italian flag"
                    className={styles.flag}
                  />
                ) : (
                  <img
                    src={ItalianFlag}
                    alt="English flag"
                    className={styles.flag}
                  />
                )}
                <span>{t('language')}</span>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}