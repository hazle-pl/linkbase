import React from 'react';
import { useRouter } from 'next/router';
import HeroBanner from '@/components/HeroBanner';

const Video: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <>
  {slug}
  <HeroBanner id={slug}/>
  </>;
};

export default Video;