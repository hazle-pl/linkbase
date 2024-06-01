import React, { useEffect, useState } from 'react';
import Video from './Video';
import { VideoModel } from '@/models/video';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface LayoutProps {
  category: string;
}

const Category: React.FC<LayoutProps> = ({ category }) => {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 9999, min: 1400 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1400, min: 992 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2
    }
  };
  

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
      <Carousel responsive={responsive}>
        {videos.map((video) => (
          <Video video={video} />
        ))}
      </Carousel>
    </div>
  );
};

export default Category;
