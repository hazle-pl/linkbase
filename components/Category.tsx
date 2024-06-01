import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

  // Slick settings for the carousel
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6, // Adjust the number of visible items per screen size
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="category">
      <h2>Category {category}</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video._id} className="slider-item">
            <Video video={video} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
