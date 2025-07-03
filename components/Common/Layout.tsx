import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar/>
      <main>
        <Header/>
        {children}
        </main>
    </>
  );
};

export default Layout;
