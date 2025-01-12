import React from 'react';

interface YouTubeBackgroundProps {
  trailer: string;
}

const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({ trailer }) => {
  const videoId = trailer.split('v=')[1].split('&')[0];

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}&mute=1&showinfo=0&rel=0&iv_load_policy=3&vq=hd1080`}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeBackground;
