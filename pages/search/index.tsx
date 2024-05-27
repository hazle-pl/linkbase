// pages/search.tsx
import SearchForm from '@/components/SearchForm';
import React, { useState } from 'react';


interface Film {
  _id: string;
  title: string;
  year: string;
}

const SearchPage: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  const fetchFilms = async (query = '') => {
    try {
      const response = await fetch(`/api/search?title=${query}`);
      if (response.ok) {
        const data: Film[] = await response.json();
        setFilms(data);
      } else {
        console.error('Failed to fetch films');
      }
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  return (
    <div>
      <h1>Search Films</h1>
      <SearchForm onSearch={fetchFilms} />
      <ul>
        {films.map((film) => (
          <li id={film._id} key={film._id}>
            {film.title} - {film.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
