import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { VideoModel } from '@/models/video';
import Link from 'next/link';
import Category from '@/components/Category';

const Video: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [video, setVideoData] = useState<VideoModel | null>(null);

  const fetchVideo = async () => {
    try {
      let url = '/api/get_videos?limit=1&random=true';
      if (slug) {
        url += `&_id=${slug}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data: VideoModel[] = await response.json();
        if (data.length > 0) {
          setVideoData(data[0]);
        } else {
          console.error('No video data available');
        }
      } else {
        console.error('Failed to fetch video');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [slug]);

  return (
    <Layout>
      {video &&
      <div className="video-content-wrapper">
        <div className="background">
          <div className="overlay"/>
          <img src={video?.background}/>
        </div>
        <div className="informations">
        <div className="box">
          <Link className="video" href={video.source}>
          <i className="fa-solid fa-play"/>
            <img className="video" src={video.thumbnail}/>
          </Link>
        <div className="rich-text">
          <h1>{video.title}</h1>
          <p>{video.description}</p>
        </div>
        </div>
          <div className="rich-text">
            <p><b>Reżyseria:</b> {video.director}</p>
            <p><b>Gatunek:</b> {video.category}</p>
            <p><b>Premiera:</b> {video.year}</p>
          </div>
        </div>
        <Category random={true} similar={true} category={video.category}/>
      </div>
    }
    </Layout>
  );
};

export default Video;
