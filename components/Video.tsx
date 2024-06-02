import { VideoModel } from '@/models/video';
import Link from 'next/link';
import React from 'react';

interface VideoProps {
  video?: VideoModel | null;
  loading?: boolean;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  if (!video) {
    return (
    <div className="video skeleton"/>
  );
  }

  return (
    <Link className="video" href={`video/${video._id}`}>
        <div className="rich-text">
          <h2>{video.title}</h2>
        </div>
        <div className="overlay"/>
        <img src={video.thumbnail}/>
    </Link>
  );
};

export default Video;
