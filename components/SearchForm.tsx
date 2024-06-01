import React, { useState } from 'react';

const SearchForm = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
    if (!isInputVisible) {
      setQuery('');
      onSearch(''); 
    }
  };

  return (
    <div className="search">
      {isInputVisible && (
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search by title..."
        />
      )}
      <i className="fa-solid fa-magnifying-glass" onClick={toggleInputVisibility} />
    </div>
  );
};

export default SearchForm;
