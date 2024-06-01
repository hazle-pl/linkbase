import Link from 'next/link';
import React, { useState } from 'react';
import SearchForm from './SearchForm';
import { VideoModel } from '@/models/video';
import SearchResults from './SearchResults';

interface VideoProps {
  _id: string | undefined;
  title: string;
  year: string;
  video: VideoModel;
}

const Header: React.FC = () => {
  const [videos, setFilms] = useState<VideoProps[]>([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <div className="utility-bar component component-content">
        <div className="logo">
        <Link href={`/`}>linkbase</Link>
        </div>
        <div className="navigation">
          <Link href={`/movies`}>Filmy</Link>
          <Link href={`/series`}>Seriale</Link>
          <Link href={`/category`}>Kategorie</Link>
        </div>
        <SearchForm onSearch={fetchFilms} />
        <div
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-navigation">
          <SearchForm onSearch={fetchFilms} />
          <Link href={`/films`}>Filmy</Link>
          <Link href={`/series`}>Seriale</Link>
          <Link href={`/category`}>Kategorie</Link>
        </div>
      )}
            <SearchResults results={videos}/>
    </header>
  );
};

export default Header;
