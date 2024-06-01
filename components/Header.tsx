import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import { VideoModel } from '@/models/video';

interface VideoProps {
    video: VideoModel;
  }

const Header: React.FC = () => {

    const [videos, setFilms] = useState<VideoProps[]>([]);

  const fetchFilms = async (query = '') => {
    try {
      const response = await fetch(`/api/search?title=${query}`);
      if (response.ok) {
        const data: VideoProps[] = await response.json();
        setFilms(data);
      } else {
        console.error('Failed to fetch films');
      }
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  return (
    <header>
        <div className="utility-bar component component-content">
            <div className="logo">logo</div>
            <SearchForm onSearch={fetchFilms} />
            <div className="navigation">navigation</div>
        </div>
        <div className="search-results">
        <ul>
        {videos.map((video) => (
          <li id={video._id} key={video._id}>
            {video.title} - {video.year}
          </li>
        ))}
      </ul>
        </div>
        <div className="mobile-navigation"></div>
    </header>
  );
};

export default Header;
