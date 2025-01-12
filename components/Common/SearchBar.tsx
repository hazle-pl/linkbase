import { useState, useEffect } from 'react';

interface Media {
  _id: string;
  title: string;
  popularity: number;
  type: string; // Assuming you have a 'type' field to distinguish between 'movie' or 'series'
  episode: number; // Changed to number
  season: number;  // Changed to number
  coverImage: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]); // Clear results if query is empty
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wyszukaj film lub serial"
      />
      {query && isLoading && <div>Loading...</div>} {/* Only show loading when there's a query */}
      {query && results.length > 0 && (
        <ul className="results">
          {results.map((media) => {
            // If the type is "serie" and it's not season 0, episode 0, skip it
            if (media.type === 'serie' && media.season !== 0 && media.episode !== 0) {
              return null; // Skip serials that aren't season 0, episode 0
            }

            return (
              <li key={media._id}>
                <a href={`/${media.type}/${media._id}`}>
                  <img src={media.coverImage}/>
                  {media.title}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
