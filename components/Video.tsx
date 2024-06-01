import { VideoModel } from '@/models/video';
import Link from 'next/link';
import React from 'react';

interface VideoProps {
  video: VideoModel;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <Link className="video" href={`video/${video._id}`}>
      <span className="year">{video.year}</span>
        <div className="rich-text">
          <h2>{video.title}</h2>
          <span className="badge">{video.category}</span>
        </div>
        <div className="overlay"/>
        <img src={video.thumbnail}/>
    </Link>
  );
};

export default Video;
