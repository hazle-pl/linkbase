// pages/add.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AddPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [category, setCategory] = useState('action');
  const [type, setType] = useState('movie');
  const [source, setSource] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [background, setBackground] = useState('');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    try {

      const requestData = {
        title,
        category,
        year,
        director,
        type,
        source,
        thumbnail,
        background,
        season: type === 'series' ? season : null,
        episode: type === 'series' ? episode : null,
      };
  
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };
  
  

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="horror">Horror</option>
        <option value="thriller">Thriller</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="science-fiction">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="romance">Romance</option>
        <option value="animation">Animation</option>
        <option value="crime">Crime</option>
        <option value="mystery">Mystery</option>
        <option value="documentary">Documentary</option>
        <option value="family">Family</option>
        <option value="history">History</option>
        <option value="war">War</option>
        <option value="music">Music</option>
        <option value="western">Western</option>
        <option value="sport">Sport</option>
        <option value="biography">Biography</option>
        <option value="musical">Musical</option>
      </select>
      <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Director" />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
      <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" />
      <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="thumbnail" />
      <input type="text" value={background} onChange={(e) => setBackground(e.target.value)} placeholder="background" />
      {type === 'series' && (
        <>
          <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} placeholder="Season" />
          <input type="text" value={episode} onChange={(e) => setEpisode(e.target.value)} placeholder="Episode" />
        </>
      )}
      <button onClick={handleAdd}>Add Record</button>
    </div>
  );
};

export default AddPage;
