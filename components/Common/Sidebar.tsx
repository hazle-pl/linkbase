import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/', icon: 'fa-solid fa-house', label: 'Strona główna' },
    { href: '/movies', icon: 'fa-solid fa-video', label: 'Filmy' },
    { href: '/series', icon: 'fa-solid fa-film', label: 'Seriale' },
    { href: '/trending', icon: 'fa-solid fa-fire', label: 'Trendujące' },
    { href: '/news', icon: 'fa-solid fa-folder-plus', label: 'Nowości' },
  ];

  return (
    <aside>
      <nav>
        <ul>
          {navItems.map(({ href, icon, label }) => (
            <li key={href} className={router.pathname === href ? 'active' : ''}>
              <Link href={href} passHref>
                  <i className={icon}></i>
                  <p>{label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
