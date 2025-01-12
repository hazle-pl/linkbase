import React, { useEffect, useState } from 'react';
import YouTubeBackground from './YouTubeBackground';

interface MediaItem {
  _id: string;
  title: string;
  coverImage: string;
  backgroundImage: string;
  description: string;
  genre: string;
  type: string;
  trailer: string;
  popularity: number;
}

interface HeroBannerProps {
  id?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ id }) => {
  const [featuredMedia, setFeaturedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const endpoint = id ? `/api/media/${id}` : '/api/media/random';
        const response = await fetch(endpoint);
        if (response.ok) {
          const data: MediaItem = await response.json();
          setFeaturedMedia(data);
        } else {
          console.error('Failed to fetch media:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, [id]);

  if (!featuredMedia) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero-banner">
      <div className="title-box">
        <h1>{featuredMedia.title}</h1>
      </div>
      <div className="subtitle-box">
        <h2><a href={`/${featuredMedia.type}/${featuredMedia._id}`}>Oglądaj teraz <i className="fa-solid fa-arrow-right"/></a></h2>
      </div>
      <div className="image-box">
        <img src={featuredMedia.backgroundImage}/>
      </div>
      <div className="trailer-box">
        <YouTubeBackground trailer={featuredMedia.trailer}/>
      </div>
      <div className='info-box'>
        <div className="text">
          <h3>O Filmie</h3>
          <p>{featuredMedia.description}</p>
        </div>
        <a href={`/${featuredMedia.type}/${featuredMedia._id}`}>
          <i className="fa-solid fa-arrow-right"/>
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
