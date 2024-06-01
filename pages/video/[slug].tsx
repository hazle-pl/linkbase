import React from 'react';
import { useRouter } from 'next/router';
import HeroBanner from '@/components/HeroBanner';
import Layout from '@/components/Layout';

const Video: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <HeroBanner id={slug}/>
    </Layout>
  );
};

export default Video;