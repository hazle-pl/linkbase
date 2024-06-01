import { VideoModel } from '@/models/video';
import Link from 'next/link';
import React from 'react';

interface VideoProps {
  video: VideoModel;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <Link href={`video/${video._id}`}>
      <div className="">
        <div className="rich-text">
          <h2>{video.title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Video;
