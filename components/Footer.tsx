import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
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
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
