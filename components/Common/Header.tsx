import React from 'react';
import Link from 'next/link';
import ContainerContent from './ContentWrapper';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu';

const Header: React.FC = () => {

  return (
    <header>
      <ContainerContent>
        <div className="header-content">
        <Link href="/" className="logo">linkbase<span>_</span></Link>
        <SearchBar/>
        <HamburgerMenu/>
        </div>
      </ContainerContent>
    </header>
  );
};

export default Header;
