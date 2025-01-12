import Link from 'next/link';
import { useState } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleMenu}>
      <div
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && (
        <div className="overlay">
          <button className="close-button" onClick={toggleMenu}>
            ✕
          </button>
          <div className="categories">
            <Link href="/movies" onClick={toggleMenu}>Filmy</Link>
            <Link href="/series" onClick={toggleMenu}>Seriale</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
