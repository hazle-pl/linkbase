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
            <a href="/movies" onClick={toggleMenu}>Filmy</a>
            <a href="/series" onClick={toggleMenu}>Seriale</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
