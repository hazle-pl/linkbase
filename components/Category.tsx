import React, { useEffect, useState } from 'react';
import Video from './Video';
import { VideoModel } from '@/models/video';

interface LayoutProps {
  category: string;
}

const Category: React.FC<LayoutProps> = ({ category }) => {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (category: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/get_videos?category=${category}`);
      if (response.ok) {
        const data: VideoModel[] = await response.json();
        setVideos(data);
      } else {
        console.error('Failed to fetch videos');
        setError('Failed to fetch videos');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Error fetching videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(category);
  }, [category]);

  return (
    <div className="category">
      <h2>Category {category}</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <Video video={video} />
            <Video video={video} />
            <Video video={video} />
            <Video video={video} />
            <Video video={video} />
            <Video video={video} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
