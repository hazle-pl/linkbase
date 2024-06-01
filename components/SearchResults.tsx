import { VideoModel } from '@/models/video';
import React from 'react';
import Video from './Video';

interface SearchResultProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultProps> = ({ results }) => {
  if (results.length <= 0) {
    return null;
  }

  return (
    <div className="results">
        <div className="component-content">
        {results.map((video: VideoModel) => (
          <Video key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
