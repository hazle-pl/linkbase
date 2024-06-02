import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import SearchResults from '@/components/SearchResults';
import { VideoModel } from '@/models/video';

interface VideoProps {
  _id: string | undefined;
  title: string;
  year: string;
  video: VideoModel;
}

const Films: React.FC = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllFilms = async () => {
    try {
      const response = await fetch(`/api/get_videos?all=true&type=movies`);
      if (response.ok) {
        const data: VideoProps[] = await response.json();
        setVideos(data);
      } else {
        console.error('Failed to fetch films');
        setError('Failed to fetch films');
      }
    } catch (error) {
      console.error('Error fetching films:', error);
      setError('Error fetching films');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFilms();
  }, []);

  return (
    <Layout>
      <div className='list-movies'>
        {videos.length > 0 ? (
          <SearchResults results={videos} />
        ) : (
          <p>Nie znaleziono filmów</p>
        )}
      </div>
    </Layout>
  );
};

export default Films;
