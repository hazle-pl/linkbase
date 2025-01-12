import React, { useEffect, useState } from 'react';

interface Episode {
  _id: string;
  title: string;
  season: number;
  episode: number;
  coverImage: string;
  description: string;
}

interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

interface MediaDetailProps {
  title: string;
}

const SeriesDetail: React.FC<MediaDetailProps> = ({ title }) => {
  const [data, setData] = useState<any>(null);  // Będziemy przechowywać dane o serialu
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const response = await fetch(`/api/media/serie/${title}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching media details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaDetails();
  }, [title]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      {Object.keys(data.seasons).map((seasonKey) => {
        const seasonNumber = parseInt(seasonKey);
        const episodes = data.seasons[seasonNumber];

        return (
          <div key={seasonNumber} className="season">
            <h2>Season {seasonNumber}</h2>
            <div className="episodes-grid">
              {episodes.map((episode: Episode) => (
                <div key={episode._id} className="episode-card">
                  <img src={episode.coverImage} alt={episode.title} />
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeriesDetail;
