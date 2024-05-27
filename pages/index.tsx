// pages/catalog/index.tsx
import React from 'react';
import Layout from '../components/Layout';
import Category from '@/components/Category';

const CatalogPage: React.FC = () => {
  return (
    <Layout>
      <div>Catalog Page</div>
      <Category category="horror"/>
      <Category category="drama"/>
      <Category category="action"/>
      <Category category="science-fiction"/>
    </Layout>
  );
};

export default CatalogPage;
