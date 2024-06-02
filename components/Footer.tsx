import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode) {
      const newDarkModeState = JSON.parse(isDarkMode);
      setDarkMode(newDarkModeState);
      if (newDarkModeState) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', JSON.stringify(newDarkModeState));
    if (newDarkModeState) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/admin">
              Admin Panel
            </Link>
          </li>
          <li>
            <Link href="/add">
             Dodaj filmy/seriale
            </Link>
          </li>
          <li>
            <label>
              Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
            </label>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
