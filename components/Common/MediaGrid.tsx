import React, { useEffect, useState } from 'react';

interface MediaItem {
  _id: string;
  title: string;
  coverImage: string;
  description: string;
  genre: string;
  type: string; // "series" | "movie"
  popularity: number;
  season?: number; // Dodanie sezonu, zakładając, że może być w danych
  episode?: number; // Dodanie odcinka, zakładając, że może być w danych
}

interface MediaGridProps {
  genre?: string; // Gatunek (np. "action", "comedy")
  type?: "movie" | "serie" | "all"; // Typ (film, serial lub oba)
}

const MediaGrid: React.FC<MediaGridProps> = ({ genre, type = "all" }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          ...(genre ? { genre } : {}),
          ...(type !== "all" ? { type } : {}),
          page: pagination.currentPage.toString(),
          limit: '10', // Można dostosować limit
        }).toString();

        const response = await fetch(`/api/media/list?${query}`);
        if (response.ok) {
          const data = await response.json();
          // Filtracja dla seriali, wyświetlanie tylko Season 0, Episode 0
          const filteredMedia = data.media.filter((item: MediaItem) => {
            if (item.type === "serie" && item.season === 0 && item.episode === 0) {
              return true; // Pokazujemy tylko Season 0, Episode 0
            }
            if (item.type === "movie") {
              return true; // Pokazujemy wszystkie filmy
            }
            return false;
          });
          setMediaItems(filteredMedia);
          setPagination(data.pagination);
        } else {
          console.error('Failed to fetch media:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [genre, type, pagination.currentPage]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (mediaItems.length === 0) {
    return <div>No media found.</div>;
  }

  return (
    <div className="media-grid">
      {mediaItems.map((item) => (
        <a key={item._id} href={`/${item.type}/${item._id}`}>
          <div className="media-card">
            <img src={item.coverImage} alt={item.title} className="media-image" />
            <div className="media-info">
              <h3 className="media-title">{item.title}</h3>
              <p className="media-genre">{item.genre}</p>
              <p className="media-description">{item.description.slice(0, 50)}...</p>
            </div>
          </div>
        </a>
      ))}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={pagination.currentPage === 1}>
          Prev
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button onClick={handleNextPage} disabled={pagination.currentPage === pagination.totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MediaGrid;
