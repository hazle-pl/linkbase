import React, { useEffect, useState } from 'react';

interface Video {
  _id: string;
  title: string;
  description: string;
  createdAt: string; // Assuming there's a createdAt field for sorting
}

interface LayoutProps {
  category: string;
}

const Category: React.FC<LayoutProps> = ({ category }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (category: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/get_videos?category=${category}`);
      if (response.ok) {
        const data: Video[] = await response.json();
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
      <h1>Videos in category: {category}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
