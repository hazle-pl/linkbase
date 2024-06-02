import React from 'react';
import Layout from '../components/Layout';
import Category from '@/components/Category';
import HeroBanner from '@/components/HeroBanner';

const Home: React.FC = () => {
  return (
    <Layout>
      <HeroBanner/>
      <Category category="horror"/>
      <Category category="drama"/>
      <Category category="thriller"/>
      <Category category="action"/>
      <Category category="science-fiction"/>
      <Category category="comedy"/>
    </Layout>
  );
};

export default Home;
