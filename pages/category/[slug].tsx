import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchResults from '@/components/SearchResults';
import Layout from '@/components/Layout';

const Category: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/get_videos?category=${slug}`);
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    if (slug) {
      fetchVideos();
    }
  }, [slug]);

  return (
    <Layout>
      <div className='list-movies'>
        {videos.length > 0 ? (
          <SearchResults results={videos} />
        ) : (
          <p>Nie znaleziono filmów dla kategorii: {slug}</p>
        )}
      </div>
    </Layout>
  );
};

export default Category;
