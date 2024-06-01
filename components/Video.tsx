import { VideoModel } from '@/models/video';
import React from 'react';

interface VideoProps {
  video: VideoModel;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <div className="video">
      <p>{video.title}</p>
      <p>{video.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Video;
