import { VideoModel } from '@/models/video';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface HeroBannerProps {
  id?: any;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ id }) => {
  const [video, setVideo] = useState<VideoModel | null>(null);

  const fetchVideo = async () => {
    try {
      let url = '/api/get_videos?limit=1&random=true';
      if (id) {
        url += `&_id=${id}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data: VideoModel[] = await response.json();
        if (data.length > 0) {
          setVideo(data[0]);
        } else {
          console.error('No video data available');
        }
      } else {
        console.error('Failed to fetch video');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  return (
    <div className="hero-banner component full-width">
      {video && (
        <>
          <img src={video.background} alt={video.title}/>
          <div className="content-container">
            <div className="rich-text">
              <h1>{video.title}</h1>
              <p>{video.description}</p>
              <Link className="btn watch" href={`video/${video._id}`}>Oglądaj <i className="fa-solid fa-play"></i></Link>
            </div>
          </div>
          <div className="overlay"/>
        </>
      )}
    </div>
  );
};

export default HeroBanner;
