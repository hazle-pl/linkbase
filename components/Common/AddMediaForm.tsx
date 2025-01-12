import React, { useState } from 'react';

const AddMediaForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    coverImage: '',
    backgroundImage: '',
    trailer: '',
    videoLink: '',
    description: '',
    type: 'movie',
    season: '',
    episode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/media/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          season: formData.type === 'serie' ? Number(formData.season) : undefined,
          episode: formData.type === 'serie' ? Number(formData.episode) : undefined,
        }),
      });

      if (response.ok) {
        alert('Media added successfully!');
        setFormData({
          title: '',
          genre: '',
          coverImage: '',
          backgroundImage: '',
          videoLink: '',
          trailer: '',
          description: '',
          type: 'movie',
          season: '',
          episode: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding media:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Media</h1>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
      </div>
      <div>
        <label>Cover Image URL:</label>
        <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} required />
      </div>
      <div>
        <label>Trailer:</label>
        <input type="text" name="trailer" value={formData.trailer} onChange={handleChange} required />
      </div>
      <div>
        <label>Background Image URL:</label>
        <input type="text" name="backgroundImage" value={formData.backgroundImage} onChange={handleChange} required />
      </div>
      <div>
        <label>Video Link:</label>
        <input type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="movie">Movie</option>
          <option value="serie">Series</option>
        </select>
      </div>
      {formData.type === 'serie' && (
        <>
          <div>
            <label>Season:</label>
            <input type="number" name="season" value={formData.season} onChange={handleChange} />
          </div>
          <div>
            <label>Episode:</label>
            <input type="number" name="episode" value={formData.episode} onChange={handleChange} />
          </div>
        </>
      )}
      <button type="submit">Add Media</button>
    </form>
  );
};

export default AddMediaForm;
